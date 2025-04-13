-- Add logo column to invoices table
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS logo text;

-- Add comment to the column
COMMENT ON COLUMN invoices.logo IS 'URL of the invoice logo image stored in Supabase Storage'; 