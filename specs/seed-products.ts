import { PrismaClient, ProductCondition, ProductStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@catminer.com.br'
  const adminPassword = process.env.ADMIN_PASSWORD || 'trocar-esta-senha'

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: process.env.ADMIN_NAME || 'Cat Miner Admin',
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: 'ADMIN',
    },
  })

  const products = [
    {
      name: 'Bitmain Antminer S19j Pro+ (120 TH)',
      slug: 'bitmain-antminer-s19j-pro-plus-120th',
      shortDescription: 'ASIC usado/revisado para mineração com 120 TH/s.',
      description: 'Equipamento ASIC para mineração de criptomoedas. Produto usado/revisado, com dados técnicos informados conforme disponibilidade operacional.',
      priceCents: 749900,
      stock: 1,
      status: ProductStatus.ACTIVE,
      condition: ProductCondition.USED,
      voltage: '220v',
      warrantyDays: 30,
      brand: 'Bitmain',
      model: 'Antminer S19j Pro+',
      algorithm: 'SHA-256',
      hashrate: '120 TH/s',
      consumption: '3.360 W',
      dailyRevenueText: 'R$ 32,83 /dia',
      monthlyRevenueText: 'R$ 984,77 /mês',
      isFeatured: true,
    },
    {
      name: 'Bitmain S19J Pro (95 TH)',
      slug: 'bitmain-s19j-pro-95th',
      shortDescription: 'ASIC usado/revisado para mineração com 95 TH/s.',
      description: 'Equipamento ASIC para mineração de criptomoedas. Produto usado/revisado, com garantia indicada na página.',
      priceCents: 389900,
      stock: 1,
      status: ProductStatus.ACTIVE,
      condition: ProductCondition.USED,
      voltage: '220v',
      warrantyDays: 30,
      brand: 'Bitmain',
      model: 'S19J Pro',
      algorithm: 'SHA-256',
      hashrate: '95 TH/s',
      consumption: '3.250 W',
      dailyRevenueText: 'R$ 24,76 /dia',
      monthlyRevenueText: 'R$ 742,78 /mês',
      isFeatured: true,
    },
    {
      name: 'Whatsminer M50 (120 TH)',
      slug: 'whatsminer-m50-120th',
      shortDescription: 'ASIC usado/revisado Whatsminer com 120 TH/s.',
      description: 'Equipamento ASIC para mineração de criptomoedas. Produto usado/revisado com dados técnicos claros para decisão de compra.',
      priceCents: 599900,
      stock: 1,
      status: ProductStatus.ACTIVE,
      condition: ProductCondition.USED,
      voltage: '220v',
      warrantyDays: 30,
      brand: 'MicroBT',
      model: 'Whatsminer M50',
      algorithm: 'SHA-256',
      hashrate: '120 TH/s',
      consumption: '3.360 W',
      dailyRevenueText: 'R$ 32,83 /dia',
      monthlyRevenueText: 'R$ 984,77 /mês',
      isFeatured: true,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
