import { PageHeader } from '@/components/layout/page-header';
import { PlayerList } from '@/features/players/components/player-list';

export default function PlayersPage() {
  return (
    <>
      <PageHeader
        title="Jugadores"
        description="Encontrá gente de tu nivel y tu zona."
      />

      <PlayerList />
    </>
  );
}
