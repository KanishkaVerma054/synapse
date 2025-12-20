export const BACKEND_URL = process.env.BACKEND_URL || (() => {
    if (process.env.NODE_ENV === "production") {
        throw new Error("BACKEND_URL env variable is not set")
    }
    return 'http://localhost:4000/trpc'
})()