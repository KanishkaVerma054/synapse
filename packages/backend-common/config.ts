export const JWT_SECRET = process.env.JWT_SECRET || ""

// TODO: why the error when using this code:
// import "dotenv/config";
// export const JWT_SECRET = process.env.JWT_SECRET as string
// if (!JWT_SECRET) {
//     throw new Error("JWT_SECRET environment variable is not set")
// }