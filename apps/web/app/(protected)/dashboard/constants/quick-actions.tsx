import { Search, Users, Building2, Trophy } from 'lucide-react';

export const actions = [
  {
    title: 'Buscar partido',
    description: 'Encuentra partidos cerca tuyo.',
    icon: <Search className="h-8 w-8" />,
    href: '/matches',
  },
  {
    title: 'Buscar jugadores',
    description: 'Conecta con jugadores de tu nivel.',
    icon: <Users className="h-8 w-8" />,
    href: '/players',
  },
  {
    title: 'Explorar clubes',
    description: 'Descubre clubes cerca de tu ubicación.',
    icon: <Building2 className="h-8 w-8" />,
    href: '/clubs',
  },
  {
    title: 'Ver torneos',
    description: 'Inscríbete en próximos torneos.',
    icon: <Trophy className="h-8 w-8" />,
    href: '/tournaments',
  },
];
