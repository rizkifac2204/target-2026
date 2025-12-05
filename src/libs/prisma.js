import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

let prismaCtx;

if (process.env.NODE_ENV === "production") {
  prismaCtx = new PrismaClient({ adapter });
} else {
  if (!global.prismaCtx) {
    global.prismaCtx = new PrismaClient({ adapter });
  }
  prismaCtx = global.prismaCtx;
}

export default prismaCtx;
