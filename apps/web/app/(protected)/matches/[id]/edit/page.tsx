import { EditMatch } from '@/features/matches/components/edit-match';

export default async function EditMatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditMatch id={id} />;
}
