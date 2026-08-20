import { AuthGuard } from '@/features/auth/components/auth-guard';

/** Usuario logueado, perfil incompleto. Sin shell: nada que navegar todavía. */
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
