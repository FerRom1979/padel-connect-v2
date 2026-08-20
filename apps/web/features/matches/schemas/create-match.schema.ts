import { z } from 'zod';

import { PLAYER_CATEGORIES } from '@/features/profile/constants/category-options';

export const createMatchSchema = z
  .object({
    clubId: z.string().optional(),
    venueName: z.string().optional(),
    cityId: z.number().optional(),
    playedAt: z
      .string()
      .min(1, 'Elegí día y hora')
      .refine((value) => new Date(value).getTime() > Date.now(), {
        message: 'El partido tiene que ser a futuro',
      }),
    durationMin: z.number().min(30).max(240),
    // Vacío = juega cualquiera. Es una lista y no un rango porque caballeros y
    // damas son dos escalas y un partido mixto acepta de las dos.
    categories: z.array(z.enum(PLAYER_CATEGORIES)),
    notes: z.string().max(500).optional(),
  })
  // La sede es club o texto libre. Con texto hace falta la ciudad;
  // con club, la ciudad sale del club en el backend.
  .refine((data) => Boolean(data.clubId) || Boolean(data.venueName?.trim()), {
    message: 'Decinos dónde se juega',
    path: ['venueName'],
  })
  .refine((data) => Boolean(data.clubId) || Boolean(data.cityId), {
    message: 'Elegí una ciudad',
    path: ['cityId'],
  });

export type CreateMatchFormData = z.infer<typeof createMatchSchema>;
