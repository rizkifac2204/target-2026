import prismaCtx from "./prisma";
import { verifyAuth } from "./auth";

export async function getProfile() {
  const session = await verifyAuth();
  const data = await prismaCtx.admin.findUnique({
    where: { id: session.id },
    include: { level: true },
  });

  return data;
}

// cek apakah ada email yang sama pada saat edit profile
export async function isEmailSama(email) {
  const session = await verifyAuth();
  const data = await prismaCtx.admin.findFirst({
    where: { id: { not: session.id }, email: email },
  });
  return data;
}

export async function updateProfile(data) {
  const session = await verifyAuth();
  return prismaCtx.admin.update({
    where: { id: session.id },
    data,
  });
}
