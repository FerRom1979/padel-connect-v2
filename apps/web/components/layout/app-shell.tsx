'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, UserRound } from 'lucide-react';

import { Court } from '@/components/brand/court';
import { NAV_ITEMS } from '@/constants/nav';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { cn } from '@/lib/utils';

function useIsActive() {
  const pathname = usePathname();

  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const isActive = useIsActive();

  const { user } = useAuth();

  const logout = useLogout();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar: desktop */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-surface lg:flex">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-6 py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Court className="w-9 text-primary" />

          <span className="font-display text-xl font-bold uppercase leading-none tracking-[0.08em]">
            Padel
            <br /> Connect
          </span>
        </Link>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV_ITEMS.map(({ href, title, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isActive(href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted hover:bg-surface-muted hover:text-foreground',
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {title}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <Link
            href="/profile"
            aria-current={isActive('/profile') ? 'page' : undefined}
            className={cn(
              'block rounded-xl px-3 py-2 transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              isActive('/profile')
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-surface-muted',
            )}
          >
            <p className="truncate text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="truncate text-xs text-muted">Ver tu perfil</p>
          </Link>

          <button
            type="button"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Topbar: mobile */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-surface px-4 py-3 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Court className="w-8 text-primary" />

          <span className="font-display text-lg font-bold uppercase tracking-[0.08em]">
            Padel Connect
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/profile"
            aria-label="Tu perfil"
            className={cn(
              'rounded-xl p-2 transition-colors hover:bg-surface-muted',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              isActive('/profile') ? 'text-primary' : 'text-muted',
            )}
          >
            <UserRound className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            aria-label="Cerrar sesión"
            className="rounded-xl p-2 text-muted transition-colors hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="lg:pl-60">
        {/* pb-24 en mobile deja lugar a la barra inferior */}
        <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-24 pt-6 lg:px-8 lg:pb-10 lg:pt-8">
          {children}
        </main>
      </div>

      {/* Barra inferior: mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
        {NAV_ITEMS.map(({ href, title, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? 'page' : undefined}
            className={cn(
              'flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
              isActive(href) ? 'text-primary' : 'text-muted',
            )}
          >
            <Icon className="h-5 w-5" />
            {title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
