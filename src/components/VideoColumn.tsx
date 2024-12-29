import { Button } from '@/components/ui/button';
import { VideoCard } from './VideoCard';
import { ChevronDown } from 'lucide-react';
import { useVideos } from '@/hooks/useVideos';
import type { Database } from '@/lib/database.types';

type Video = Database['public']['Tables']['videos']['Row'] & {
  youtubeur: Database['public']['Tables']['youtubeurs']['Row'];
};

export interface VideoColumnProps {
  title: string;
  etat: 'recent' | 'en_cours' | 'valide';
  onVideoClick?: (video: Video) => void;
}

export function VideoColumn({ title, etat, onVideoClick }: VideoColumnProps) {
  const { videos, loading, error, loadMore } = useVideos(etat);

  return (
    <div className="flex-1 min-w-0 bg-[#181818] rounded-lg border border-[#2A2A2A] p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      {loading ? (
        <div className="text-gray-400">Chargement...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : videos.length === 0 ? (
        <div className="text-gray-400">Aucune vidéo trouvée</div>
      ) : (
        <div className="space-y-4">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => onVideoClick?.(video)}
              className="cursor-pointer"
            >
              <VideoCard
                youtuber={{
                  name: video.youtubeur.nom,
                  avatar: video.youtubeur.url_image_medium || '',
                }}
                title={video.titre}
                description={video.description || ''}
                etat={video.etat as 'recent' | 'en_cours' | 'valide'}
                publishedAt={new Date(video.date_publication || '').toLocaleDateString()}
              />
            </div>
          ))}
        </div>
      )}
      <Button
        variant="ghost"
        className="w-full mt-6 text-gray-400 hover:text-white border border-[#2A2A2A] hover:bg-[#2A2A2A]"
        onClick={loadMore}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center">
            <ChevronDown className="mr-2 h-4 w-4 animate-bounce" />
            Chargement...
          </div>
        ) : (
          <div className="flex items-center">
            <ChevronDown className="mr-2 h-4 w-4" />
            Plus de vidéos
          </div>
        )}
      </Button>
    </div>
  );
}