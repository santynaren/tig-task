import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// Seed file executed to check the data storage and connections between db and server
const main = async () => {
  // We are using upsert to avoid duplicate, so the `where` is dummy here and `update` is null
  const seedUrlData = await prisma.urlTable.upsert({
    where: { shortURL: 'test' },
    update: {},
    create: {
      shortURL: 'njksp',
      sourceURL: 'https://www.santynaren.netlify.app/',
      viewCount: 0,
    },
  });
  console.log(seedUrlData);
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
