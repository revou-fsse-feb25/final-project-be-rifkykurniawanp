// prisma/seeds/sample/products.ts
import {
  PrismaClient,
  ProductCategory,
  ProductStatus,
  ProductOrigin,
  ProductTagName,
  RoleName,
  Product,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

export async function seedProducts(): Promise<Product[]> {
  console.log("☕ Seeding sample products...");

  // Find a supplier
  const supplier = await prisma.user.findFirst({
    where: { role: { name: RoleName.SUPPLIER } },
  });

  if (!supplier) throw new Error("❌ No supplier found. Please seed users with SUPPLIER role first.");

  const productsData = [
    {
      slug: "arabica-coffee-beans",
      name: "Arabica Coffee Beans",
      description: "Premium Arabica coffee beans from Indonesia.",
      price: new Prisma.Decimal(150000),
      stock: 50,
      images: ["arabica1.jpg", "arabica2.jpg"],
      category: ProductCategory.COFFEE,
      status: ProductStatus.ACTIVE,
      supplierId: supplier.id,
      rating: new Prisma.Decimal(4.5),
      reviewCount: 10,
      origin: ProductOrigin.INDONESIA,
      weight: "250g",
      tags: [ProductTagName.ARABICA, ProductTagName.ORGANIC, ProductTagName.SINGLE_ORIGIN],
    },
    {
      slug: "green-tea-leaves",
      name: "Green Tea Leaves",
      description: "Fresh green tea leaves from Vietnam.",
      price: new Prisma.Decimal(80000),
      stock: 30,
      images: ["greentea1.jpg", "greentea2.jpg"],
      category: ProductCategory.TEA,
      status: ProductStatus.ACTIVE,
      supplierId: supplier.id,
      rating: new Prisma.Decimal(4.2),
      reviewCount: 5,
      origin: ProductOrigin.VIETNAM,
      weight: "200g",
      tags: [ProductTagName.GREEN_TEA, ProductTagName.ORGANIC],
    },
    {
      slug: "herbal-chamomile",
      name: "Chamomile Herbal Tea",
      description: "Relaxing chamomile tea for stress relief.",
      price: new Prisma.Decimal(60000),
      stock: 20,
      images: ["chamomile1.jpg"],
      category: ProductCategory.HERBAL,
      status: ProductStatus.ACTIVE,
      supplierId: supplier.id,
      rating: new Prisma.Decimal(4.7),
      reviewCount: 8,
      origin: ProductOrigin.OTHER, // EGYPT removed → use OTHER
      weight: "100g",
      tags: [ProductTagName.HERBAL, ProductTagName.ORGANIC],
    },
  ];

  const seededProducts: Product[] = [];

  for (const product of productsData) {
    const seededProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...product },
      create: { ...product },
    });

    console.log(
      seededProduct.createdAt.getTime() === seededProduct.updatedAt.getTime()
        ? `✅ Product created: ${product.slug}`
        : `ℹ️ Product updated: ${product.slug}`
    );

    seededProducts.push(seededProduct);
  }

  console.log("✅ All sample products seeded successfully.");
  return seededProducts;
}
