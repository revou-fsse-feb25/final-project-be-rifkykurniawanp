import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedSampleReviews() {
  const user = await prisma.user.findFirst({
    where: { role: { name: "USER" } },
  });
  const product = await prisma.product.findFirst();
  if (!user || !product) {
    console.warn("⚠ Missing user or product, skipping reviews seeding");
    return;
  }

  await prisma.productReview.upsert({
    where: { id: 1 },
    update: {},
    create: {
      productId: product.id,
      userId: user.id,
      rating: 5,
      comment: "Excellent product! Highly recommended.",
    },
  });

  console.log("✅ Sample reviews seeded");
}
