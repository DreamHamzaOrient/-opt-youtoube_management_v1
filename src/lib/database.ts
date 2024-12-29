import { supabase } from './supabase';

interface TableStatus {
  exists: boolean;
  rowCount: number | null;
  error: string | null;
}

interface DatabaseStatus {
  isConnected: boolean;
  tablesExist: boolean;
  error: string | null;
  tables: {
    youtubeurs: TableStatus;
    videos: TableStatus;
    actions: TableStatus;
  };
}

async function checkTableStatus(tableName: string): Promise<TableStatus> {
  try {
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (error) {
      if (error.message.includes(`relation "${tableName}" does not exist`)) {
        return { exists: false, rowCount: null, error: null };
      }
      return { exists: false, rowCount: null, error: error.message };
    }

    return { exists: true, rowCount: count, error: null };
  } catch (error) {
    return {
      exists: false,
      rowCount: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function checkDatabaseStatus(): Promise<DatabaseStatus> {
  try {
    const [youtubeurs, videos, actions] = await Promise.all([
      checkTableStatus('youtubeurs'),
      checkTableStatus('videos'),
      checkTableStatus('actions')
    ]);
    
    const allTablesExist = youtubeurs.exists && videos.exists && actions.exists;
    const anyError = youtubeurs.error || videos.error || actions.error;

    return {
      isConnected: !anyError,
      tablesExist: allTablesExist,
      error: anyError || (allTablesExist ? null : 'Certaines tables sont manquantes'),
      tables: { youtubeurs, videos, actions }
    };
  } catch (error) {
    return {
      isConnected: false,
      tablesExist: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      tables: {
        youtubeurs: { exists: false, rowCount: null, error: null },
        videos: { exists: false, rowCount: null, error: null },
        actions: { exists: false, rowCount: null, error: null }
      }
    };
  }
}