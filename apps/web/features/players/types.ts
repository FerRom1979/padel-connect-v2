import type { PlayerCategory } from '@/features/profile/constants/category-options';

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  bio: string | null;
  category: PlayerCategory | null;
  position: 'DRIVE' | 'REVES' | 'BOTH' | null;
  city: { id: number; name: string; province: string } | null;
}

export interface PlayerDetail extends Player {
  dominantHand: 'RIGHT' | 'LEFT' | null;
  preferredMatchType: 'SOCIAL' | 'COMPETITIVE' | 'BOTH' | null;
}

export interface PlayerFilters {
  q?: string;
  cityId?: number;
  category?: PlayerCategory;
  position?: 'DRIVE' | 'REVES' | 'BOTH';
}
