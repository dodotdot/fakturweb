-- Enable UUID extension if it's not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop the existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create a simplified function to handle new users
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
    existing_user_count INTEGER;
BEGIN
    -- Check if user already exists in public.users to avoid duplicate errors
    SELECT COUNT(*) INTO existing_user_count 
    FROM public.users 
    WHERE id = NEW.id;
    
    -- Only insert if user doesn't already exist
    IF existing_user_count = 0 THEN
        BEGIN
            -- Simplified version with better error handling
            INSERT INTO public.users (id, email, full_name)
            VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
        EXCEPTION
            WHEN OTHERS THEN
                -- Log the detailed error (appears in Supabase logs)
                RAISE LOG 'Error in handle_new_user for user_id=%, email=%: %', 
                    NEW.id, NEW.email, SQLERRM;
        END;
    END IF;
    
    -- Always continue regardless of success or failure
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Ensure the users table allows NULL for some fields
ALTER TABLE public.users ALTER COLUMN full_name DROP NOT NULL;
ALTER TABLE public.users ALTER COLUMN avatar_url DROP NOT NULL; 