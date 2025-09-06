// prisma/seeds/sample/products.ts
import {
  PrismaClient,
  ProductCategory,
  ProductStatus,
  ProductOrigin,
  ProductTag,
  Role,
  Product,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

export async function seedProducts(): Promise<Product[]> {
  console.log("☕ Seeding sample products...");

  // Find a supplier (User with SUPPLIER role)
  const supplier = await prisma.user.findFirst({
    where: { role: { name: Role.SUPPLIER } },
  });

  if (!supplier) {
    throw new Error("❌ No supplier found. Please seed users with SUPPLIER role first.");
  }

  const productsData: Array<Prisma.ProductCreateInput> = [
    {
      slug: "arabica-coffee-beans",
      name: "Arabica Coffee Beans",
      description: "Premium Arabica coffee beans from Indonesia.",
      price: new Prisma.Decimal("150000"),
      stock: 50,
      images: ["arabica1.jpg", "arabica2.jpg"],
      category: ProductCategory.COFFEE,
      status: ProductStatus.ACTIVE,
      supplier: { connect: { id: supplier.id } }, // ✅ FIX
      rating: new Prisma.Decimal("4.5"),
      reviewCount: 10,
      origin: ProductOrigin.INDONESIA,
      weight: "250g",
      tags: [ProductTag.ARABICA, ProductTag.ORGANIC, ProductTag.SINGLE_ORIGIN],
    },
    {
      slug: "green-tea-leaves",
      name: "Green Tea Leaves",
      description: "Fresh green tea leaves from Vietnam.",
      price: new Prisma.Decimal("80000"),
      stock: 30,
      images: ["greentea1.jpg", "greentea2.jpg"],
      category: ProductCategory.TEA,
      status: ProductStatus.ACTIVE,
      supplier: { connect: { id: supplier.id } }, // ✅ FIX
      rating: new Prisma.Decimal("4.2"),
      reviewCount: 5,
      origin: ProductOrigin.VIETNAM,
      weight: "200g",
      tags: [ProductTag.GREEN_TEA, ProductTag.ORGANIC],
    },
    {
      slug: "herbal-chamomile",
      name: "Chamomile Herbal Tea",
      description: "Relaxing chamomile tea for stress relief.",
      price: new Prisma.Decimal("60000"),
      stock: 20,
      images: ["chamomile1.jpg"],
      category: ProductCategory.HERBAL,
      status: ProductStatus.ACTIVE,
      supplier: { connect: { id: supplier.id } }, // ✅ FIX
      rating: new Prisma.Decimal("4.7"),
      reviewCount: 8,
      origin: ProductOrigin.OTHER,
      weight: "100g",
      tags: [ProductTag.HERBAL, ProductTag.ORGANIC],
    },
  ];

  const seededProducts: Product[] = [];

  for (const product of productsData) {
    const seededProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
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
