import { Building2, Home, Search, Trophy, Users } from 'lucide-react';

export type NavItem = {
  title: string;
  description: string;
  icon: typeof Home;
  href: string;
};

/** Secciones de la app. Alimenta el sidebar, la barra mobile y los accesos del inicio. */
export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Inicio',
    description: 'Tu resumen de la semana.',
    icon: Home,
    href: '/dashboard',
  },
  {
    title: 'Partidos',
    description: 'Encontrá partidos cerca tuyo.',
    icon: Search,
    href: '/matches',
  },
  {
    title: 'Jugadores',
    description: 'Conectá con jugadores de tu nivel.',
    icon: Users,
    href: '/players',
  },
  {
    title: 'Clubes',
    description: 'Descubrí clubes en tu zona.',
    icon: Building2,
    href: '/clubs',
  },
  {
    title: 'Torneos',
    description: 'Anotate en los próximos torneos.',
    icon: Trophy,
    href: '/tournaments',
  },
];

/** Todo menos Inicio: en el inicio no tiene sentido un acceso al inicio. */
export const QUICK_ACTIONS = NAV_ITEMS.filter(
  (item) => item.href !== '/dashboard',
);
