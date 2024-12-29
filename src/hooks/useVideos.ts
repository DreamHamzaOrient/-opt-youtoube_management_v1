import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Video = Database['public']['Tables']['videos']['Row'] & {
  youtubeur: Database['public']['Tables']['youtubeurs']['Row'];
};

export function useVideos(etat: 'recent' | 'en_cours' | 'valide') {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const VIDEOS_PER_PAGE = 5;

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('videos')
          .select(`
            *,
            youtubeur: youtubeurs (*)
          `)
          .eq('etat', etat)
          .order('date_publication', { ascending: false })
          .range(0, page * VIDEOS_PER_PAGE - 1);

        if (error) throw error;
        setVideos(data || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [etat, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return { videos, loading, error, loadMore };
}