import { supabase } from '../supabase';
import type { Herb } from '../../types/herb';

export async function getHerbs(): Promise<Herb[]> {
  const { data, error } = await supabase
    .from('herbs')
    .select('*')
    .order('common_name', { ascending: true });

  if (error) {
    console.error('Error fetching herbs:', error);
    throw new Error('Failed to fetch herbs');
  }

  return data || [];
}

export async function getHerb(id: string): Promise<Herb> {
  const { data, error } = await supabase
    .from('herbs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching herb:', error);
    throw new Error('Failed to fetch herb');
  }

  return data;
}

export async function createHerb(herb: Omit<Herb, 'id'>): Promise<Herb> {
  const { data, error } = await supabase
    .from('herbs')
    .insert([herb])
    .select()
    .single();

  if (error) {
    console.error('Error creating herb:', error);
    throw new Error('Failed to create herb');
  }

  return data;
}

export async function updateHerb(id: string, herb: Partial<Herb>): Promise<Herb> {
  const { data, error } = await supabase
    .from('herbs')
    .update(herb)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating herb:', error);
    throw new Error('Failed to update herb');
  }

  return data;
}

export async function deleteHerb(id: string): Promise<void> {
  const { error } = await supabase
    .from('herbs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting herb:', error);
    throw new Error('Failed to delete herb');
  }
}

export async function uploadHerbImage(file: File, path: string): Promise<string> {
  const { error: uploadError } = await supabase.storage
    .from('herb-images')
    .upload(path, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw new Error('Failed to upload image');
  }

  const { data: { publicUrl } } = supabase.storage
    .from('herb-images')
    .getPublicUrl(path);

  return publicUrl;
}