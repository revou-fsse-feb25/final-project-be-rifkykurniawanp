import { PrismaClient, PaymentStatus, PayableType } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPayments() {
  const user = await prisma.user.findFirst({ where: { role: 'USER' } });
  const cart = await prisma.cart.findFirst({ where: { userId: user?.id } });
  const product = await prisma.product.findFirst();
  if (!user || !cart || !product) return;

  await prisma.payment.create({
    data: {
      userId: user.id,
      cartId: cart.id,
      amount: product.price,
      paymentMethod: 'Credit Card',
      status: PaymentStatus.COMPLETED,
      payableType: PayableType.PRODUCT,
      payableId: product.id,
    },
  });

  console.log('Payments seeded');
}
