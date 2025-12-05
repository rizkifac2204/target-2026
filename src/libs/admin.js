import prismaCtx from "./prisma";

export async function getAdmin() {
  return prismaCtx.admin.findMany({
    where: {
      NOT: { id: 1 },
    },
    orderBy: [{ level_id: "asc" }, { nama: "asc" }],
    include: { level: true },
  });
}

export async function getAdminDetailById(id) {
  const adminId = Number(id);
  if (!Number.isInteger(adminId) || adminId === 1) return null;

  return prismaCtx.admin.findUnique({
    where: { id: adminId },
    include: { level: true },
  });
}

// Cek admin berdasarkan email, dan abaikan jika ID cocok (untuk validasi unik)
export async function getAdminDetailByEmail(email, excludeId = null) {
  return prismaCtx.admin.findFirst({
    where: {
      email: String(email),
      ...(excludeId && { NOT: { id: Number(excludeId) } }),
    },
  });
}

export async function createAdmin(data) {
  return prismaCtx.admin.create({ data });
}

export async function updateAdmin(id, data) {
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId)) return null;

  return prismaCtx.admin.update({
    where: { id: parsedId },
    data,
  });
}

export async function deleteAdmin(id) {
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId === 1) return null;

  return prisma.admin.delete({
    where: { id: parsedId },
  });
}
