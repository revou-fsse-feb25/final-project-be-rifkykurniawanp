import { PrismaClient, CartStatus, CartItemType } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCarts() {
  const user = await prisma.user.findFirst({ where: { role: 'USER' } });
  const product = await prisma.product.findFirst();
  if (!user || !product) return;

  await prisma.cart.create({
    data: {
      userId: user.id,
      status: CartStatus.ACTIVE,
      items: {
        create: [{ itemType: CartItemType.PRODUCT, itemId: product.id, quantity: 1, price: product.price }],
      },
    },
  });

  console.log('Carts seeded');
}
