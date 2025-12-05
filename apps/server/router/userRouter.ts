import { userSchema } from "@repo/common/types"
import { publicProcedure, router } from "../trpc";
import bcrypt from "bcrypt"
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

const SALT_ROUND = 5;

export const userRouter = router({
    signup: publicProcedure
        .input(userSchema)
        .mutation(async (opts)=>{
            const { input } = opts

            try {
                const hashedPassword = await bcrypt.hash(input.password, SALT_ROUND)

                await opts.ctx.prismaClient.user.create({
                    data:{
                        email: input.email,
                        password: hashedPassword
                    }
                })

                return{
                    success: true,
                    message: "User created successfully!!!!"
                }
            } catch (err) {
                //TODO: think about this whether under catch 
                //  Prisma Client throws a PrismaClientKnownRequestError exception if the query engine returns a known error related to the request - for example, a unique constraint violation.
                // if(err instanceof prisma.PrismaClientKnownRequestError){
                //     if(err.code === 'P2002') { // P2002 is prisma error: Unique constraint failed on the {constraint}
                //         throw new TRPCError({
                //             code: 'CONFLICT',
                //             message: "User already exists with the same email."
                //         })
                //     }
                // }
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create user."
                })
            }
        }),
    
    login: publicProcedure
        .input(userSchema)
        .mutation(async (opts) => {
            const {input} = opts
            try {
                const user = await opts.ctx.prismaClient.user.findFirst({
                    where: {
                        email: input.email
                    }
                })
                if (!user) {
                    throw new TRPCError({
                        code: "UNAUTHORIZED",
                        message: "Incorrect Credentials. Please check the email and password."
                    })
                }

                // Comapring hashed password
                const comparePassword = await bcrypt.compare(input.password, user.password)
                if(!comparePassword) {
                    throw new TRPCError({
                        code: "UNAUTHORIZED",
                        message: "Incorrect Credentials. Please check the email and password."
                    })
                }
                const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '30d'})

                return {
                    success: true,
                    token,
                    message:"Login Successful"
                }
            } catch (err) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create user."
                })
            }
        })
})