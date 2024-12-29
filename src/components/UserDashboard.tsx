import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Video, FileText, CheckCircle } from 'lucide-react';

const stats = [
  {
    icon: Users,
    label: 'Créateurs',
    value: '24',
  },
  {
    icon: Video,
    label: 'Vidéos',
    value: '156',
  },
  {
    icon: FileText,
    label: 'Textes',
    value: '89',
  },
  {
    icon: CheckCircle,
    label: 'Validées',
    value: '45',
  },
];

export function UserDashboard() {
  return (
    <div className="w-80 bg-[#1A1A1A] p-6 flex flex-col gap-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#4A90E2] mb-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold text-white mb-1">Alex Mitchell</h2>
        <Button
          variant="outline"
          className="text-[#4A90E2] border-[#4A90E2] hover:bg-[#4A90E2] hover:text-white"
        >
          Mode Créateur
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-4 bg-[#242424] border-gray-800 flex flex-col items-center gap-2"
          >
            <stat.icon className="w-6 h-6 text-[#4A90E2]" />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-400 text-center">
              {stat.label}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}