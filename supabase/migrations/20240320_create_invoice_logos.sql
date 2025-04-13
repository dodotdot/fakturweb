-- Create the storage bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('invoice-logos', 'invoice-logos', true)
on conflict (id) do nothing;

-- Enable RLS
alter table storage.objects enable row level security;

-- Create storage policies
create policy "Allow public viewing of logos"
on storage.objects for select
using ( bucket_id = 'invoice-logos' );

create policy "Allow authenticated users to upload logos"
on storage.objects for insert
with check ( 
  bucket_id = 'invoice-logos' 
  and auth.role() = 'authenticated'
);

create policy "Allow users to update their own logos"
on storage.objects for update
using ( bucket_id = 'invoice-logos' and auth.uid() = owner )
with check ( bucket_id = 'invoice-logos' and auth.uid() = owner );

create policy "Allow users to delete their own logos"
on storage.objects for delete
using ( bucket_id = 'invoice-logos' and auth.uid() = owner );

-- Create invoice_logos table if it doesn't exist
create table if not exists public.invoice_logos (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    file_path text not null,
    public_url text not null,
    file_name text not null,
    file_type text not null,
    file_size integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on invoice_logos table
alter table public.invoice_logos enable row level security;

-- Create policies for invoice_logos table
create policy "Allow users to view their own logo records"
on public.invoice_logos for select
using (auth.uid() = user_id);

create policy "Allow users to insert their own logo records"
on public.invoice_logos for insert
with check (auth.uid() = user_id);

create policy "Allow users to update their own logo records"
on public.invoice_logos for update
using (auth.uid() = user_id);

create policy "Allow users to delete their own logo records"
on public.invoice_logos for delete
using (auth.uid() = user_id); 