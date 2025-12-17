import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient({ omit: { user: { password: true } } });
export default prisma;
