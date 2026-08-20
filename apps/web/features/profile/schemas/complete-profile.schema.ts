import { z } from 'zod';

import { PLAYER_CATEGORIES } from '../constants/category-options';

export const completeProfileSchema = z.object({
  cityId: z
    .number({ message: 'Elegí una ciudad' })
    .int()
    .positive({ message: 'Elegí una ciudad' }),
  category: z.enum(PLAYER_CATEGORIES, { message: 'Elegí tu categoría' }),
  position: z.enum(['DRIVE', 'REVES', 'BOTH'], {
    message: 'Elegí tu posición',
  }),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;
