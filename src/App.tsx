import { VideoColumn } from '@/components/VideoColumn';
import { Sidebar } from '@/components/Sidebar';
import { UserDashboard } from '@/components/UserDashboard';
import { DatabaseMonitoring } from '@/components/DatabaseMonitoring';
import { TopNav } from '@/components/TopNav';
import { VideoDetail } from '@/components/VideoDetail';
import { useState } from 'react';
import type { Database } from '@/lib/database.types';

type Video = Database['public']['Tables']['videos']['Row'] & {
  youtubeur: Database['public']['Tables']['youtubeurs']['Row'];
};

function App() {
  const [isSidebarOpen, _] = useState(true);
  const [currentView, setCurrentView] = useState<'main' | 'config' | 'video'>('main');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="min-h-screen bg-[#121212]">
      <TopNav 
        onMainClick={() => setCurrentView('main')}
      />
      <div className="flex relative">
        <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          absolute top-0 bottom-0 z-20 transition-transform duration-300 md:relative md:translate-x-0`}>
          <Sidebar onConfigClick={() => setCurrentView('config')} />
        </div>
        <main className="flex-1 p-6 overflow-hidden">
          {currentView === 'main' ? (
          <div className="grid grid-cols-3 gap-6">
            <VideoColumn 
              title="Récentes" 
              etat="recent" 
              onVideoClick={(video) => {
                setSelectedVideo(video);
                setCurrentView('video');
              }} 
            />
            <VideoColumn 
              title="En cours de validation" 
              etat="en_cours" 
              onVideoClick={(video) => {
                setSelectedVideo(video);
                setCurrentView('video');
              }}
            />
            <VideoColumn 
              title="Vidéos validées" 
              etat="valide" 
              onVideoClick={(video) => {
                setSelectedVideo(video);
                setCurrentView('video');
              }}
            />
          </div>
          ) : currentView === 'config' ? (
            <DatabaseMonitoring />
          ) : selectedVideo && (
            <VideoDetail
              video={{
                id: selectedVideo.id,
                youtuber: {
                  name: selectedVideo.youtubeur.nom,
                  avatar: selectedVideo.youtubeur.url_image_medium || '',
                },
                title: selectedVideo.titre,
                description: selectedVideo.description || '',
                publishedAt: new Date(selectedVideo.date_publication || '').toLocaleDateString(),
                etat: selectedVideo.etat as 'recent' | 'en_cours' | 'valide',
                transcription: selectedVideo.transcription || undefined,
                audio_url: selectedVideo.audio_url,
                lien_video: selectedVideo.lien_video,
                duree: selectedVideo.duree,
              }}
              onBack={() => {
                setCurrentView('main');
                setSelectedVideo(null);
              }}
            />
          )}
        </main>
        <UserDashboard />
      </div>
    </div>
  );
}

export default App;