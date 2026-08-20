import { EditTournament } from '@/features/tournaments/components/edit-tournament';

export default async function EditTournamentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditTournament id={id} />;
}
