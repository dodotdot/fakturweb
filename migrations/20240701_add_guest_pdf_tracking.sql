-- Create the extension for UUID generation if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the guest_pdf_generations table
CREATE TABLE IF NOT EXISTS guest_pdf_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  amount INTEGER NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  guest_name TEXT,
  guest_email TEXT,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_guest_pdf_generations_generated_at ON guest_pdf_generations(generated_at);
CREATE INDEX IF NOT EXISTS idx_guest_pdf_generations_guest_email ON guest_pdf_generations(guest_email);

-- Add RLS policies to ensure only authenticated users with admin role can access the data
ALTER TABLE guest_pdf_generations ENABLE ROW LEVEL SECURITY;

-- Only allow admins to read the data
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'guest_pdf_generations' 
        AND policyname = 'guest_pdf_generations_select_policy'
    ) THEN
        CREATE POLICY guest_pdf_generations_select_policy ON guest_pdf_generations
            FOR SELECT 
            USING (
                (SELECT role FROM auth.users WHERE id = auth.uid()) = 'superadmin'
            );
    END IF;
END
$$;

-- Allow any user to insert data (for tracking purposes)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'guest_pdf_generations' 
        AND policyname = 'guest_pdf_generations_insert_policy'
    ) THEN
        CREATE POLICY guest_pdf_generations_insert_policy ON guest_pdf_generations
            FOR INSERT
            WITH CHECK (TRUE);
    END IF;
END
$$;

-- Allow system role to do anything
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'guest_pdf_generations' 
        AND policyname = 'guest_pdf_generations_all_policy'
    ) THEN
        CREATE POLICY guest_pdf_generations_all_policy ON guest_pdf_generations
            FOR ALL
            USING (auth.role() = 'service_role');
    END IF;
END
$$; 