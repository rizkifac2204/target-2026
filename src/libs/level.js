import prismaCtx from "./prisma";

export async function getLevel() {
  return await prismaCtx.level.findMany({
    orderBy: {
      id: "asc",
    },
  });
}
