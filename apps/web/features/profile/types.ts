import type { PlayerCategory } from './constants/category-options';

export interface CompleteProfilePayload {
  cityId: number;
  category: PlayerCategory;
  position: 'DRIVE' | 'REVES' | 'BOTH';

  dominantHand?: 'RIGHT' | 'LEFT';

  preferredMatchType?: 'SOCIAL' | 'COMPETITIVE' | 'BOTH';

  bio?: string;
  phone?: string;
  instagram?: string;
  whatsapp?: string;

  latitude?: number;
  longitude?: number;

  travelDistanceKm?: number;
}

export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string | null;
  avatar: string | null;
  category: PlayerCategory | null;
  position: 'DRIVE' | 'REVES' | 'BOTH' | null;
  dominantHand: 'RIGHT' | 'LEFT' | null;
  preferredMatchType: 'SOCIAL' | 'COMPETITIVE' | 'BOTH' | null;
  profileCompleted: boolean;
  city: { id: number; name: string; province: string } | null;
}

export interface City {
  id: number;
  name: string;
}
