import { PrismaClient } from '@prisma/client';
import cities from './data/cities.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.city.createMany({
    data: cities.map((city) => ({
      name: city.name,
      province: city.province,
      country: city.country,
    })),
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log('Cities seeded');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
