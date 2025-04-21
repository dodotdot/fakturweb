-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT,
  business_email TEXT,
  business_phone TEXT,
  business_address TEXT,
  business_website TEXT,
  business_tax_id TEXT,
  business_logo TEXT,
  business_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Copy existing business data from users table to profiles table
INSERT INTO profiles (id, user_id, company_name, business_email, business_phone, business_address, business_website, business_tax_id, business_logo, business_description)
SELECT id, id, company_name, business_email, business_phone, business_address, business_website, business_tax_id, business_logo, business_description
FROM users
WHERE company_name IS NOT NULL 
   OR business_email IS NOT NULL 
   OR business_phone IS NOT NULL 
   OR business_address IS NOT NULL 
   OR business_website IS NOT NULL 
   OR business_tax_id IS NOT NULL 
   OR business_logo IS NOT NULL 
   OR business_description IS NOT NULL;

-- Add RLS policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Remove business fields from users table
ALTER TABLE users 
  DROP COLUMN IF EXISTS company_name,
  DROP COLUMN IF EXISTS business_email,
  DROP COLUMN IF EXISTS business_phone,
  DROP COLUMN IF EXISTS business_address,
  DROP COLUMN IF EXISTS business_website,
  DROP COLUMN IF EXISTS business_tax_id,
  DROP COLUMN IF EXISTS business_logo,
  DROP COLUMN IF EXISTS business_description;

-- Add updated_at trigger to automatically update the timestamp
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column(); 