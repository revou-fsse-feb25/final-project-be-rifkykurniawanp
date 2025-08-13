import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSampleProducts() {
  console.log('☕ Seeding sample products...');

  // Get categories and supplier
  const arabicaCategory = await prisma.productCategory.findUniqueOrThrow({ where: { slug: 'arabica' } });
  const robustaCategory = await prisma.productCategory.findUniqueOrThrow({ where: { slug: 'robusta' } });
  const brewingCategory = await prisma.productCategory.findUniqueOrThrow({ where: { slug: 'brewing-equipment' } });
  const supplier = await prisma.user.findUniqueOrThrow({ where: { email: 'supplier@coffeeshop.com' } });

  // Sample coffee products
  const products = [
    {
      slug: 'ethiopian-yirgacheffe',
      name: 'Ethiopian Yirgacheffe',
      description: 'Bright and floral coffee with notes of lemon and tea-like qualities. Single origin from the birthplace of coffee.',
      price: 125000,
      stock: 50,
      image: 'https://example.com/images/ethiopian-yirgacheffe.jpg',
      categoryId: arabicaCategory.id,
      origin: 'Ethiopia',
      weight: '250g',
      roastLevel: 'Medium',
      caffeine: 'Medium',
      brewingMethods: ['Pour Over', 'French Press', 'AeroPress']
    },
    {
      slug: 'colombian-supremo',
      name: 'Colombian Supremo',
      description: 'Rich and balanced coffee with chocolate and caramel notes. Perfect for espresso and filter brewing.',
      price: 115000,
      stock: 75,
      image: 'https://example.com/images/colombian-supremo.jpg',
      categoryId: arabicaCategory.id,
      origin: 'Colombia',
      weight: '250g',
      roastLevel: 'Medium-Dark',
      caffeine: 'High',
      brewingMethods: ['Espresso', 'Moka Pot', 'French Press']
    },
    {
      slug: 'brazilian-robusta',
      name: 'Brazilian Robusta',
      description: 'Strong and bold coffee with earthy flavor. High caffeine content, perfect for espresso blends.',
      price: 95000,
      stock: 100,
      image: 'https://example.com/images/brazilian-robusta.jpg',
      categoryId: robustaCategory.id,
      origin: 'Brazil',
      weight: '250g',
      roastLevel: 'Dark',
      caffeine: 'Very High',
      brewingMethods: ['Espresso', 'Turkish Coffee']
    },
    {
      slug: 'guatemalan-antigua',
      name: 'Guatemalan Antigua',
      description: 'Full-bodied coffee with smoky and spicy notes. Grown in volcanic soil for unique flavor profile.',
      price: 135000,
      stock: 30,
      image: 'https://example.com/images/guatemalan-antigua.jpg',
      categoryId: arabicaCategory.id,
      origin: 'Guatemala',
      weight: '250g',
      roastLevel: 'Medium-Dark',
      caffeine: 'Medium',
      brewingMethods: ['Pour Over', 'French Press', 'Espresso']
    },
    {
      slug: 'v60-dripper',
      name: 'Hario V60 Dripper',
      description: 'Premium ceramic pour-over dripper for perfect coffee extraction. Includes paper filters.',
      price: 285000,
      stock: 25,
      image: 'https://example.com/images/v60-dripper.jpg',
      categoryId: brewingCategory.id,
      origin: 'Japan',
      weight: '300g'
    },
    {
      slug: 'french-press-350ml',
      name: 'French Press 350ml',
      description: 'Borosilicate glass French press with stainless steel filter. Perfect for rich, full-bodied coffee.',
      price: 195000,
      stock: 40,
      image: 'https://example.com/images/french-press.jpg',
      categoryId: brewingCategory.id,
      origin: 'France',
      weight: '500g'
    }
  ];

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        ...productData,
        supplierId: supplier.id,
        rating: Math.random() * 1.5 + 3.5, // Random rating between 3.5-5.0
        reviewCount: Math.floor(Math.random() * 50) + 10 // Random review count 10-60
      }
    });

    // Add tags
    const tags = productData.categoryId === arabicaCategory.id || productData.categoryId === robustaCategory.id
      ? ['coffee', 'beans', 'single-origin', 'premium']
      : ['equipment', 'brewing', 'barista', 'premium'];

    for (const tag of tags) {
      await prisma.productTag.upsert({
        where: {
          productId_tag: {
            productId: product.id,
            tag: tag
          }
        },
        update: {},
        create: {
          productId: product.id,
          tag: tag
        }
      });
    }
  }

  console.log('✅ Sample products seeded successfully');
}