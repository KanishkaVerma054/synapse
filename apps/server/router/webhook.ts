import { prismaClient } from "@repo/db/client";
import { Router, type Request, type Response } from "express";

export const webhookRoute = Router();

webhookRoute.post("/webhook/:workflowId", async(req: Request, res: Response) => {
    const { workflowId }  = req.params;
    const header = req.headers;
    const body = req.body;

    try {
        const workflow = await prismaClient.workflow.findUnique({
            where: {
                id: workflowId
            }
        })

        if (!workflow) {
            res.status(404).json({
                error: "Unable to find the workflow."
            })
            return;
        }

        const execution = await prismaClient.execution.create({
            data:{
                workflowId: workflow.id,
                status: "PENDING",
                data: { // change this data to jsonData
                    trigger: {
                        body,
                        header
                    }
                }
            }
        });

        console.log(`Received webhook from the workflow from ${workflowId} and the execution list is ${execution.id}`)

        res.status(200).json({
            success: true,
            executionId: execution.id,
            workflow: workflowId
        })
    } catch (err) {
        res.status(400).json({
            error: "error creating execution"
        })
    }
})