import { supabase } from './supabase';

export async function updateVideoStatus(videoId: string, etat: string) {
  try {
    const { error } = await supabase
      .from('videos')
      .update({ etat })
      .eq('id', videoId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating video status:', error);
    return false;
  }
}