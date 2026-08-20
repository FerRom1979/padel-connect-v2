import { BadRequestException, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { resolveVenue } from './resolve-venue';

function prismaWith(club: unknown) {
  return {
    club: { findUnique: jest.fn().mockResolvedValue(club) },
  } as unknown as PrismaService;
}

describe('resolveVenue', () => {
  it('con club, toma nombre y ciudad del club', async () => {
    const prisma = prismaWith({ id: 'c1', name: 'Club Los Robles', cityId: 7 });

    await expect(
      resolveVenue(prisma, {
        clubId: 'c1',
        venueName: 'otra cosa',
        cityId: 99,
      }),
    ).resolves.toEqual({
      clubId: 'c1',
      venueName: 'Club Los Robles',
      cityId: 7,
    });
  });

  it('el club gana sobre lo que mande el cliente', async () => {
    const prisma = prismaWith({ id: 'c1', name: 'Real', cityId: 7 });

    const venue = await resolveVenue(prisma, { clubId: 'c1', cityId: 99 });

    expect(venue.cityId).toBe(7);
  });

  it('rechaza un club inexistente', async () => {
    await expect(
      resolveVenue(prismaWith(null), { clubId: 'fantasma' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('sin club, usa el texto libre y la ciudad elegida', async () => {
    await expect(
      resolveVenue(prismaWith(null), {
        venueName: '  Cancha del barrio ',
        cityId: 3,
      }),
    ).resolves.toEqual({
      clubId: null,
      venueName: 'Cancha del barrio',
      cityId: 3,
    });
  });

  it('sin club ni nombre, se queja', async () => {
    await expect(resolveVenue(prismaWith(null), { cityId: 3 })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('un nombre en blanco no cuenta como nombre', async () => {
    await expect(
      resolveVenue(prismaWith(null), { venueName: '   ', cityId: 3 }),
    ).rejects.toThrow(/dónde se juega/);
  });

  it('sin club, la ciudad es obligatoria', async () => {
    await expect(
      resolveVenue(prismaWith(null), { venueName: 'Cancha' }),
    ).rejects.toThrow(/ciudad/);
  });
});
