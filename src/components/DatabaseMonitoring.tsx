import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { checkDatabaseStatus } from '@/lib/database';
import { AlertCircle, CheckCircle, Users, Video, PlayCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TableStats {
  name: string;
  count: number;
  status: 'ok' | 'error';
  lastSync?: string;
  icon: typeof Users | typeof Video | typeof PlayCircle;
}

export function DatabaseMonitoring() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [tablesExist, setTablesExist] = useState<boolean>(false);
  const [tableStats, setTableStats] = useState<TableStats[]>([
    { name: 'YouTubeurs', count: 0, status: 'error', icon: Users },
    { name: 'Vidéos', count: 0, status: 'error', icon: Video },
    { name: 'Actions', count: 0, status: 'error', icon: PlayCircle }
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshInterval = 30000; // 30 seconds

  useEffect(() => {
    initializeDatabase();
    
    const interval = setInterval(() => {
      if (!loading) {
        initializeDatabase();
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, []);

  async function initializeDatabase() {
    setLoading(true);
    try {
      const status = await checkDatabaseStatus();
      setIsConnected(status.isConnected);
      setTablesExist(status.tablesExist);
      setError(status.error);
      
      setTableStats([
        {
          name: 'YouTubeurs',
          count: status.tables.youtubeurs.rowCount || 0,
          status: status.tables.youtubeurs.exists ? 'ok' : 'error',
          lastSync: new Date().toLocaleString(),
          icon: Users
        },
        {
          name: 'Vidéos',
          count: status.tables.videos.rowCount || 0,
          status: status.tables.videos.exists ? 'ok' : 'error',
          lastSync: new Date().toLocaleString(),
          icon: Video
        },
        {
          name: 'Actions',
          count: status.tables.actions.rowCount || 0,
          status: status.tables.actions.exists ? 'ok' : 'error',
          lastSync: new Date().toLocaleString(),
          icon: PlayCircle
        }
      ]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to check database status');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">État de la Base de Données</h1>
        <Button
          onClick={() => initializeDatabase()}
          variant="outline"
          className="text-[#4A90E2] border-[#4A90E2] hover:bg-[#4A90E2] hover:text-white"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {/* Status de connexion */}
      <Card className="p-6 bg-[#242424] border-[#2A2A2A]">
        <div className="flex items-center gap-4">
          {isConnected ? (
            <CheckCircle className="w-8 h-8 text-green-500" />
          ) : (
            <AlertCircle className="w-8 h-8 text-red-500" />
          )}
          <div>
            <h2 className="text-lg font-semibold text-white">
              État de la connexion
            </h2>
            <p className={`${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? 'Connecté à Supabase' : 'Erreur de connexion'}
            </p>
            {error && (
              <p className="text-sm text-red-400 mt-2">
                {error}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Statistiques des tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tableStats.map((table) => (
          <Card
            key={table.name}
            className="p-6 bg-[#242424] border-[#2A2A2A] hover:border-gray-700 transition-all"
          >
            <div className="flex items-center gap-4">
              <table.icon className="w-8 h-8 text-[#4A90E2]" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{table.name}</h3>
                <p className="text-2xl font-bold text-[#4A90E2]">
                  {loading ? '...' : table.count.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Dernière synchro: {table.lastSync}
                </p>
              </div>
              {table.status === 'ok' ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}