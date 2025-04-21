// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_node_server

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: string; // base64
  }>;
}

async function sendEmail(options: EmailOptions) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(options),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send email: ${errorText}`);
  }

  return await response.json();
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { 
      headers: corsHeaders,
      status: 200
    });
  }

  try {
    // Verify request method
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { 
          status: 405, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json" 
          } 
        }
      );
    }

    // Create a Supabase client with the Auth context
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse form data
    const formData = await req.formData();
    const invoiceId = formData.get("invoiceId");
    const clientEmail = formData.get("clientEmail");
    const clientName = formData.get("clientName");
    const invoiceTitle = formData.get("invoiceTitle");
    const pdfFile = formData.get("pdf");

    if (!invoiceId || !clientEmail || !clientName || !pdfFile) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get sender details from the database
    const { data: userData, error: userDataError } = await supabaseClient
      .from("profiles")
      .select("email, full_name, company_name")
      .eq("id", user.id)
      .single();

    if (userDataError) {
      return new Response(
        JSON.stringify({ error: "Failed to get user data" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get invoice data from the database for verification
    const { data: invoiceData, error: invoiceError } = await supabaseClient
      .from("invoices")
      .select("id, status")
      .eq("id", invoiceId)
      .eq("user_id", user.id)
      .single();

    if (invoiceError || !invoiceData) {
      return new Response(
        JSON.stringify({ error: "Invoice not found or access denied" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify invoice is completed
    if (invoiceData.status !== "completed") {
      return new Response(
        JSON.stringify({ error: "Only completed invoices can be sent via email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Convert ArrayBuffer to base64 for attachment
    const pdfBlob = pdfFile as Blob;
    const pdfArrayBuffer = await pdfBlob.arrayBuffer();
    const pdfBase64 = btoa(
      String.fromCharCode(...new Uint8Array(pdfArrayBuffer))
    );

    // Build the email HTML
    const senderName = userData.company_name || userData.full_name || "Your Merchant";
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 5px;
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
            margin-bottom: 20px;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eee;
            margin-top: 20px;
            font-size: 12px;
            color: #999;
          }
          .button {
            display: inline-block;
            background-color: #4a6cf7;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Invoice from ${senderName}</h2>
          </div>
          
          <p>Dear ${clientName},</p>
          
          <p>Please find attached the invoice <strong>${invoiceTitle}</strong> for your recent purchase.</p>
          
          <p>If you have any questions about this invoice, please don't hesitate to contact us.</p>
          
          <p>Thank you for your business!</p>
          
          <p>Best regards,<br>${senderName}</p>
          
          <div class="footer">
            <p>This is an automated email. Please do not reply directly to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    const filename = `invoice-${invoiceTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`;
    await sendEmail({
      from: `${senderName} <invoices@faktur.web.id>`,
      to: clientEmail.toString(),
      subject: `Invoice: ${invoiceTitle}`,
      html: emailHtml,
      attachments: [
        {
          filename,
          content: pdfBase64,
        },
      ],
    });

    // Log email sent activity
    try {
      // Check if invoice_activities table exists by testing a query
      const { data: tableExists } = await supabaseClient
        .from('invoice_activities')
        .select('id')
        .limit(1);
      
      // If table exists, log the activity
      if (tableExists !== null) {
        await supabaseClient.from("invoice_activities").insert({
          invoice_id: invoiceId,
          user_id: user.id,
          activity_type: "email_sent",
          channel: "email",
          details: {
            recipient: clientEmail,
            recipient_name: clientName,
            timestamp: new Date().toISOString(),
          },
        });
      }
    } catch (logError) {
      // If there's an error logging the activity, just log it but don't fail the request
      console.error("Error logging email activity:", logError);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}); 