import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSampleOrders() {
  console.log('🛒 Seeding sample orders...');

  // Get users and products
  const buyer = await prisma.user.findUniqueOrThrow({ where: { email: 'user@coffeeshop.com' } });
  const admin = await prisma.user.findUniqueOrThrow({ where: { email: 'admin@coffeeshop.com' } });
  
  const products = await prisma.product.findMany({
    select: { id: true, price: true, name: true }
  });

  // Sample product orders
  const orders = [
    {
      buyerId: buyer.id,
      status: 'completed',
      items: [
        { productId: products[0].id, quantity: 2, priceEach: products[0].price },
        { productId: products[1].id, quantity: 1, priceEach: products[1].price }
      ]
    },
    {
      buyerId: admin.id,
      status: 'shipped',
      items: [
        { productId: products[2].id, quantity: 3, priceEach: products[2].price }
      ]
    },
    {
      buyerId: buyer.id,
      status: 'pending',
      items: [
        { productId: products[3].id, quantity: 1, priceEach: products[3].price },
        { productId: products[4].id, quantity: 1, priceEach: products[4].price }
      ]
    }
  ];

  for (const orderData of orders) {
    const totalPrice = orderData.items.reduce((sum, item) => 
      sum + (Number(item.priceEach) * item.quantity), 0
    );

    const order = await prisma.productOrder.create({
      data: {
        buyerId: orderData.buyerId,
        totalPrice: totalPrice,
        status: orderData.status
      }
    });

    // Create order items
    for (const item of orderData.items) {
      await prisma.productOrderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          priceEach: item.priceEach
        }
      });
    }

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: orderData.buyerId,
        amount: totalPrice,
        paymentMethod: 'Credit Card',
        status: orderData.status === 'completed' ? 'completed' : 'pending',
        payableType: 'ProductOrder',
        payableId: order.id,
        note: `Payment for order #${order.id}`
      }
    });
  }

  // Sample course enrollments
  const courses = await prisma.course.findMany({
    select: { id: true, price: true, title: true }
  });

  const student = await prisma.user.findUniqueOrThrow({ where: { email: 'user@coffeeshop.com' } });

  for (let i = 0; i < Math.min(2, courses.length); i++) {
    const course = courses[i];
    
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        courseId: course.id,
        studentId: student.id,
        progress: Math.floor(Math.random() * 80) + 20 // Random progress 20-100%
      }
    });

    // Create payment for course
    await prisma.payment.create({
      data: {
        userId: student.id,
        amount: course.price || 0,
        paymentMethod: 'Bank Transfer',
        status: 'completed',
        payableType: 'Course',
        payableId: course.id,
        note: `Enrollment payment for ${course.title}`
      }
    });

    // Add some lesson progress
    const lessons = await prisma.lesson.findMany({
      where: {
        module: {
          courseId: course.id
        }
      },
      take: 3
    });

    for (const lesson of lessons) {
      await prisma.lessonProgress.create({
        data: {
          lessonId: lesson.id,
          userId: student.id,
          completed: Math.random() > 0.3, // 70% chance of completion
          bookmarked: Math.random() > 0.7  // 30% chance of bookmarked
        }
      });
    }
  }

  console.log('✅ Sample orders and enrollments seeded successfully');
}
