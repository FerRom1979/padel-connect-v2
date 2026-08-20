import { ClubDetail } from '@/features/clubs/components/club-detail';

export default async function ClubPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ClubDetail id={id} />;
}
