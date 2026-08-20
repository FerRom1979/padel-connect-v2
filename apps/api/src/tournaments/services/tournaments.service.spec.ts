import { BadRequestException, ForbiddenException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { TournamentsService } from './tournaments.service';

const DAY = 24 * 60 * 60 * 1000;

function prismaWith(tournament: unknown) {
  const update = jest.fn().mockResolvedValue({ id: 't1' });

  const prisma = {
    tournament: {
      findUnique: jest.fn().mockResolvedValue(tournament),
      update,
    },
  } as unknown as PrismaService;

  return { prisma, update };
}

function future(overrides = {}) {
  return {
    organizerId: 'yo',
    cancelledAt: null,
    startDate: new Date(Date.now() + 10 * DAY),
    _count: { registrations: 4 },
    ...overrides,
  };
}

describe('TournamentsService.update', () => {
  it('guarda los cambios del organizador', async () => {
    const { prisma, update } = prismaWith(future());

    await new TournamentsService(prisma).update('t1', 'yo', { price: 1000 });

    expect(update).toHaveBeenCalled();
  });

  it('no deja que otro edite', async () => {
    const { prisma } = prismaWith(future({ organizerId: 'otro' }));

    await expect(
      new TournamentsService(prisma).update('t1', 'yo', { price: 1 }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('no deja bajar el cupo por debajo de las parejas anotadas', async () => {
    const { prisma, update } = prismaWith(
      future({ _count: { registrations: 4 } }),
    );

    await expect(
      new TournamentsService(prisma).update('t1', 'yo', { maxTeams: 3 }),
    ).rejects.toThrow(/4 parejas anotadas/);
    expect(update).not.toHaveBeenCalled();
  });

  it('deja subir el cupo, o dejarlo igual', async () => {
    const { prisma, update } = prismaWith(
      future({ _count: { registrations: 4 } }),
    );

    await new TournamentsService(prisma).update('t1', 'yo', { maxTeams: 4 });

    expect(update).toHaveBeenCalled();
  });

  it('no deja editar uno cancelado', async () => {
    const { prisma } = prismaWith(future({ cancelledAt: new Date() }));

    await expect(
      new TournamentsService(prisma).update('t1', 'yo', { price: 1 }),
    ).rejects.toThrow(/cancelado/);
  });

  it('no deja editar uno que ya empezó', async () => {
    const { prisma } = prismaWith(
      future({ startDate: new Date(Date.now() - DAY) }),
    );

    await expect(
      new TournamentsService(prisma).update('t1', 'yo', { price: 1 }),
    ).rejects.toThrow(/ya empezó/);
  });

  it('no deja mover la fecha al pasado', async () => {
    const { prisma } = prismaWith(future());

    await expect(
      new TournamentsService(prisma).update('t1', 'yo', {
        startDate: new Date(Date.now() - DAY).toISOString(),
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
