import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSampleReviews() {
  console.log('⭐ Seeding sample reviews...');

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: 'user@coffeeshop.com' },
        { email: 'admin@coffeeshop.com' }
      ]
    }
  });

  const products = await prisma.product.findMany({
    select: { id: true, name: true }
  });

  const reviewTexts = [
    'Excellent quality coffee beans! The aroma is amazing and the taste is perfectly balanced.',
    'Great product, fast shipping. Will definitely order again.',
    'Good value for money. The coffee has a rich flavor profile.',
    'Outstanding quality! This is now my go-to coffee supplier.',
    'Fresh beans with great packaging. Highly recommended!',
    'Perfect roast level. Makes an excellent espresso.',
    'Love the origin notes. Very authentic taste.',
    'Premium quality at reasonable price. 5 stars!'
  ];

  // Create reviews for products
  for (const product of products.slice(0, 4)) { // Review first 4 products
    const numReviews = Math.floor(Math.random() * 3) + 2; // 2-4 reviews per product
    
    for (let i = 0; i < numReviews; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars
      const comment = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];

      try {
        await prisma.productReview.create({
          data: {
            productId: product.id,
            userId: randomUser.id,
            rating: rating,
            comment: comment,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
          }
        });
      } catch (error) {
        // Skip if duplicate review (same user-product combination)
        continue;
      }
    }

    // Update product rating and review count
    const reviews = await prisma.productReview.findMany({
      where: { productId: product.id }
    });

    if (reviews.length > 0) {
      const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      
      await prisma.product.update({
        where: { id: product.id },
        data: {
          rating: avgRating,
          reviewCount: reviews.length
        }
      });
    }
  }

  console.log('✅ Sample reviews seeded successfully');
}