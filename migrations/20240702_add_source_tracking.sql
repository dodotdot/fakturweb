-- Add source column to track the generation method (pdf, whatsapp, email)
ALTER TABLE guest_pdf_generations 
  ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'pdf';

-- Add index for source column to improve query performance
CREATE INDEX IF NOT EXISTS idx_guest_pdf_generations_source 
  ON guest_pdf_generations(source);

-- Add comment to describe the source column
COMMENT ON COLUMN guest_pdf_generations.source IS 'The method used to generate/share the invoice (pdf, whatsapp, email)';

-- Backfill existing rows with 'pdf' as the source if needed
UPDATE guest_pdf_generations 
  SET source = 'pdf' 
  WHERE source IS NULL; 