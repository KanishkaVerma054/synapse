import "dotenv/config";
import { Prisma, PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({connectionString})

const globalforprisma = global as unknown as {
    prisma: PrismaClient
}

export const prismaClient = globalforprisma.prisma || new PrismaClient({adapter})

if (process.env.NODE_ENV !== "production") {
    globalforprisma.prisma = prismaClient
}

export const prisma = Prisma;
// export const prismaClient = new PrismaClient({adapter})