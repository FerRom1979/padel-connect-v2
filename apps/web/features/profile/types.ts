export interface CompleteProfilePayload {
  cityId: number;
  level: number;
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
