import { cn } from '@/lib/utils';
import {
  Video,
  Users,
  Star,
  PlayCircle,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  onConfigClick: () => void;
}

const categories = [
  {
    icon: Video,
    label: 'Catégories',
    description: 'Gérer les catégories des vidéos',
  },
  {
    icon: Users,
    label: 'YouTubeurs',
    description: 'Gérer les créateurs suivis',
  },
  {
    icon: Star,
    label: 'Highlights',
    description: 'Gérer les moments forts',
  },
  {
    icon: PlayCircle,
    label: 'Actions',
    description: 'Actions en attente',
  },
  {
    icon: Settings,
    label: 'Configuration',
    description: 'Paramètres de l\'application',
  },
];

export function Sidebar({ onConfigClick }: SidebarProps) {
  return (
    <nav className="w-64 bg-[#1A1A1A] p-4 flex flex-col gap-2">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={category.label === 'Configuration' ? onConfigClick : undefined}
          className={cn(
            'flex items-center gap-3 p-3 rounded-lg w-full text-left',
            'transition-all duration-200 group',
            'hover:bg-[#2A2A2A]'
          )}
        >
          <category.icon
            className={cn(
              'w-5 h-5 text-gray-400',
              'group-hover:text-[#4A90E2] group-hover:scale-110',
              'transition-all duration-200'
            )}
          />
          <div>
            <div className={cn(
              'text-sm font-medium text-gray-200',
              'group-hover:text-[#4A90E2]',
              'transition-colors duration-200'
            )}>
              {category.label}
            </div>
            <div className="text-xs text-gray-500">
              {category.description}
            </div>
          </div>
        </button>
      ))}
    </nav>
  );
}