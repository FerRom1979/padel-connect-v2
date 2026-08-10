import { AuthRedirectGuard } from '@/features/auth/components/auth-redirect-guard';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthRedirectGuard>
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        {children}
      </main>
    </AuthRedirectGuard>
  );
}
