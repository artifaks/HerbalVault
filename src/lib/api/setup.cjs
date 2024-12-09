const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://guafuutwjluavxwkfvbk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1YWZ1dXR3amx1YXZ4d2tmdmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2Njg1NTIsImV4cCI6MjA0OTI0NDU1Mn0.Ep8_FmuLebw9iB9J1cLcO1fC3VaDGtYF4W_ovHn7Rx0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    // Create herbs table
    const { error: createTableError } = await supabase
      .from('herbs')
      .select('*')
      .limit(1)
      .catch(async () => {
        // Table doesn't exist, create it
        return await supabase.rpc('create_herbs_table', {
          table_definition: `
            id uuid default uuid_generate_v4() primary key,
            created_at timestamp with time zone default timezone('utc'::text, now()) not null,
            scientific_name text not null,
            common_name text not null,
            description text not null,
            history text not null,
            traditional_uses text[] not null,
            modern_uses text[] not null,
            dosage text not null,
            safety_precautions text[] not null,
            images jsonb not null
          `
        });
      });

    if (createTableError) {
      console.error('Error creating herbs table:', createTableError);
      throw createTableError;
    }

    // Create storage bucket for herb images
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

setupDatabase().catch(console.error);