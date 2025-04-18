# Database Migrations

This directory contains SQL migration files for updating the database schema.

## How to Apply Migrations

### Using Supabase CLI (Development)

If you're using Supabase CLI for local development:

```bash
supabase db reset
```

This will apply all migrations in the `supabase/migrations` folder.

### Direct SQL Execution (Production)

For production environments, you can run the SQL files directly in the Supabase SQL Editor:

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of the SQL file
5. Click "Run" to execute the query

## Migration Files

- `add_public_invoice_support.sql` - Adds support for public invoice sharing, including:
  - `is_public` column to the `invoices` table
  - `public_invoice_views` table to track views and downloads
  - Appropriate indices and RLS policies

## Implementation Notes

### Public Invoices

The `is_public` column in the `invoices` table determines whether an invoice can be viewed without authentication.

Public invoices can be accessed via:
- `/invoice/public/:id` - Direct view
- `/share/invoice/:id` - Sharing link that redirects to the public view

### Analytics

The `public_invoice_views` table tracks when public invoices are:
- Viewed
- Downloaded
- Shared

This data can be used for analytics purposes to track engagement with your public invoices. 