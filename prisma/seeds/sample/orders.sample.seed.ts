import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedSampleOrders() {
  const buyer = await prisma.user.findFirst({
    where: { role: { name: "USER" } },
  });
  const product = await prisma.product.findFirst();
  const course = await prisma.course.findFirst();
  if (!buyer || !product || !course) {
    console.warn("⚠ Missing data, skipping orders seeding");
    return;
  }

  // Create a cart
  const cart = await prisma.cart.create({
    data: {
      userId: buyer.id,
      items: {
        create: [
          {
            itemType: "product",
            itemId: product.id,
            quantity: 1,
            price: product.price,
          },
          {
            itemType: "course",
            itemId: course.id,
            quantity: 1,
            price: course.price,
          },
        ],
      },
    },
  });

  // Payment
  const payment = await prisma.payment.create({
    data: {
      userId: buyer.id,
      cartId: cart.id,
      amount: product.price.plus(course.price),
      paymentMethod: "credit_card",
      payableType: "mixed",
      payableId: cart.id,
      status: "paid",
    },
  });

  // Product order
  await prisma.productOrder.create({
    data: {
      buyerId: buyer.id,
      paymentId: payment.id,
      totalPrice: product.price,
      status: "completed",
      items: {
        create: {
          productId: product.id,
          quantity: 1,
          priceEach: product.price,
        },
      },
    },
  });

  // Course enrollment
  await prisma.courseEnrollment.create({
    data: {
      courseId: course.id,
      studentId: buyer.id,
      paymentId: payment.id,
      pricePaid: course.price,
      progress: 0,
    },
  });

  console.log("✅ Sample orders & enrollments seeded");
}
