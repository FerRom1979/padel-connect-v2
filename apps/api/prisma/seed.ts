import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.city.createMany({
    data: [
      {
        name: 'Lomas de Zamora',
        province: 'Buenos Aires',
        country: 'Argentina',
      },
      {
        name: 'Lanús',
        province: 'Buenos Aires',
        country: 'Argentina',
      },
      {
        name: 'Avellaneda',
        province: 'Buenos Aires',
        country: 'Argentina',
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log('Cities seeded');
  })
  .catch(console.error)
  .finally(() => prisma.$disconnect());
