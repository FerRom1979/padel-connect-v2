import { Court } from '@/components/brand/court';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      {/* Panel de marca. A sangre en desktop, franja compacta en mobile. */}
      <aside className="relative flex shrink-0 overflow-hidden bg-primary px-6 py-8 text-white lg:w-[42%] lg:flex-col lg:justify-between lg:px-12 lg:py-14">
        {/* La cancha sale del borde: estás parado adentro, no mirándola. */}
        <Court className="pointer-events-none absolute -bottom-24 -right-40 hidden w-[185%] text-white/25 lg:block" />

        <div className="relative flex items-center gap-3 lg:block">
          <Court className="w-10 text-white/70 lg:hidden" />

          <p className="font-display text-2xl font-bold uppercase leading-none tracking-[0.08em] lg:text-4xl">
            Padel
            <br className="hidden lg:inline" /> Connect
          </p>
        </div>

        <p className="relative hidden max-w-xs font-display text-3xl font-semibold uppercase leading-[1.05] tracking-tight lg:block">
          Tu próximo partido arranca acá.
        </p>
      </aside>

      <div className="flex flex-1 items-center justify-center px-6 py-10 lg:py-14">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </main>
  );
}
