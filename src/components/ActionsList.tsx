import { Card } from '@/components/ui/card';
import { Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Action {
  id: string;
  nom_action: string;
  description: string | null;
  etat_action: string;
  date_creation: string;
  date_closure: string | null;
}

interface ActionsListProps {
  actions: Action[];
}

export function ActionsList({ actions }: ActionsListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'closed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'closed':
        return 'border-green-500/20';
      case 'in_progress':
        return 'border-yellow-500/20';
      default:
        return 'border-red-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'closed':
        return 'Validé';
      case 'in_progress':
        return 'En cours';
      default:
        return 'Ouvert';
    }
  };

  return (
    <div className="space-y-4">
      {actions.map((action) => (
        <Card
          key={action.id}
          className={cn(
            "p-4 border bg-[#1A1A1A]",
            getStatusColor(action.etat_action)
          )}
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(action.etat_action)}
                <h3 className="font-medium text-white">{action.nom_action}</h3>
              </div>
              <Badge 
                variant="outline" 
                className={cn(
                  "font-medium transition-colors px-3 py-1",
                  action.etat_action === 'closed' && "bg-green-500 text-white border-none",
                  action.etat_action === 'in_progress' && "bg-yellow-500 text-white border-none",
                  action.etat_action === 'open' && "bg-blue-500 text-white border-none"
                )}
              >
                {getStatusText(action.etat_action)}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {action.description && (
                <p className="text-sm text-gray-400">{action.description}</p>
              )}
              
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Créée le {new Date(action.date_creation).toLocaleDateString('fr-FR', {
                    year: '2-digit',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                {action.date_closure && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Clôturée le {new Date(action.date_closure).toLocaleDateString('fr-FR', {
                      year: '2-digit',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}