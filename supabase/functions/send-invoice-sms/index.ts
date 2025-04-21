// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_node_server

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

// Replace with your SMS API provider (Twilio, Vonage/Nexmo, etc.)
const SMS_API_KEY = Deno.env.get("SMS_API_KEY");
const SMS_API_SECRET = Deno.env.get("SMS_API_SECRET");
if (!SMS_API_KEY || !SMS_API_SECRET) {
  throw new Error("SMS API credentials are not set");
}

interface SMSMessage {
  to: string;
  from: string;
  text: string;
}

async function sendSMS(message: SMSMessage) {
  // This is an example using a generic API - replace with your specific SMS API provider
  const response = await fetch("https://api.yoursmsapi.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${btoa(`${SMS_API_KEY}:${SMS_API_SECRET}`)}`,
    },
    body: JSON.stringify({
      from: message.from,
      to: message.to,
      text: message.text
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send SMS: ${errorText}`);
  }

  return await response.json();
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Verify request method
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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

    // Parse request body
    const requestData = await req.json();
    const { invoiceId, clientPhone, clientName, shareLink, invoiceTitle } = requestData;

    if (!invoiceId || !clientPhone || !clientName || !shareLink) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get sender details from the database
    const { data: userData, error: userDataError } = await supabaseClient
      .from("profiles")
      .select("full_name, company_name")
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

    // Format phone number: ensure it follows the SMS provider's required format
    const formattedPhone = clientPhone.startsWith("+") 
      ? clientPhone 
      : `+${clientPhone.startsWith("62") ? clientPhone : `62${clientPhone.replace(/^0+/, '')}`}`;

    // Sender name
    const senderName = userData.company_name || userData.full_name || "YourBusiness";
    const senderID = "INVOICE"; // SMS sender ID (if supported by your provider)

    // Compose SMS message (keep it concise due to SMS character limits)
    const smsText = `${clientName}, your invoice ${invoiceTitle} from ${senderName} is ready. View it here: ${shareLink}`;

    // Send SMS
    await sendSMS({
      from: senderID,
      to: formattedPhone,
      text: smsText
    });

    // Log SMS sent activity
    try {
      await supabaseClient.from("invoice_activities").insert({
        invoice_id: invoiceId,
        user_id: user.id,
        activity_type: "notification_sent",
        channel: "sms",
        details: {
          recipient: formattedPhone,
          recipient_name: clientName,
          share_link: shareLink,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (logError) {
      console.error("Error logging SMS activity:", logError);
    }

    return new Response(
      JSON.stringify({ success: true, message: "SMS notification sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending SMS:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}); 