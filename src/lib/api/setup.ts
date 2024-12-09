import { supabase } from '../supabase';

export async function setupDatabase() {
  try {
    // Create herbs table if it doesn't exist
    const { error: herbsError } = await supabase.rpc('create_herbs_table');

    if (herbsError) {
      console.error('Error creating herbs table:', herbsError);
      throw herbsError;
    }

    // Create storage bucket for herb images if it doesn't exist
    const { error: storageError } = await supabase.storage.createBucket('herb-images', {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
      fileSizeLimit: 10485760 // 10MB
    });

    if (storageError && !storageError.message.includes('already exists')) {
      console.error('Error creating storage bucket:', storageError);
      throw storageError;
    }

    console.log('Database setup completed successfully');
    return true;
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
}