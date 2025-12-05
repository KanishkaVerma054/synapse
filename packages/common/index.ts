import {z} from "zod"

export const userSchema = z.object({
    email: z.email().min(3, {message: "email must be at least 5 characters long."}).max(100, {message: "email should not exceed 100 characters"}),
    password: z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, {message:"Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character, and must not contain spaces."})
})

export const createWorkflowSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(5).optional()
})

export const updateWorkflowSchema = z.object({
    name: z.string().min(1).optional(),
    nodes: z.array(z.any()).optional(), // in db nodes will be json, but for now here it will be an array 
    edges: z.array(z.any()).optional(),
})

//
// export type UserSchema = z.infer<typeof userSchema>
// export type CreateWorkflowSchema = z.infer<typeof createWorkflowSchema>
// export type UpdateWorkflowSchema = z.infer<typeof updateWorkflowSchema>