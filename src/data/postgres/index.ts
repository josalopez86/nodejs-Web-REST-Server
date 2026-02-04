import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../../config/envs";
import { PrismaClient } from "../../generated/prisma";


const {POSTGRES_URL} = envs;

const adapter = new PrismaPg({ connectionString: POSTGRES_URL });
export const prisma = new PrismaClient({ adapter });