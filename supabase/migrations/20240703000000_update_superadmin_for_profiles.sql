-- Create policy to allow superadmins to view all profiles
CREATE POLICY "Superadmins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (is_superadmin() OR auth.uid() = id);

-- Create policy to allow superadmins to update all profiles
CREATE POLICY "Superadmins can update all profiles"
  ON public.profiles
  FOR UPDATE
  USING (is_superadmin() OR auth.uid() = id);

-- Create policy to allow superadmins to insert profiles
CREATE POLICY "Superadmins can insert profiles"
  ON public.profiles
  FOR INSERT
  WITH CHECK (is_superadmin() OR auth.uid() = id); 