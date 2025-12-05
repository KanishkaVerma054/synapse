// import { publicProcedure, router } from "../trpc";
// import { createWorkflowSchema } from "@repo/common/types";

// export const workflowRouter = router({
//     create: publicProcedure
//         .input(createWorkflowSchema)
//         .mutation(async (opts) =>{
//             const { input } = opts
//             await opts.ctx.prismaClient.workflow.create({
//                 data:{

//                 }
//             })
//         })
// })