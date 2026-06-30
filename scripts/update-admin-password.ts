import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@catminer.com.br";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!databaseUrl || !adminPassword) {
    throw new Error("DATABASE_URL e ADMIN_PASSWORD são obrigatórios.");
  }

  const prisma = new PrismaClient({ adapter: new PrismaPg(databaseUrl) });
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.update({
    where: { email: adminEmail },
    data: { passwordHash },
  });

  console.log(`Senha atualizada para ${adminEmail}`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
