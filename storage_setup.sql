-- Enable storage
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create or update herbs bucket to be public
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'herbs', 
  'herbs', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Set up storage policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'herbs');

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'herbs'
  AND (auth.role() = 'authenticated' OR auth.role() = 'anon')
  AND (storage.foldername(name))[1] = 'herbs'
  AND array_length(regexp_split_to_array(storage.filename(name), '\\.'), 1) = 2
  AND storage.extension(name) = ANY(ARRAY['jpg', 'jpeg', 'png', 'gif', 'webp'])
);

CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'herbs'
  AND (auth.role() = 'authenticated' OR auth.role() = 'anon')
)
WITH CHECK (
  bucket_id = 'herbs'
  AND (auth.role() = 'authenticated' OR auth.role() = 'anon')
);

CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'herbs'
  AND (auth.role() = 'authenticated' OR auth.role() = 'anon')
);
