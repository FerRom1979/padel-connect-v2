import type { PlayerCategory } from '@/features/profile/constants/category-options';

export interface MatchPlayer {
  joinedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
    category: PlayerCategory | null;
    position: 'DRIVE' | 'REVES' | 'BOTH' | null;
  };
}

export interface Match {
  id: string;
  venueName: string;
  playedAt: string;
  durationMin: number;
  categories: PlayerCategory[];
  notes: string | null;
  cancelledAt: string | null;
  organizerId: string;
  city: { id: number; name: string; province: string };
  club: { id: string; name: string } | null;
  players: MatchPlayer[];
}

export interface CreateMatchPayload {
  /** Uno de los dos: club cargado, o nombre a mano con su ciudad. */
  clubId?: string;
  venueName?: string;
  cityId?: number;
  playedAt: string;
  durationMin?: number;
  categories?: PlayerCategory[];
  notes?: string;
}

export interface MatchFilters {
  cityId?: number;
  onlyAvailable?: boolean;
  mine?: boolean;
  clubId?: string;
  past?: boolean;
}
