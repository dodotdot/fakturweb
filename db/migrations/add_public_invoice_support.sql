-- Add is_public column to invoices table
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

-- Create table to track public invoice views
CREATE TABLE IF NOT EXISTS public.public_invoice_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  view_type TEXT NOT NULL CHECK (view_type IN ('view', 'download', 'share')),
  ip_address TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indices for faster lookups
CREATE INDEX IF NOT EXISTS idx_public_invoice_views_invoice_id ON public.public_invoice_views(invoice_id);
CREATE INDEX IF NOT EXISTS idx_public_invoice_views_view_type ON public.public_invoice_views(view_type);
CREATE INDEX IF NOT EXISTS idx_invoices_is_public ON public.invoices(is_public) WHERE is_public = true;

-- Create policy to allow public access to public invoices
CREATE POLICY IF NOT EXISTS "Public invoices are viewable by everyone" 
  ON public.invoices 
  FOR SELECT 
  USING (is_public = true);

-- Add RLS for public_invoice_views table
ALTER TABLE public.public_invoice_views ENABLE ROW LEVEL SECURITY;

-- Everyone can insert to public_invoice_views
CREATE POLICY IF NOT EXISTS "Anyone can insert public invoice views" 
  ON public.public_invoice_views 
  FOR INSERT 
  WITH CHECK (true);

-- Only invoice owner can view their invoice view stats
CREATE POLICY IF NOT EXISTS "Invoice owners can view their invoice stats" 
  ON public.public_invoice_views 
  FOR SELECT 
  USING (
    invoice_id IN (
      SELECT id FROM public.invoices WHERE user_id = auth.uid()
    )
  );

-- Comment on tables and columns
COMMENT ON TABLE public.public_invoice_views IS 'Tracks views and downloads of public invoices';
COMMENT ON COLUMN public.invoices.is_public IS 'Whether the invoice is publicly accessible without authentication'; 