import { PrismaClient, CartItemType, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCarts() {
  try {
    // Find required data
    const user = await prisma.user.findFirst({ where: { role: 'USER' } });
    const product = await prisma.product.findFirst();
    const course = await prisma.course.findFirst();

    if (!user) {
      console.log('⚠️  No USER found, skipping cart seed');
      return;
    }

    if (!product && !course) {
      console.log('⚠️  No products or courses found, skipping cart seed');
      return;
    }

    // Create cart with mixed items (product + course)
    const cartData = {
      userId: user.id,
      items: {
        create: [] as {
          itemType: CartItemType;
          itemId: number;
          quantity: number;
          price: number | Prisma.Decimal;
        }[]
      }
    };

    // Add product to cart if exists
    if (product) {
      cartData.items.create.push({
        itemType: CartItemType.PRODUCT,
        itemId: product.id,
        quantity: 2,
        price: product.price
      });
    }

    // Add course to cart if exists
    if (course) {
      cartData.items.create.push({
        itemType: CartItemType.COURSE,
        itemId: course.id,
        quantity: 1,
        price: course.price
      });
    }

    const cart = await prisma.cart.create({
      data: cartData,
      include: {
        items: true,
        user: {
          select: {
            email: true,
            firstName: true
          }
        }
      }
    });

    console.log(`✅ Cart seeded for user: ${cart.user.email}`);
    console.log(`   - Cart ID: ${cart.id}`);
    console.log(`   - Items: ${cart.items.length}`);
    
    // Log items details
    cart.items.forEach((item, index) => {
      console.log(`   - Item ${index + 1}: ${item.itemType} (ID: ${item.itemId}) x${item.quantity} @ $${item.price}`);
    });

  } catch (error) {
    console.error('❌ Error seeding carts:', error);
    throw error;
  }
}

// Alternative: Create multiple sample carts
export async function seedMultipleCarts() {
  try {
    const users = await prisma.user.findMany({ 
      where: { role: 'USER' },
      take: 3 
    });
    
    const products = await prisma.product.findMany({ take: 3 });
    const courses = await prisma.course.findMany({ take: 2 });

    if (users.length === 0) {
      console.log('⚠️  No users found for multiple carts seed');
      return;
    }

    const createdCarts: Awaited<ReturnType<typeof prisma.cart.create>>[] = [];

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const cartItems: {
        itemType: CartItemType;
        itemId: number;
        quantity: number;
        price: number | Prisma.Decimal;
      }[] = [];

      // Random cart composition
      if (products.length > 0 && Math.random() > 0.3) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        cartItems.push({
          itemType: CartItemType.PRODUCT,
          itemId: randomProduct.id,
          quantity: Math.floor(Math.random() * 3) + 1,
          price: randomProduct.price
        });
      }

      if (courses.length > 0 && Math.random() > 0.5) {
        const randomCourse = courses[Math.floor(Math.random() * courses.length)];
        cartItems.push({
          itemType: CartItemType.COURSE,
          itemId: randomCourse.id,
          quantity: 1,
          price: randomCourse.price
        });
      }

      if (cartItems.length > 0) {
        const cart = await prisma.cart.create({
          data: {
            userId: user.id,
            items: {
              create: cartItems
            }
          }
        });
        createdCarts.push(cart);
      }
    }

    console.log(`✅ ${createdCarts.length} sample carts created`);
    
  } catch (error) {
    console.error('❌ Error seeding multiple carts:', error);
    throw error;
  }
}