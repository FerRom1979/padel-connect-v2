type DashboardHeaderProps = {
  name: string;
};

export function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <header className="space-y-2">
      <h1 className="text-3xl font-bold">Hola {name} 👋</h1>

      <p className="text-gray-500">¿Listo para jugar hoy?</p>
    </header>
  );
}
