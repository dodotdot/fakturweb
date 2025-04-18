-- Add role column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user' NOT NULL;

-- Create a function to check if user is a superadmin
CREATE OR REPLACE FUNCTION is_superadmin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'superadmin'
    FROM public.users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create policy to allow superadmins to view all users
CREATE POLICY "Superadmins can view all users"
  ON public.users
  FOR SELECT
  USING (is_superadmin() OR auth.uid() = id);

-- Create policy to allow superadmins to view all invoices
CREATE POLICY "Superadmins can view all invoices"
  ON public.invoices
  FOR SELECT
  USING (is_superadmin() OR auth.uid() = user_id);

-- Create policy to allow superadmins to view all clients
CREATE POLICY "Superadmins can view all clients"
  ON public.clients
  FOR SELECT
  USING (is_superadmin() OR auth.uid() = user_id);

-- Create policy to allow superadmins to view all logos
CREATE POLICY "Superadmins can view all logo records"
  ON public.invoice_logos
  FOR SELECT
  USING (is_superadmin() OR auth.uid() = user_id);

-- Create a function to set the first user as superadmin
-- You can manually call this after migration to promote a user:
-- SELECT set_superadmin('user-email@example.com');
CREATE OR REPLACE FUNCTION set_superadmin(admin_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.users
  SET role = 'superadmin'
  WHERE email = admin_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 