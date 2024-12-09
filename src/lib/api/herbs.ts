import { supabase } from './supabase';
import type { Herb } from '../../types/herb';

export async function getHerbs() {
  const { data, error } = await supabase
    .from('herbs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getHerb(id: string) {
  const { data, error } = await supabase
    .from('herbs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createHerb(herb: Omit<Herb, 'id'>) {
  const { data, error } = await supabase
    .from('herbs')
    .insert([herb])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateHerb(id: string, herb: Partial<Herb>) {
  const { data, error } = await supabase
    .from('herbs')
    .update(herb)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Update error:', error);
    throw error;
  }
  return data;
}

export async function deleteHerb(id: string) {
  const { error } = await supabase
    .from('herbs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function uploadHerbImage(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from('herb-images')
    .upload(path, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('herb-images')
    .getPublicUrl(path);

  return publicUrl;
}