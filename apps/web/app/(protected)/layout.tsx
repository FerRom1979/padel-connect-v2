import { AuthGuard } from '@/features/auth/components/auth-guard';
import { ProfileCompletionGuard } from '@/features/auth/components/profile-completion-guard';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <ProfileCompletionGuard>{children}</ProfileCompletionGuard>
    </AuthGuard>
  );
}
