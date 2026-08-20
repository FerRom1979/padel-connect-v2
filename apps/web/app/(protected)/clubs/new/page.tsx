import { PageHeader } from '@/components/layout/page-header';
import { CreateClubForm } from '@/features/clubs/components/create-club-form';

export default function NewClubPage() {
  return (
    <>
      <PageHeader
        title="Cargar club"
        description="El mapa lo llenamos entre todos. Sumá el club donde jugás."
      />

      <CreateClubForm />
    </>
  );
}
