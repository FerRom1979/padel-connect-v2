import { z } from 'zod';

export const createClubSchema = z.object({
  name: z.string().trim().min(2, 'Poné el nombre del club'),
  cityId: z.number({ message: 'Elegí una ciudad' }),
  address: z.string().max(200).optional(),
  courts: z.number().min(1).max(50).optional(),
  phone: z.string().max(40).optional(),
  website: z
    .union([z.string().url('Tiene que ser una URL válida'), z.literal('')])
    .optional(),
  description: z.string().max(500).optional(),
});

export type CreateClubFormData = z.infer<typeof createClubSchema>;
