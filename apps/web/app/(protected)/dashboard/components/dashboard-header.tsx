import { Button } from '@/components/ui';
import { useLogout } from '@/features/auth/hooks/use-logout';

type DashboardHeaderProps = {
  name: string;
};

export function DashboardHeader({ name }: DashboardHeaderProps) {
  const logoutMutation = useLogout();

  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Hola {name} 👋</h1>

        <p className="text-gray-500">¿Listo para jugar hoy?</p>
      </div>

      <Button
        variant="ghost"
        onClick={() => logoutMutation.mutate()}
        loading={logoutMutation.isPending}
      >
        Cerrar sesión
      </Button>
    </header>
  );
}
