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
          nombre_abonnes: number | null
          nombre_videos: number | null
          date_creation: string | null
          categorie: string | null
          langue: string | null
          date_ajout: string | null
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
          nombre_abonnes?: number | null
          nombre_videos?: number | null
          date_creation?: string | null
          categorie?: string | null
          langue?: string | null
          date_ajout?: string | null
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
          nombre_abonnes?: number | null
          nombre_videos?: number | null
          date_creation?: string | null
          categorie?: string | null
          langue?: string | null
          date_ajout?: string | null
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
          etat: string
          date_publication: string | null
          date_ajout: string | null
          transcription: string | null
          duree: string | null
          audio_url: string | null
        }
        Insert: {
          id?: string
          youtubeur_id: string
          video_id?: string | null
          titre: string
          description?: string | null
          lien_video?: string | null
          etat?: string
          date_publication?: string | null
          date_ajout?: string | null
          transcription?: string | null
          duree?: string | null
          audio_url?: string | null
        }
        Update: {
          id?: string
          youtubeur_id?: string
          video_id?: string | null
          titre?: string
          description?: string | null
          lien_video?: string | null
          etat?: string
          date_publication?: string | null
          date_ajout?: string | null
          transcription?: string | null
          duree?: string | null
          audio_url?: string | null
        }
      }
      actions: {
        Row: {
          id: string
          video_id: string
          nom_action: string
          description: string | null
          etat_action: string
          date_creation: string
          date_closure: string | null
        }
        Insert: {
          id?: string
          video_id: string
          nom_action: string
          description?: string | null
          etat_action?: string
          date_creation?: string
          date_closure?: string | null
        }
        Update: {
          id?: string
          video_id?: string
          nom_action?: string
          description?: string | null
          etat_action?: string
          date_creation?: string
          date_closure?: string | null
        }
      }
    }
  }
}