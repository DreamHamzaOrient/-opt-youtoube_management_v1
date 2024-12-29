import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Action = Database['public']['Tables']['actions']['Row'];

export function useActions(videoId: string) {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActions() {
      try {
        if (!videoId) return;
        
        const { data, error } = await supabase
          .from('actions')
          .select('*')
          .eq('video_id', videoId)
          .order('date_creation', { ascending: true });

        if (error) throw error;
        setActions(data || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchActions();
  }, [videoId]);

  return { actions, loading, error };
}