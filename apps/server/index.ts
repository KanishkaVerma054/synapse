import { userRouter } from "./router/userRouter";
import { router } from "./trpc";
import { createContext } from "./context";
import { workflowRouter } from "./router/workflowRouter";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";

const app = express()

app.use(cors())
app.use(express.json())

const appRouter = router({
    user: userRouter,
    workflow: workflowRouter
})

// this is how you implement the express with trpc
// trpc has inbuilt express.js adapter
app.use(
    '/trpc',
    createExpressMiddleware({
        router: appRouter,
        createContext
    })
)

app.listen(4000, () => {
    console.log('server running on http://localhost:4000')
});

export type AppRouter = typeof appRouter;