import { PrismaClient } from '@prisma/client';
import { getRandomWallet } from '../electron/crypto';

const prisma = new PrismaClient();

async function main() {
  const x = getRandomWallet('eth');
  console.log(x);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
