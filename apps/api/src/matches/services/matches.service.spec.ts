import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma, PlayerCategory } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { MATCH_SIZE, PAGE_SIZE } from '../matches.constants';
import { MatchesService } from './matches.service';

const HOUR = 60 * 60 * 1000;

type MatchRow = {
  cancelledAt: Date | null;
  playedAt: Date;
  _count: { players: number };
  players: { userId: string }[];
};

/** Prisma falso: solo lo que toca join(). $transaction ejecuta el callback derecho. */
function prismaWith(match: MatchRow | null) {
  const create = jest.fn();

  const tx = {
    match: {
      findUnique: jest.fn().mockResolvedValue(match),
      findUniqueOrThrow: jest.fn().mockResolvedValue({ id: 'm1' }),
    },
    matchPlayer: { create },
  };

  const prisma = {
    $transaction: (fn: (t: typeof tx) => unknown) => fn(tx),
  } as unknown as PrismaService;

  return { prisma, create };
}

function futureMatch(overrides: Partial<MatchRow> = {}): MatchRow {
  return {
    cancelledAt: null,
    playedAt: new Date(Date.now() + 24 * HOUR),
    _count: { players: 2 },
    players: [],
    ...overrides,
  };
}

describe('MatchesService.join', () => {
  it('anota al jugador cuando queda lugar', async () => {
    const { prisma, create } = prismaWith(futureMatch());

    await new MatchesService(prisma).join('m1', 'u1');

    expect(create).toHaveBeenCalledWith({
      data: { matchId: 'm1', userId: 'u1' },
    });
  });

  it('rechaza el quinto jugador', async () => {
    const { prisma, create } = prismaWith(
      futureMatch({ _count: { players: MATCH_SIZE } }),
    );

    await expect(new MatchesService(prisma).join('m1', 'u1')).rejects.toThrow(
      BadRequestException,
    );
    expect(create).not.toHaveBeenCalled();
  });

  it('rechaza anotarse dos veces', async () => {
    const { prisma, create } = prismaWith(
      futureMatch({ players: [{ userId: 'u1' }] }),
    );

    await expect(new MatchesService(prisma).join('m1', 'u1')).rejects.toThrow(
      /Ya estás anotado/,
    );
    expect(create).not.toHaveBeenCalled();
  });

  it('rechaza un partido cancelado', async () => {
    const { prisma } = prismaWith(futureMatch({ cancelledAt: new Date() }));

    await expect(new MatchesService(prisma).join('m1', 'u1')).rejects.toThrow(
      /cancelado/,
    );
  });

  it('rechaza un partido que ya pasó', async () => {
    const { prisma } = prismaWith(
      futureMatch({ playedAt: new Date(Date.now() - HOUR) }),
    );

    await expect(new MatchesService(prisma).join('m1', 'u1')).rejects.toThrow(
      /ya pasó/,
    );
  });

  it('rechaza un partido inexistente', async () => {
    const { prisma } = prismaWith(null);

    await expect(new MatchesService(prisma).join('m1', 'u1')).rejects.toThrow(
      NotFoundException,
    );
  });
});

describe('MatchesService.join, conflictos de serializacion', () => {
  function conflictError() {
    return new Prisma.PrismaClientKnownRequestError('write conflict', {
      code: 'P2034',
      clientVersion: 'test',
    });
  }

  it('reintenta cuando Postgres aborta la transaccion', async () => {
    const transaction = jest
      .fn()
      .mockRejectedValueOnce(conflictError())
      .mockRejectedValueOnce(conflictError())
      .mockResolvedValueOnce({ id: 'm1' });

    const prisma = { $transaction: transaction } as unknown as PrismaService;

    await expect(new MatchesService(prisma).join('m1', 'u1')).resolves.toEqual({
      id: 'm1',
    });
    expect(transaction).toHaveBeenCalledTimes(3);
  });

  it('se rinde despues de varios intentos en vez de colgarse', async () => {
    const transaction = jest.fn().mockRejectedValue(conflictError());

    const prisma = { $transaction: transaction } as unknown as PrismaService;

    await expect(new MatchesService(prisma).join('m1', 'u1')).rejects.toThrow(
      /write conflict/,
    );
    expect(transaction).toHaveBeenCalledTimes(5);
  });

  it('no reintenta un error de negocio', async () => {
    const { prisma, create } = prismaWith(
      futureMatch({ _count: { players: MATCH_SIZE } }),
    );

    await expect(new MatchesService(prisma).join('m1', 'u1')).rejects.toThrow(
      /completo/,
    );
    expect(create).not.toHaveBeenCalled();
  });
});

