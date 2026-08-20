import { BadRequestException, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

type VenueInput = {
  clubId?: string;
  venueName?: string;
  cityId?: number;
};

/**
 * Partidos y torneos aceptan una sede de dos formas: un Club cargado en la app,
 * o el nombre del lugar escrito a mano. Esta función deja siempre las tres
 * columnas resueltas, para que el resto del código no tenga que preguntarse cuál vino.
 *
 * Si hay club, manda el club: su nombre y su ciudad ganan. Si no, nada impediría
 * publicar un club de Lomas dentro del listado de Avellaneda.
 *
 * ponytail: venueName queda desnormalizado a propósito. Si el club se renombra,
 * los eventos viejos conservan el nombre que tenían — que para un histórico es
 * lo correcto. El link al club sigue vivo por clubId.
 */
export async function resolveVenue(
  prisma: PrismaService,
  input: VenueInput,
): Promise<{ clubId: string | null; venueName: string; cityId: number }> {
  if (input.clubId) {
    const club = await prisma.club.findUnique({
      where: { id: input.clubId },
      select: { id: true, name: true, cityId: true },
    });

    if (!club) {
      throw new NotFoundException('El club elegido no existe');
    }

    return { clubId: club.id, venueName: club.name, cityId: club.cityId };
  }

  const venueName = input.venueName?.trim();

  if (!venueName) {
    throw new BadRequestException('Decinos dónde se juega');
  }

  if (!input.cityId) {
    throw new BadRequestException('Elegí una ciudad');
  }

  return { clubId: null, venueName, cityId: input.cityId };
}
