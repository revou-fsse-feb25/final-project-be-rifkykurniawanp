// prisma/seeds/sample/orders.ts
import {
  PrismaClient,
  ProductOrder,
  ProductOrderItem,
  OrderStatus,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

/**
 * SAMPLE PRODUCT ORDERS & ORDER ITEMS
 * - Creates product orders for completed product payments
 * - Generates realistic order progression and timing
 * - Various order statuses and shipping scenarios
 * - Order items matching cart items at time of purchase
 * - Idempotent with detailed tracking
 */
export async function seedOrders(): Promise<{
  orders: ProductOrder[];
  orderItems: ProductOrderItem[];
}> {
  console.log("📦 Seeding sample product orders...");

  // --- Pre-check: completed product payments exist ---
  const completedPayments = await prisma.payment.findMany({
    where: {
      status: "COMPLETED",
      cart: {
        items: {
          some: {
            itemType: "PRODUCT"
          }
        }
      }
    },
    include: {
      user: {
        select: { id: true, email: true, firstName: true, lastName: true, isBuyer: true }
      },
      cart: {
        include: {
          items: {
            where: { itemType: "PRODUCT" },
            include: {
              product: {
                select: { id: true, name: true, price: true, stock: true }
              }
            }
          }
        }
      }
    }
  });

  if (completedPayments.length === 0) {
    console.warn("⚠️ No completed product payments found. Please ensure payments are seeded first.");
    return { orders: [], orderItems: [] };
  }

  // --- Order status progression scenarios ---
  const orderStatusScenarios = [
    {
      name: "Delivered Orders",
      statuses: [
        { status: OrderStatus.PENDING, daysOffset: 0 },
        { status: OrderStatus.PROCESSING, daysOffset: 1 },
        { status: OrderStatus.SHIPPED, daysOffset: 2 },
        { status: OrderStatus.DELIVERED, daysOffset: 5 },
        { status: OrderStatus.COMPLETED, daysOffset: 7 },
      ],
      weight: 0.5, // 50% of orders are fully delivered
    },
    {
      name: "Shipped Orders",
      statuses: [
        { status: OrderStatus.PENDING, daysOffset: 0 },
        { status: OrderStatus.PROCESSING, daysOffset: 1 },
        { status: OrderStatus.SHIPPED, daysOffset: 2 },
      ],
      weight: 0.2, // 20% are currently shipped
    },
    {
      name: "Processing Orders",
      statuses: [
        { status: OrderStatus.PENDING, daysOffset: 0 },
        { status: OrderStatus.PROCESSING, daysOffset: 1 },
      ],
      weight: 0.15, // 15% are being processed
    },
    {
      name: "Pending Orders",
      statuses: [
        { status: OrderStatus.PENDING, daysOffset: 0 },
      ],
      weight: 0.1, // 10% are still pending
    },
    {
      name: "Cancelled Orders",
      statuses: [
        { status: OrderStatus.PENDING, daysOffset: 0 },
        { status: OrderStatus.CANCELLED, daysOffset: 2 },
      ],
      weight: 0.04, // 4% cancelled
    },
    {
      name: "Refunded Orders",
      statuses: [
        { status: OrderStatus.PENDING, daysOffset: 0 },
        { status: OrderStatus.PROCESSING, daysOffset: 1 },
        { status: OrderStatus.SHIPPED, daysOffset: 2 },
        { status: OrderStatus.DELIVERED, daysOffset: 5 },
        { status: OrderStatus.REFUNDED, daysOffset: 10 },
      ],
      weight: 0.01, // 1% refunded
    },
  ];

  // --- Process orders ---
  const seededOrders: ProductOrder[] = [];
  const seededOrderItems: ProductOrderItem[] = [];
  const orderStats: string[] = [];
  const statusCounts: Record<OrderStatus, number> = {} as Record<OrderStatus, number>;

  for (const payment of completedPayments) {
    const productItems = payment.cart.items.filter(item => item.itemType === "PRODUCT");
    
    if (productItems.length === 0) continue;

    // Calculate total order amount (product items only)
    const totalPrice = productItems.reduce((sum, item) => {
      return sum + (Number(item.priceSnapshot) * item.quantity);
    }, 0);

    // --- Determine order status scenario ---
    let selectedScenario = orderStatusScenarios[0];
    let random = Math.random();
    for (const scenario of orderStatusScenarios) {
      if (random <= scenario.weight) {
        selectedScenario = scenario;
        break;
      }
      random -= scenario.weight;
    }

    // Get current status (last status in the progression)
    const currentStatus = selectedScenario.statuses[selectedScenario.statuses.length - 1].status;

    // --- Check for existing order ---
    const existingOrder = await prisma.productOrder.findFirst({
      where: {
        buyerId: payment.userId,
        paymentId: payment.id,
      },
      select: { id: true },
    });

    // --- Create/update order ---
    const order = await prisma.productOrder.upsert({
      where: {
        id: existingOrder?.id || -1,
      },
      update: {
        totalPrice: new Prisma.Decimal(totalPrice),
        status: currentStatus,
        updatedAt: new Date(),
      },
      create: {
        buyerId: payment.userId,
        paymentId: payment.id,
        totalPrice: new Prisma.Decimal(totalPrice),
        status: currentStatus,
        createdAt: payment.paidAt || payment.createdAt,
      },
    });

    seededOrders.push(order);
    statusCounts[currentStatus] = (statusCounts[currentStatus] || 0) + 1;

    orderStats.push(
      existingOrder 
        ? `Updated order: ${payment.user.firstName} ${payment.user.lastName} - ${currentStatus} - Rp ${totalPrice.toLocaleString()}`
        : `Created order: ${payment.user.firstName} ${payment.user.lastName} - ${currentStatus} - Rp ${totalPrice.toLocaleString()}`
    );

    // --- Clear existing order items for clean slate ---
    if (existingOrder) {
      await prisma.productOrderItem.deleteMany({
        where: { orderId: order.id },
      });
    }

    // --- Create order items ---
    for (const cartItem of productItems) {
      if (!cartItem.product) continue;

      const orderItem = await prisma.productOrderItem.create({
        data: {
          orderId: order.id,
          productId: cartItem.product.id,
          quantity: cartItem.quantity,
          priceEach: cartItem.priceSnapshot,
        },
      });

      seededOrderItems.push(orderItem);
    }
  }

  // --- Calculate summary statistics ---
  const totalRevenue = seededOrders
    .filter(o => o.status === OrderStatus.COMPLETED)
    .reduce((sum, o) => sum + Number(o.totalPrice), 0);

  const averageOrderValue = seededOrders.length > 0 
    ? seededOrders.reduce((sum, o) => sum + Number(o.totalPrice), 0) / seededOrders.length
    : 0;

  const fulfillmentRate = seededOrders.length > 0 
    ? (((statusCounts[OrderStatus.DELIVERED] || 0) + (statusCounts[OrderStatus.COMPLETED] || 0)) / seededOrders.length * 100)
    : 0;

  const cancellationRate = seededOrders.length > 0 
    ? (((statusCounts[OrderStatus.CANCELLED] || 0) + (statusCounts[OrderStatus.REFUNDED] || 0)) / seededOrders.length * 100)
    : 0;

  // --- Calculate order items statistics ---
  const itemsByProduct = seededOrderItems.reduce((acc, item) => {
    acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
    return acc;
  }, {} as Record<number, number>);

  // Get product names for top sellers
  const topProductIds = Object.entries(itemsByProduct)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([productId]) => parseInt(productId));

  const topProducts = await prisma.product.findMany({
    where: { id: { in: topProductIds } },
    select: { id: true, name: true },
  });

  // --- Console Summary ---
  console.log("——— Product Orders Seeding Summary ———");
  console.log(`• Completed product payments: ${completedPayments.length}`);
  console.log(`• Product orders created/updated: ${seededOrders.length}`);
  console.log(`• Order items created: ${seededOrderItems.length}`);
  console.log("");
  console.log("• Order status distribution:");
  Object.entries(statusCounts).forEach(([status, count]) => {
    const percentage = ((count / seededOrders.length) * 100).toFixed(1);
    console.log(`  → ${status}: ${count} (${percentage}%)`);
  });
  console.log("");
  console.log("• Order metrics:");
  console.log(`  → Total product revenue: Rp ${totalRevenue.toLocaleString()}`);
  console.log(`  → Average order value: Rp ${averageOrderValue.toLocaleString()}`);
  console.log(`  → Order fulfillment rate: ${fulfillmentRate.toFixed(1)}%`);
  console.log(`  → Order cancellation rate: ${cancellationRate.toFixed(1)}%`);
  console.log("");
  console.log("• Product performance:");
  console.log(`  → Total units sold: ${Object.values(itemsByProduct).reduce((sum, qty) => sum + qty, 0)}`);
  console.log(`  → Unique products sold: ${Object.keys(itemsByProduct).length}`);
  console.log("  → Top selling products:");
  
  topProducts.forEach(product => {
    const quantity = itemsByProduct[product.id];
    console.log(`    • ${product.name}: ${quantity} units`);
  });

  // --- Show recent order activity ---
  const recentOrders = seededOrders.filter(order => 
    (Date.now() - order.createdAt.getTime()) < 7 * 24 * 60 * 60 * 1000
  ).length;
  
  const pendingOrders = statusCounts[OrderStatus.PENDING] || 0;
  const processingOrders = statusCounts[OrderStatus.PROCESSING] || 0;
  const shippedOrders = statusCounts[OrderStatus.SHIPPED] || 0;

  console.log("");
  console.log("• Recent activity:");
  console.log(`  → Orders in last 7 days: ${recentOrders}`);
  console.log(`  → Orders needing attention: ${pendingOrders + processingOrders} (pending: ${pendingOrders}, processing: ${processingOrders})`);
  console.log(`  → Orders in transit: ${shippedOrders}`);

  // --- Calculate order timing statistics ---
  const completedOrders = seededOrders.filter(o => 
    o.status === OrderStatus.COMPLETED || o.status === OrderStatus.DELIVERED
  );
  
  if (completedOrders.length > 0) {
    const avgFulfillmentTime = completedOrders.reduce((sum, order) => {
      const fulfillmentDays = Math.floor((Date.now() - order.createdAt.getTime()) / (1000 * 60 * 60 * 24));
      return sum + fulfillmentDays;
    }, 0) / completedOrders.length;

    console.log(`  → Average fulfillment time: ${avgFulfillmentTime.toFixed(1)} days`);
  }

  console.log("✅ Sample product orders seeded successfully.");

  return {
    orders: seededOrders,
    orderItems: seededOrderItems,
  };
}