-- Create beta_testers table
CREATE TABLE IF NOT EXISTS public.beta_testers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    business_name TEXT,
    use_case TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    discount_applied BOOLEAN DEFAULT FALSE,
    free_trial_ends_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_beta_testers_user_id ON public.beta_testers(user_id);
CREATE INDEX IF NOT EXISTS idx_beta_testers_email ON public.beta_testers(email);
CREATE INDEX IF NOT EXISTS idx_beta_testers_status ON public.beta_testers(status);

-- Enable RLS on beta_testers table
ALTER TABLE public.beta_testers ENABLE ROW LEVEL SECURITY;

-- Users can view their own beta tester record
CREATE POLICY "Users can view own beta tester record"
  ON public.beta_testers FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own beta tester record
CREATE POLICY "Users can insert own beta tester record"
  ON public.beta_testers FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Only superadmins can update beta tester records
CREATE POLICY "Superadmins can update beta tester records"
  ON public.beta_testers FOR UPDATE USING (is_superadmin());

-- Superadmins can view all beta tester records
CREATE POLICY "Superadmins can view all beta tester records"
  ON public.beta_testers FOR SELECT USING (is_superadmin() OR auth.uid() = user_id);

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_beta_testers_updated_at ON public.beta_testers;
CREATE TRIGGER update_beta_testers_updated_at
  BEFORE UPDATE ON public.beta_testers
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column(); 