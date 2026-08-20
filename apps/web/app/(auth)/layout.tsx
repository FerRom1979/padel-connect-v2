import { AuthRedirectGuard } from '@/features/auth/components/auth-redirect-guard';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthRedirectGuard>{children}</AuthRedirectGuard>;
}
