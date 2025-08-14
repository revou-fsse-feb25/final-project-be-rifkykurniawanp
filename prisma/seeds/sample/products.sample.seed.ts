import { PrismaClient, ProductCategory } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedSampleProducts() {
  const supplier = await prisma.user.findFirst({
    where: { role: { name: "SUPPLIER" } },
  });
  if (!supplier) {
    console.warn("⚠ No supplier found, skipping products seeding");
    return;
  }

  const products = [
    {
      slug: "arabica-coffee",
      name: "Arabica Coffee Beans",
      price: 150000,
      stock: 50,
      category: ProductCategory.COFFEE,
      supplierId: supplier.id,
      origin: "Indonesia",
      weight: "250g",
    },
    {
      slug: "green-tea",
      name: "Premium Green Tea",
      price: 80000,
      stock: 100,
      category: ProductCategory.TEA,
      supplierId: supplier.id,
      origin: "Japan",
      weight: "100g",
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  console.log("✅ Sample products seeded");
}
