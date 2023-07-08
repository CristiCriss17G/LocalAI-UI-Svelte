// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// export default prisma;

import Prisma, * as PrismaScope from '@prisma/client';
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
export default prisma;
