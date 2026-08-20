import { z } from 'zod';

import { PLAYER_CATEGORIES } from '../constants/category-options';

export const profileSchema = z.object({
  cityId: z
    .number({ message: 'Elegí una ciudad' })
    .int()
    .positive({ message: 'Elegí una ciudad' }),
  category: z.enum(PLAYER_CATEGORIES, { message: 'Elegí tu categoría' }),
  position: z.enum(['DRIVE', 'REVES', 'BOTH'], {
    message: 'Elegí tu posición',
  }),
  dominantHand: z.enum(['RIGHT', 'LEFT']).optional(),
  preferredMatchType: z.enum(['SOCIAL', 'COMPETITIVE', 'BOTH']).optional(),
  bio: z.string().max(300, 'Máximo 300 caracteres').optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
