-- Create invoice_activities table to track invoice-related activities
CREATE TABLE IF NOT EXISTS "invoice_activities" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "invoice_id" uuid NOT NULL REFERENCES "invoices"("id") ON DELETE CASCADE,
  "user_id" uuid NOT NULL REFERENCES "auth"."users"("id") ON DELETE CASCADE,
  "activity_type" text NOT NULL,
  "channel" text,
  "details" jsonb DEFAULT '{}',
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

-- Add indexes for common query patterns
CREATE INDEX IF NOT EXISTS "idx_invoice_activities_invoice_id" ON "invoice_activities"("invoice_id");
CREATE INDEX IF NOT EXISTS "idx_invoice_activities_user_id" ON "invoice_activities"("user_id");
CREATE INDEX IF NOT EXISTS "idx_invoice_activities_activity_type" ON "invoice_activities"("activity_type");
CREATE INDEX IF NOT EXISTS "idx_invoice_activities_channel" ON "invoice_activities"("channel");
CREATE INDEX IF NOT EXISTS "idx_invoice_activities_created_at" ON "invoice_activities"("created_at");

-- Add RLS (Row Level Security) policies
ALTER TABLE "invoice_activities" ENABLE ROW LEVEL SECURITY;

-- Users can only view their own activities
CREATE POLICY "Users can view their own invoice activities" 
  ON "invoice_activities" FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert activities for their own invoices
CREATE POLICY "Users can insert activities for their invoices" 
  ON "invoice_activities" FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Service role can access everything
CREATE POLICY "Service role can do everything" 
  ON "invoice_activities" FOR ALL
  USING (auth.role() = 'service_role');

-- Create a function to log invoice status changes automatically
CREATE OR REPLACE FUNCTION log_invoice_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO invoice_activities (
      invoice_id, 
      user_id, 
      activity_type, 
      details
    ) VALUES (
      NEW.id, 
      NEW.user_id, 
      'status_changed',
      jsonb_build_object(
        'old_status', OLD.status,
        'new_status', NEW.status,
        'timestamp', now()
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function on invoice update
DROP TRIGGER IF EXISTS invoice_status_change_trigger ON invoices;
CREATE TRIGGER invoice_status_change_trigger
  AFTER UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION log_invoice_status_change(); 