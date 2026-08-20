import { PageHeader } from '@/components/layout/page-header';
import { CreateMatchForm } from '@/features/matches/components/create-match-form';

export default function NewMatchPage() {
  return (
    <>
      <PageHeader
        title="Nuevo partido"
        description="Publicá el partido y esperá a que se complete."
      />

      <CreateMatchForm />
    </>
  );
}
