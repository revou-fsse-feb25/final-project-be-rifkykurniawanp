// prisma/seeds/sample/carts.ts
import {
  PrismaClient,
  Cart,
  CartItem,
  CartItemType,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

/**
 * SAMPLE CARTS & CART ITEMS
 * - Creates carts for buyers/students
 * - Mix of product and course items
 * - Various cart states (empty, with items, ready to checkout)
 * - Idempotent with detailed tracking
 */
export async function seedCarts(): Promise<{
  carts: Cart[];
  cartItems: CartItem[];
}> {
  console.log("🛒 Seeding sample carts and cart items...");

  // --- Pre-checks: users, products, courses exist ---
  const buyers = await prisma.user.findMany({
    where: { 
      OR: [
        { isBuyer: true },
        { isStudent: true }
      ]
    },
    select: { id: true, email: true, firstName: true, lastName: true, isBuyer: true, isStudent: true },
  });

  if (buyers.length === 0) {
    throw new Error("❌ No buyers/students found. Please seed users first.");
  }

  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    select: { id: true, slug: true, name: true, price: true, stock: true },
    take: 10, // Limit for demo
  });

  const courses = await prisma.course.findMany({
    where: { 
      status: "PUBLISHED",
      isPublished: true 
    },
    select: { id: true, slug: true, title: true, price: true },
    take: 10, // Limit for demo
  });

  if (products.length === 0 && courses.length === 0) {
    throw new Error("❌ No active products or published courses found. Please seed products and courses first.");
  }

  // --- Cart scenarios ---
  const cartScenarios = [
    {
      // Student interested in coffee courses + some products
      userIndex: 0,
      items: [
        {
          type: CartItemType.COURSE,
          targetSlug: "coffee-brewing-fundamentals",
          quantity: 1,
        },
        {
          type: CartItemType.PRODUCT,
          targetSlug: "arabica-coffee-beans",
          quantity: 2,
        },
        {
          type: CartItemType.PRODUCT,
          targetSlug: "herbal-chamomile",
          quantity: 1,
        },
      ],
    },
    {
      // Tea enthusiast with tea course and products
      userIndex: 1,
      items: [
        {
          type: CartItemType.COURSE,
          targetSlug: "advanced-tea-ceremony-mastery",
          quantity: 1,
        },
        {
          type: CartItemType.PRODUCT,
          targetSlug: "green-tea-leaves",
          quantity: 3,
        },
      ],
    },
    {
      // Business-focused buyer with course and equipment
      userIndex: 2,
      items: [
        {
          type: CartItemType.COURSE,
          targetSlug: "coffee-business-startup-guide",
          quantity: 1,
        },
        {
          type: CartItemType.COURSE,
          targetSlug: "professional-barista-skills",
          quantity: 1,
        },
      ],
    },
    {
      // Product-only buyer
      userIndex: 3,
      items: [
        {
          type: CartItemType.PRODUCT,
          targetSlug: "arabica-coffee-beans",
          quantity: 5,
        },
        {
          type: CartItemType.PRODUCT,
          targetSlug: "green-tea-leaves",
          quantity: 2,
        },
        {
          type: CartItemType.PRODUCT,
          targetSlug: "herbal-chamomile",
          quantity: 3,
        },
      ],
    },
    {
      // Empty cart (user browsing but haven't added anything)
      userIndex: 4,
      items: [],
    },
  ];

  // --- Process cart scenarios ---
  const seededCarts: Cart[] = [];
  const seededCartItems: CartItem[] = [];
  const cartStats: string[] = [];
  const itemStats: string[] = [];

  for (let i = 0; i < Math.min(cartScenarios.length, buyers.length); i++) {
    const scenario = cartScenarios[i];
    const user = buyers[scenario.userIndex] || buyers[i]; // Fallback if index out of range

    // --- Create/update cart for user ---
    const existingCart = await prisma.cart.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    const cart = await prisma.cart.upsert({
      where: { userId: user.id },
      update: {
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
      },
    });

    seededCarts.push(cart);
    cartStats.push(
      existingCart 
        ? `Updated cart: ${user.firstName} ${user.lastName} (${user.email})` 
        : `Created cart: ${user.firstName} ${user.lastName} (${user.email})`
    );

    // --- Clear existing cart items for clean slate ---
    if (existingCart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    // --- Add items to cart ---
    for (const itemData of scenario.items) {
      let productId: number | null = null;
      let courseId: number | null = null;
      let priceSnapshot: Prisma.Decimal;
      let itemName: string;

      if (itemData.type === CartItemType.PRODUCT) {
        const product = products.find(p => p.slug === itemData.targetSlug);
        if (!product) {
          console.warn(`⚠️ Product ${itemData.targetSlug} not found, skipping item...`);
          continue;
        }
        
        // Check stock availability
        if (product.stock < itemData.quantity) {
          console.warn(`⚠️ Product ${itemData.targetSlug} has insufficient stock (${product.stock} < ${itemData.quantity}), skipping item...`);
          continue;
        }

        productId = product.id;
        priceSnapshot = product.price;
        itemName = product.name;
      } else {
        const course = courses.find(c => c.slug === itemData.targetSlug);
        if (!course) {
          console.warn(`⚠️ Course ${itemData.targetSlug} not found, skipping item...`);
          continue;
        }

        courseId = course.id;
        priceSnapshot = course.price;
        itemName = course.title;

        // Course quantity should always be 1
        if (itemData.quantity !== 1) {
          console.warn(`⚠️ Course quantity should be 1, adjusting for ${itemData.targetSlug}`);
          itemData.quantity = 1;
        }
      }

      const cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          itemType: itemData.type,
          productId: productId,
          courseId: courseId,
          quantity: itemData.quantity,
          priceSnapshot: priceSnapshot,
          addedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last 7 days
        },
      });

      seededCartItems.push(cartItem);
      itemStats.push(
        `Added to ${user.firstName}'s cart: ${itemName} (${itemData.type}) x${itemData.quantity}`
      );
    }
  }

  // --- Calculate summary statistics ---
  const cartsByItemCount = seededCarts.map(cart => {
    const itemCount = seededCartItems.filter(item => item.cartId === cart.id).length;
    const totalValue = seededCartItems
      .filter(item => item.cartId === cart.id)
      .reduce((sum, item) => sum + (Number(item.priceSnapshot) * item.quantity), 0);
    return { cart, itemCount, totalValue };
  });

  const emptyCartCount = cartsByItemCount.filter(c => c.itemCount === 0).length;
  const nonEmptyCartCount = cartsByItemCount.filter(c => c.itemCount > 0).length;

  const productItemCount = seededCartItems.filter(item => item.itemType === CartItemType.PRODUCT).length;
  const courseItemCount = seededCartItems.filter(item => item.itemType === CartItemType.COURSE).length;

  const totalCartValue = cartsByItemCount.reduce((sum, c) => sum + c.totalValue, 0);
  const avgCartValue = nonEmptyCartCount > 0 ? totalCartValue / nonEmptyCartCount : 0;

  // --- Console Summary ---
  console.log("——— Carts & Cart Items Seeding Summary ———");
  console.log(`• Users processed: ${buyers.length} buyers/students`);
  console.log(`• Products available: ${products.length}`);
  console.log(`• Courses available: ${courses.length}`);
  console.log(`• Carts created/updated: ${seededCarts.length}`);
  console.log(`• Cart items added: ${seededCartItems.length}`);
  console.log("");
  console.log("• Cart distribution:");
  console.log(`  → Empty carts: ${emptyCartCount}`);
  console.log(`  → Carts with items: ${nonEmptyCartCount}`);
  console.log(`  → Average items per non-empty cart: ${nonEmptyCartCount > 0 ? (seededCartItems.length / nonEmptyCartCount).toFixed(1) : 0}`);
  console.log("");
  console.log("• Item type distribution:");
  console.log(`  → Product items: ${productItemCount}`);
  console.log(`  → Course items: ${courseItemCount}`);
  console.log("");
  console.log("• Cart value statistics:");
  console.log(`  → Total cart value: Rp ${totalCartValue.toLocaleString()}`);
  console.log(`  → Average cart value: Rp ${avgCartValue.toLocaleString()}`);
  
  // Show individual cart details
  console.log("");
  console.log("• Individual cart details:");
  cartsByItemCount.forEach((cartInfo, index) => {
    const user = buyers.find(u => seededCarts.find(c => c.id === cartInfo.cart.id)?.userId === u.id);
    console.log(`  → ${user?.firstName} ${user?.lastName}: ${cartInfo.itemCount} items, Rp ${cartInfo.totalValue.toLocaleString()}`);
  });

  console.log("✅ Sample carts and cart items seeded successfully.");

  return {
    carts: seededCarts,
    cartItems: seededCartItems,
  };
}