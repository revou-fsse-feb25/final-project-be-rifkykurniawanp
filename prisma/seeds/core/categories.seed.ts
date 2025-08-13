import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCategories() {
  console.log('📂 Seeding categories...');

  // Product Categories
  const coffeeBeansCategory = await prisma.productCategory.upsert({
    where: { slug: 'coffee-beans' },
    update: {},
    create: {
      name: 'Coffee Beans',
      slug: 'coffee-beans'
    }
  });

  const arabicaCategory = await prisma.productCategory.upsert({
    where: { slug: 'arabica' },
    update: {},
    create: {
      name: 'Arabica',
      slug: 'arabica',
      parentId: coffeeBeansCategory.id
    }
  });

  const robustaCategory = await prisma.productCategory.upsert({
    where: { slug: 'robusta' },
    update: {},
    create: {
      name: 'Robusta',
      slug: 'robusta',
      parentId: coffeeBeansCategory.id
    }
  });

  const coffeeEquipmentCategory = await prisma.productCategory.upsert({
    where: { slug: 'coffee-equipment' },
    update: {},
    create: {
      name: 'Coffee Equipment',
      slug: 'coffee-equipment'
    }
  });

  const brewingCategory = await prisma.productCategory.upsert({
    where: { slug: 'brewing-equipment' },
    update: {},
    create: {
      name: 'Brewing Equipment',
      slug: 'brewing-equipment',
      parentId: coffeeEquipmentCategory.id
    }
  });

  // Course Categories
  const baristaBasicsCategory = await prisma.courseCategory.upsert({
    where: { slug: 'barista-basics' },
    update: {},
    create: {
      name: 'Barista Basics',
      slug: 'barista-basics'
    }
  });

  const coffeeBrewingCategory = await prisma.courseCategory.upsert({
    where: { slug: 'coffee-brewing' },
    update: {},
    create: {
      name: 'Coffee Brewing',
      slug: 'coffee-brewing'
    }
  });

  const coffeeBusinessCategory = await prisma.courseCategory.upsert({
    where: { slug: 'coffee-business' },
    update: {},
    create: {
      name: 'Coffee Business',
      slug: 'coffee-business'
    }
  });

  const latteArtCategory = await prisma.courseCategory.upsert({
    where: { slug: 'latte-art' },
    update: {},
    create: {
      name: 'Latte Art',
      slug: 'latte-art'
    }
  });

  console.log('✅ Categories seeded successfully');
  return {
    productCategories: {
      coffeeBeans: coffeeBeansCategory,
      arabica: arabicaCategory,
      robusta: robustaCategory,
      coffeeEquipment: coffeeEquipmentCategory,
      brewing: brewingCategory
    },
    courseCategories: {
      baristaBasics: baristaBasicsCategory,
      coffeeBrewing: coffeeBrewingCategory,
      coffeeBusiness: coffeeBusinessCategory,
      latteArt: latteArtCategory
    }
  };
}
