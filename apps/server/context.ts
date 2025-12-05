import { prismaClient } from "@repo/db/client"

export const createContext = () => {
    return {
        // prisma: prismaClient // just changed the name from prisma to prismaClient
        prismaClient: prismaClient
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>;