import { Card } from '@/components/ui/card';
import { Video, FileText, Podcast, CheckCircle, BellRing, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  youtuber: {
    name: string;
    avatar: string;
  };
  title: string;
  description: string;
  publishedAt: string;
  etat?: 'recent' | 'en_cours' | 'valide';
}

export function VideoCard({ youtuber, title, description, publishedAt, etat = 'recent' }: VideoCardProps) {
  const badges = [
    { icon: Video, color: 'bg-red-500 hover:bg-red-600', label: 'L' },
    { icon: FileText, color: 'bg-yellow-500 hover:bg-yellow-600', label: 'T' },
    { icon: Podcast, color: 'bg-white hover:bg-gray-100 text-black', label: 'A' },
    { icon: BellRing, color: 'bg-blue-500 hover:bg-blue-600', label: 'S' },
  ];

  // Override the last badge for validated videos
  if (etat === 'valide') {
    badges[3] = { icon: CheckCircle, color: 'bg-green-500 hover:bg-green-600', label: 'S' };
  } else if (etat === 'en_cours') {
    badges[3] = { icon: XCircle, color: 'bg-gray-500 hover:bg-gray-600', label: 'S' };
  }

  return (
    <Card className="p-4 bg-[#242424] border-[#2A2A2A] hover:border-gray-700 transition-all">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-700">
          <img
            src={youtuber.avatar}
            alt={youtuber.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-2">{description}</p>
          <p className="text-gray-500 text-xs mb-4">Publié le {publishedAt}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        {badges.map((badge, index) => (
          <button
            key={index}
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center transition-all',
              'hover:scale-105 hover:shadow-lg',
              badge.color
            )}
          >
            <badge.icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </Card>
  );
}