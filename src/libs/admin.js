import { prisma } from "./prisma";

export async function getAdmin(params) {
  return prisma.admin.findMany({
    orderBy: [{ level_id: "asc" }, { nama: "asc" }],
    include: { level: true },
  });
}

// import { prisma } from "./lib/prisma";

// async function main() {
//   // Example: Fetch all records from a table
//   // Replace 'user' with your actual model name
//   const allUsers = await prisma.user.findMany();
//   console.log("All users:", JSON.stringify(allUsers, null, 2));
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
