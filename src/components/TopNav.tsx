import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopNavProps {
  onMenuClick: () => void;
  onMainClick?: () => void;
}

export function TopNav({ onMenuClick, onMainClick }: TopNavProps) {
  return (
    <div className="h-16 bg-[#1A1A1A] border-b border-[#2A2A2A] px-4 flex items-center justify-between">
      <Button
        onClick={onMainClick}
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-[#4A90E2]"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-white">YouTube Manager</h1>
      </div>
    </div>
  );
}