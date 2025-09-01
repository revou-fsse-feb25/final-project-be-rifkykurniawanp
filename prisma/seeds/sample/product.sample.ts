import { PrismaClient, ProductCategory, ProductOrigin, ProductStatus, ProductTagName } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedProducts() {
  const supplier = await prisma.user.findFirst({ where: { role: 'SUPPLIER' } });
  if (!supplier) throw new Error('Supplier user not found');

  const products = Array.from({ length: 10 }).map(() => ({
    slug: faker.helpers.slugify(faker.commerce.productName() + '-' + faker.string.uuid()),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({min: 10,max: 100})),
    stock: faker.number.int({ min: 0, max: 100 }),
    category: faker.helpers.arrayElement(Object.values(ProductCategory)),
    status: ProductStatus.ACTIVE,
    supplierId: supplier.id,
    rating: 0,
    reviewCount: 0,
    origin: faker.helpers.arrayElement(Object.values(ProductOrigin)),
    tags: [faker.helpers.arrayElement(Object.values(ProductTagName))],
  }));

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('Products seeded');
}
