import { z } from 'zod';

export const completeProfileSchema = z.object({
  cityId: z.number().int().positive({
    message: 'Seleccione una ciudad',
  }),
  level: z.number().min(1).max(10),
  position: z.enum(['DRIVE', 'REVES', 'BOTH']),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;
