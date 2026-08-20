export interface Club {
  id: string;
  name: string;
  address: string | null;
  courts: number | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  createdAt: string;
  city: { id: number; name: string; province: string };
}

export interface CreateClubPayload {
  name: string;
  cityId: number;
  address?: string;
  courts?: number;
  phone?: string;
  website?: string;
  description?: string;
}

export interface ClubFilters {
  q?: string;
  cityId?: number;
}
