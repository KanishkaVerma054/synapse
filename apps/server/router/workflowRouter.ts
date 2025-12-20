import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { createWorkflowSchema, getWorkflow, updateWorkflowSchema } from "@repo/common/types";

export const workflowRouter = router({
    create: publicProcedure
        .input(createWorkflowSchema)
        .mutation(async (opts) =>{
            const { input } = opts
            try {
                await opts.ctx.prismaClient.workflow.create({
                    data:{
                        workflowName: input.name,
                        description: input.description,
                        nodes: [],
                        edges: [],
                        // userId: "userId_1",
                        userId: input.userId
                    }
                })
    
                return {
                    success: true,
                    message: "Workflow created successfully"
                }  
            } catch (err) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to create the workflow."
                })
            }
        }),
        // Fetching all workflows belonging to the user
    list: publicProcedure
        .input(getWorkflow)
        .query(async (opts) => {
            const {input} = opts
            try {
                const allUserWorkflows = await opts.ctx.prismaClient.workflow.findMany({
                    where: {
                        userId: input.userId
                        // userId: "userId_1"
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
                return{
                    success: true,
                    allUserWorkflows
                }
            } catch (err) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Error while fetching"
                })
            }
        }),
    getOne: publicProcedure
        .input(getWorkflow)
        .query(async(opts) => {
            const {input} = opts
            try {
                const getWorkflow = await opts.ctx.prismaClient.workflow.findFirst({
                    where: {
                        userId: input.userId
                        // userId: "userId_1"
                    }
                })
                return {
                    success: true,
                    getWorkflow
                }
            } catch (err) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Error while fetching"
                })
            }
        }),
    updateWorkflow: publicProcedure
        .input(updateWorkflowSchema)
        .mutation(async(opts) => {
            const {input} = opts
            try {
                const updateWorkflow = await opts.ctx.prismaClient.workflow.update({
                    where: {
                        id: input.id
                    },
                    data: {
                        workflowName: input.name,
                        nodes: input.nodes,
                        edges: input.edges
                    }
                })
                return {
                    success: true,
                    updateWorkflow
                }
            } catch (err) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Error while updating workflow"
                })
            }
        })
})