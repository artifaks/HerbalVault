import { supabase } from './supabase';

export async function uploadImage(file: File, path: string): Promise<string> {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('Image must be less than 5MB');
  }

  // Validate file extension
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !allowedExtensions.includes(extension)) {
    throw new Error(`File must be one of: ${allowedExtensions.join(', ')}`);
  }

  try {
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('herbs')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      });

    if (error) {
      console.error('Upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Upload failed: No data returned');
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('herbs')
      .getPublicUrl(path);

    // Ensure the URL is using HTTPS
    const url = new URL(publicUrl);
    url.protocol = 'https:';

    return url.toString();
  } catch (err) {
    console.error('Storage error:', err);
    throw err;
  }
}
