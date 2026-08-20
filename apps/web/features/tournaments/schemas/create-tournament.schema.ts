import { z } from 'zod';

import { PLAYER_CATEGORIES } from '@/features/profile/constants/category-options';

export const createTournamentSchema = z
  .object({
    name: z.string().trim().min(2, 'Poné el nombre del torneo'),
    clubId: z.string().optional(),
    venueName: z.string().optional(),
    cityId: z.number().optional(),
    startDate: z
      .string()
      .min(1, 'Elegí cuándo empieza')
      .refine((value) => new Date(value).getTime() > Date.now(), {
        message: 'El torneo tiene que ser a futuro',
      }),
    endDate: z.string().optional(),
    categories: z
      .array(z.enum(PLAYER_CATEGORIES))
      .min(1, 'Elegí al menos una categoría'),
    maxTeams: z.number().min(2).max(256).optional(),
    price: z.number().min(0).optional(),
    description: z.string().max(1000).optional(),
  })
  .refine((data) => Boolean(data.clubId) || Boolean(data.venueName?.trim()), {
    message: 'Decinos dónde se juega',
    path: ['venueName'],
  })
  .refine((data) => Boolean(data.clubId) || Boolean(data.cityId), {
    message: 'Elegí una ciudad',
    path: ['cityId'],
  })
  .refine(
    (data) =>
      !data.endDate || new Date(data.endDate) >= new Date(data.startDate),
    { message: 'No puede terminar antes de empezar', path: ['endDate'] },
  );

export type CreateTournamentFormData = z.infer<typeof createTournamentSchema>;
