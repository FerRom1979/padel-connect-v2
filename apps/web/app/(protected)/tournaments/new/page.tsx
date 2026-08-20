import { PageHeader } from '@/components/layout/page-header';
import { CreateTournamentForm } from '@/features/tournaments/components/create-tournament-form';

export default function NewTournamentPage() {
  return (
    <>
      <PageHeader
        title="Publicar torneo"
        description="Contá cuándo, dónde y qué categorías entran."
      />

      <CreateTournamentForm />
    </>
  );
}
