import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { userRouter } from "./router/userRouter";
import { router } from "./trpc";
import { createContext } from "./context";

const appRouter = router({
    user: userRouter
})

const server = createHTTPServer({
    router: appRouter,
    createContext
})

server.listen(4000);

export type AppRouter = typeof appRouter;