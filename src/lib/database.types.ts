export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      youtubeurs: {
        Row: {
          id: string
          channel_id: string | null
          nom: string
          description: string | null
          lien_chaine: string | null
          url_image_default: string | null
          url_image_medium: string | null
          url_image_high: string | null
          nombre_abonnes: number
          nombre_videos: number
          date_creation: string | null
          categorie: string | null
          langue: string
          date_ajout: string
          created_at: string
        }
        Insert: {
          id?: string
          channel_id?: string | null
          nom: string
          description?: string | null
          lien_chaine?: string | null
          url_image_default?: string | null
          url_image_medium?: string | null
          url_image_high?: string | null
          nombre_abonnes?: number
          nombre_videos?: number
          date_creation?: string | null
          categorie?: string | null
          langue?: string
          date_ajout?: string
          created_at?: string
        }
        Update: {
          id?: string
          channel_id?: string | null
          nom?: string
          description?: string | null
          lien_chaine?: string | null
          url_image_default?: string | null
          url_image_medium?: string | null
          url_image_high?: string | null
          nombre_abonnes?: number
          nombre_videos?: number
          date_creation?: string | null
          categorie?: string | null
          langue?: string
          date_ajout?: string
          created_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          youtubeur_id: string
          video_id: string | null
          titre: string
          description: string | null
          lien_video: string | null
          etat: 'recent' | 'en_cours' | 'valide'
          date_publication: string | null
          transcription: string | null
          highlight_text: string | null
          podcast_audio_url: string | null
          highlight_audio_url: string | null
          date_ajout: string
          created_at: string
        }
        Insert: {
          id?: string
          youtubeur_id: string
          video_id?: string | null
          titre: string
          description?: string | null
          lien_video?: string | null
          etat?: 'recent' | 'en_cours' | 'valide'
          date_publication?: string | null
          transcription?: string | null
          highlight_text?: string | null
          podcast_audio_url?: string | null
          highlight_audio_url?: string | null
          date_ajout?: string
          created_at?: string
        }
        Update: {
          id?: string
          youtubeur_id?: string
          video_id?: string | null
          titre?: string
          description?: string | null
          lien_video?: string | null
          etat?: 'recent' | 'en_cours' | 'valide'
          date_publication?: string | null
          transcription?: string | null
          highlight_text?: string | null
          podcast_audio_url?: string | null
          highlight_audio_url?: string | null
          date_ajout?: string
          created_at?: string
        }
      }
      actions: {
        Row: {
          id: string
          video_id: string
          nom_action: string
          description: string | null
          etat_action: 'pending' | 'in_progress' | 'completed'
          date_creation: string
          date_closure: string | null
          created_at: string
        }
        Insert: {
          id?: string
          video_id: string
          nom_action: string
          description?: string | null
          etat_action?: 'pending' | 'in_progress' | 'completed'
          date_creation?: string
          date_closure?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          video_id?: string
          nom_action?: string
          description?: string | null
          etat_action?: 'pending' | 'in_progress' | 'completed'
          date_creation?: string
          date_closure?: string | null
          created_at?: string
        }
      }
    }
  }
}