describe('MatchesService.findAll', () => {
  function listWith(players: { user: { id: string } }[][]) {
    const findMany = jest
      .fn()
      .mockResolvedValue(players.map((p, i) => ({ id: `m${i}`, players: p })));

    return {
      $match: findMany,
      prisma: { match: { findMany } } as unknown as PrismaService,
    };
  }

  const full = [
    { user: { id: 'a' } },
    { user: { id: 'b' } },
    { user: { id: 'c' } },
    { user: { id: 'yo' } },
  ];
  const open = [{ user: { id: 'a' } }];

  it('esconde los completos cuando se pide solo disponibles', async () => {
    const { prisma } = listWith([
      [
        { user: { id: 'x' } },
        { user: { id: 'y' } },
        { user: { id: 'z' } },
        { user: { id: 'w' } },
      ],
      open,
    ]);

    const result = await new MatchesService(prisma).findAll(
      { onlyAvailable: true },
      'yo',
    );

    expect(result.items.map((m) => m.id)).toEqual(['m1']);
  });

  it('avisa cuando el listado quedó cortado', async () => {
    // PAGE_SIZE + 1 filas: la de más existe solo para detectar que hay más.
    const { prisma } = listWith(
      Array.from({ length: PAGE_SIZE + 1 }, () => open),
    );

    const result = await new MatchesService(prisma).findAll({}, 'yo');

    expect(result.items).toHaveLength(PAGE_SIZE);
    expect(result.hasMore).toBe(true);
  });

  it('no avisa de más cuando entra todo', async () => {
    const { prisma } = listWith([open, open]);

    const result = await new MatchesService(prisma).findAll({}, 'yo');

    expect(result.hasMore).toBe(false);
  });

  it('con mine solo devuelve los partidos donde estoy', async () => {
    const { prisma } = listWith([full, open]);

    const result = await new MatchesService(prisma).findAll(
      { mine: true },
      'yo',
    );

    expect(result.items.map((m) => m.id)).toEqual(['m0']);
  });

  it('nunca esconde un partido donde ya estoy anotado', async () => {
    const { prisma } = listWith([full, open]);

    const result = await new MatchesService(prisma).findAll(
      { onlyAvailable: true },
      'yo',
    );

    expect(result.items.map((m) => m.id)).toEqual(['m0', 'm1']);
  });
});

describe('MatchesService.create', () => {
  const prisma = {} as PrismaService;

  const base = {
    venueName: 'Club Los Robles',
    cityId: 1,
    playedAt: new Date(Date.now() + 24 * HOUR).toISOString(),
  };

  it('rechaza un partido en el pasado', async () => {
    await expect(
      new MatchesService(prisma).create('u1', {
        ...base,
        playedAt: new Date(Date.now() - HOUR).toISOString(),
      }),
    ).rejects.toThrow(/a futuro/);
  });

  it('acepta una lista de categorías de las dos escalas (partido mixto)', async () => {
    const create = jest.fn().mockResolvedValue({ id: 'm1' });
    const withDb = { match: { create } } as unknown as PrismaService;

    await new MatchesService(withDb).create('u1', {
      ...base,
      categories: [PlayerCategory.C5, PlayerCategory.D3],
    });

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          categories: [PlayerCategory.C5, PlayerCategory.D3],
        }),
      }),
    );
  });
});
