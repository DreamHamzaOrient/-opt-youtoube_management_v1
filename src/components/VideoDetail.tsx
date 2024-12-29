import { Card } from '@/components/ui/card';
import { Video, FileText, Podcast, CheckCircle, XCircle, ArrowLeft, BellRing } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AudioPlayer } from './AudioPlayer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ActionsList } from './ActionsList';
import { useActions } from '@/hooks/useActions';
import { ActionForm } from './ActionForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface VideoDetailProps {
  video: {
    id: string;
    youtuber: {
      name: string;
      avatar: string;
    };
    title: string;
    description: string;
    publishedAt: string;
    etat: 'recent' | 'en_cours' | 'valide';
    transcription?: string;
    audio_url: string | null;
    lien_video?: string | null;
    duree?: string | null;
  };
  onBack: () => void;
}

export function VideoDetail({ video, onBack }: VideoDetailProps) {
  const [activeSection, setActiveSection] = useState<'info' | 'transcription' | 'audio' | 'actions'>('info');
  const { actions, loading, error } = useActions(video.id);
  const [showActionForm, setShowActionForm] = useState(false);

  const badges = [
    { icon: Video, color: 'bg-red-500 hover:bg-red-600', label: 'Vidéo' },
    { icon: FileText, color: 'bg-yellow-500 hover:bg-yellow-600', label: 'Transcription' },
    { icon: Podcast, color: 'bg-white hover:bg-gray-100 text-black', label: 'Audio' },
    { icon: BellRing, color: 'bg-[#4A90E2] hover:bg-[#357ABD]', label: 'Statut' },
  ];

  // Override the last badge for validated videos
  if (video.etat === 'valide') {
    badges[3] = { icon: CheckCircle, color: 'bg-green-500 hover:bg-green-600', label: 'Statut' };
  } else if (video.etat === 'en_cours') {
    badges[3] = { icon: XCircle, color: 'bg-gray-500 hover:bg-gray-600', label: 'Statut' };
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        className="mb-6 text-gray-400 hover:text-white"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      <Card className="bg-[#242424] border-[#2A2A2A] p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#4A90E2]">
            <img
              src={video.youtuber.avatar}
              alt={video.youtuber.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
            <p className="text-gray-400 mb-4">{video.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#4A90E2] font-medium">{video.youtuber.name}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">Publié le {video.publishedAt}</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {badges.map((badge, index) => (
                <button
                  key={index}
                  onClick={() => { 
                    if (badge.label === 'Vidéo' && video.lien_video) {
                      window.open(video.lien_video, '_blank');
                    } else if (badge.label === 'Transcription') {
                      setActiveSection('transcription');
                    } else if (badge.label === 'Audio') {
                      setActiveSection('audio');
                    } else if (badge.label === 'Statut') {
                      setActiveSection('actions');
                    }
                  }}
                  className={cn(
                    'p-4 rounded-lg flex flex-col items-center gap-2 transition-all',
                    'hover:scale-105 hover:shadow-lg',
                    badge.color
                  )}
                >
                  <badge.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
      
      {activeSection === 'transcription' && (
        <Card className="mt-6 bg-[#242424] border-[#2A2A2A] p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Transcription</h2>
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={() => setActiveSection('info')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux informations
            </Button>
          </div>
          <div className="prose prose-invert max-w-none">
            {video.transcription ? (
              <p className="text-gray-300 whitespace-pre-wrap">{video.transcription}</p>
            ) : (
              <p className="text-gray-500 italic">Aucune transcription disponible pour cette vidéo.</p>
            )}
          </div>
        </Card>
      )}
      
      {activeSection === 'audio' && (
        <Card className="mt-6 bg-[#242424] border-[#2A2A2A] p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Lecteur Audio</h2>
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={() => setActiveSection('info')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux informations
            </Button>
          </div>
          
          {video.audio_url ? (
            <div className="flex flex-col items-center gap-4">
              <AudioPlayer
                url={video.audio_url}
                onError={(e) => {
                  console.error('Erreur de chargement audio:', e);
                  console.log('URL audio tentée:', video.audio_url);
                }}
              />
              <Button
                variant="link"
                className="text-xs text-[#4A90E2]"
                onClick={() => video.audio_url ? window.open(video.audio_url, '_blank') : undefined}
              >
                Tester le lien direct
              </Button>
            </div>
          ) : (
            <p className="text-gray-500 italic text-center">
              Aucun fichier audio disponible pour cette vidéo.
            </p>
          )}
        </Card>
      )}
      
      {activeSection === 'actions' && (
        <Card className="mt-6 bg-[#242424] border-[#2A2A2A] p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Actions</h2>
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={() => setActiveSection('info')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux informations
            </Button>
          </div>
          
          {loading ? (
            <p className="text-gray-400">Chargement des actions...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <>
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowActionForm(true)}
                  variant="outline"
                  className="text-[#4A90E2] border-[#4A90E2] hover:bg-[#4A90E2] hover:text-white"
                >
                  +
                </Button>
              </div>
              {actions.length === 0 ? (
                <p className="text-gray-500 italic text-center mt-4">
                  Aucune action pour cette vidéo.
                </p>
              ) : (
                <ActionsList actions={actions} />
              )}
            </>
          )}
        </Card>
      )}
      
      <Dialog open={showActionForm} onOpenChange={setShowActionForm}>
        <DialogContent className="sm:max-w-[500px] bg-[#242424] border-[#2A2A2A]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">Nouvelle action</DialogTitle>
          </DialogHeader>
          <ActionForm
            videoId={video.id}
            onSuccess={() => {
              setShowActionForm(false);
              // Refresh actions list
              window.location.reload();
            }}
            onCancel={() => setShowActionForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}