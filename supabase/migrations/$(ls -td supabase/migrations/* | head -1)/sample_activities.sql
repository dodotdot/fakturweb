-- Insert sample activities for existing invoices
-- This is meant for testing and can be commented out in production

-- Function to safely insert sample activity data
CREATE OR REPLACE FUNCTION insert_sample_activities() RETURNS void AS $$
DECLARE
    invoice_record RECORD;
BEGIN
    -- Only run if the invoice_activities table exists and is empty
    IF EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'invoice_activities'
    ) AND (SELECT COUNT(*) FROM public.invoice_activities) = 0 THEN
        -- Loop through all invoices
        FOR invoice_record IN SELECT id, user_id, status, created_at FROM public.invoices LOOP
            -- Add a status change activity
            IF invoice_record.status != 'draft' THEN
                INSERT INTO public.invoice_activities (
                    invoice_id,
                    user_id,
                    activity_type,
                    details,
                    created_at
                ) VALUES (
                    invoice_record.id,
                    invoice_record.user_id,
                    'status_changed',
                    jsonb_build_object(
                        'old_status', 'draft',
                        'new_status', invoice_record.status,
                        'timestamp', invoice_record.created_at + interval '1 day'
                    ),
                    invoice_record.created_at + interval '1 day'
                );
            END IF;
            
            -- Add a viewing activity
            INSERT INTO public.invoice_activities (
                invoice_id,
                user_id,
                activity_type,
                details,
                created_at
            ) VALUES (
                invoice_record.id,
                invoice_record.user_id,
                'viewed',
                jsonb_build_object(
                    'timestamp', invoice_record.created_at + interval '2 days',
                    'ip_address', '192.168.1.1'
                ),
                invoice_record.created_at + interval '2 days'
            );
            
            -- Add an email sent activity
            INSERT INTO public.invoice_activities (
                invoice_id,
                user_id,
                activity_type,
                channel,
                details,
                created_at
            ) VALUES (
                invoice_record.id,
                invoice_record.user_id,
                'notification_sent',
                'email',
                jsonb_build_object(
                    'recipient', 'client@example.com',
                    'recipient_name', 'Sample Client',
                    'timestamp', invoice_record.created_at + interval '3 days'
                ),
                invoice_record.created_at + interval '3 days'
            );
            
            -- Add a WhatsApp notification for some invoices
            IF random() < 0.5 THEN
                INSERT INTO public.invoice_activities (
                    invoice_id,
                    user_id,
                    activity_type,
                    channel,
                    details,
                    created_at
                ) VALUES (
                    invoice_record.id,
                    invoice_record.user_id,
                    'notification_sent',
                    'whatsapp',
                    jsonb_build_object(
                        'recipient', '+628123456789',
                        'recipient_name', 'Sample Client',
                        'share_link', 'https://example.com/invoice/' || invoice_record.id,
                        'timestamp', invoice_record.created_at + interval '4 days'
                    ),
                    invoice_record.created_at + interval '4 days'
                );
            END IF;
            
            -- Add an SMS notification for some invoices
            IF random() < 0.3 THEN
                INSERT INTO public.invoice_activities (
                    invoice_id,
                    user_id,
                    activity_type,
                    channel,
                    details,
                    created_at
                ) VALUES (
                    invoice_record.id,
                    invoice_record.user_id,
                    'notification_sent',
                    'sms',
                    jsonb_build_object(
                        'recipient', '+628123456789',
                        'recipient_name', 'Sample Client',
                        'share_link', 'https://example.com/invoice/' || invoice_record.id,
                        'timestamp', invoice_record.created_at + interval '4.5 days'
                    ),
                    invoice_record.created_at + interval '4.5 days'
                );
            END IF;
            
            -- Add a payment received activity for a few invoices
            IF random() < 0.3 THEN -- Only add for ~30% of invoices
                INSERT INTO public.invoice_activities (
                    invoice_id,
                    user_id,
                    activity_type,
                    details,
                    created_at
                ) VALUES (
                    invoice_record.id,
                    invoice_record.user_id,
                    'payment_received',
                    jsonb_build_object(
                        'amount', (random() * 1000000)::integer,
                        'payment_method', 'bank_transfer',
                        'timestamp', invoice_record.created_at + interval '5 days'
                    ),
                    invoice_record.created_at + interval '5 days'
                );
            END IF;
        END LOOP;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT insert_sample_activities();

-- Drop the function as it's no longer needed
DROP FUNCTION IF EXISTS insert_sample_activities(); 