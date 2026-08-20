import { TournamentDetail } from '@/features/tournaments/components/tournament-detail';

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <TournamentDetail id={id} />;
}
