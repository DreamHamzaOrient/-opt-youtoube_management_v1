import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { updateVideoStatus } from '@/lib/videos';

interface ActionFormProps {
  videoId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const ACTION_TYPES = [
  'Transcription',
  'Résumé',
  'Extraction Audio',
  'SEO',
  'Sous-titres'
] as const;

const ACTION_STATES = [
  { value: 'open', label: 'Ouvert' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'closed', label: 'Clôturé' }
] as const;

export function ActionForm({ videoId, onSuccess, onCancel }: ActionFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom_action: '',
    description: '',
    etat_action: 'open',
    date_creation: new Date().toISOString().slice(0, 16),
    date_closure: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.nom_action || !formData.description || !formData.etat_action || !formData.date_creation) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.etat_action === 'closed' && !formData.date_closure) {
      setError('La date de clôture est requise pour une action terminée');
      return;
    }

    if (formData.date_closure && new Date(formData.date_closure) < new Date(formData.date_creation)) {
      setError('La date de clôture ne peut pas être antérieure à la date de création');
      return;
    }

    try {
      setLoading(true);
      const { error: supabaseError } = await supabase
        .from('actions')
        .insert([
          {
            video_id: videoId,
            nom_action: formData.nom_action,
            description: formData.description,
            etat_action: formData.etat_action,
            date_creation: formData.date_creation,
            date_closure: formData.date_closure || null
          }
        ]);

      // Update video status if action is in progress
      if (formData.etat_action === 'in_progress') {
        await updateVideoStatus(videoId, 'en_cours');
      }

      if (supabaseError) throw supabaseError;
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6">
        <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A]">
          <div className="space-y-4">
            <div>
              <Label htmlFor="nom_action" className="text-sm font-medium text-gray-200">
                Type d'action
              </Label>
              <Select
                value={formData.nom_action}
                onValueChange={(value) => setFormData({ ...formData, nom_action: value })}
              >
                <SelectTrigger 
                  className="mt-1.5 bg-[#242424] border-[#3A3A3A] focus:ring-[#4A90E2] focus:ring-offset-0 text-white"
                >
                  <SelectValue placeholder="Sélectionner un type d'action" />
                </SelectTrigger>
                <SelectContent className="bg-[#242424] border-[#3A3A3A]">
                  {ACTION_TYPES.map((type) => (
                    <SelectItem 
                      key={type} 
                      value={type}
                      className="hover:bg-[#4A90E2] focus:bg-[#4A90E2] text-white cursor-pointer"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-200">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1.5 bg-[#242424] border-[#3A3A3A] focus:ring-[#4A90E2] focus:ring-offset-0 min-h-[100px] text-white placeholder:text-gray-400"
                placeholder="Description détaillée de l'action..."
              />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A]">
          <div className="space-y-4">
            <div>
              <Label htmlFor="etat_action" className="text-sm font-medium text-gray-200">
                État de l'action
              </Label>
              <Select
                value={formData.etat_action}
                onValueChange={(value) => setFormData({ ...formData, etat_action: value })}
              >
                <SelectTrigger 
                  className="mt-1.5 bg-[#242424] border-[#3A3A3A] focus:ring-[#4A90E2] focus:ring-offset-0 text-white"
                >
                  <SelectValue placeholder="Sélectionner un état" />
                </SelectTrigger>
                <SelectContent className="bg-[#242424] border-[#3A3A3A]">
                  {ACTION_STATES.map((state) => (
                    <SelectItem 
                      key={state.value} 
                      value={state.value}
                      className="hover:bg-[#4A90E2] focus:bg-[#4A90E2] text-white cursor-pointer"
                    >
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date_creation" className="text-sm font-medium text-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#4A90E2]" />
                    Date de création
                  </div>
                </Label>
                <Input
                  type="datetime-local"
                  id="date_creation"
                  value={formData.date_creation}
                  onChange={(e) => setFormData({ ...formData, date_creation: e.target.value })}
                  className="mt-1.5 bg-[#242424] border-[#3A3A3A] focus:ring-[#4A90E2] focus:ring-offset-0 text-white"
                />
              </div>

              {formData.etat_action === 'closed' && (
                <div>
                  <Label htmlFor="date_closure" className="text-sm font-medium text-gray-200">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#4A90E2]" />
                      Date de clôture
                    </div>
                  </Label>
                  <Input
                    type="datetime-local"
                    id="date_closure"
                    value={formData.date_closure}
                    onChange={(e) => setFormData({ ...formData, date_closure: e.target.value })}
                    className="mt-1.5 bg-[#242424] border-[#3A3A3A] focus:ring-[#4A90E2] focus:ring-offset-0 text-white"
                    min={formData.date_creation}
                  />
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-950/30 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="border-[#3A3A3A] hover:bg-[#2A2A2A] hover:text-white"
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-[#4A90E2] hover:bg-[#357ABD] text-white font-medium"
        >
          {loading ? 'Création...' : 'Créer l\'action'}
        </Button>
      </div>
    </form>
  );
}