import type { PlayerCategory } from '@/features/profile/constants/category-options';

export interface TournamentRegistration {
  category: PlayerCategory;
  partnerName: string | null;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    category: PlayerCategory | null;
  };
}

export interface Tournament {
  id: string;
  name: string;
  venueName: string;
  startDate: string;
  endDate: string | null;
  categories: PlayerCategory[];
  maxTeams: number | null;
  price: number | null;
  description: string | null;
  cancelledAt: string | null;
  organizerId: string;
  city: { id: number; name: string; province: string };
  club: { id: string; name: string } | null;
  registrations: TournamentRegistration[];
}

export interface CreateTournamentPayload {
  name: string;
  clubId?: string;
  venueName?: string;
  cityId?: number;
  startDate: string;
  endDate?: string;
  categories: PlayerCategory[];
  maxTeams?: number;
  price?: number;
  description?: string;
}

export interface RegisterPayload {
  category: PlayerCategory;
  partnerName?: string;
}

export interface TournamentFilters {
  cityId?: number;
  mine?: boolean;
  clubId?: string;
  past?: boolean;
}
