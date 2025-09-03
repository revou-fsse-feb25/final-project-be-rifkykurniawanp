// prisma/seeds/sample/payments.ts
import {
  PrismaClient,
  Payment,
  PaymentStatus,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

/**
 * SAMPLE PAYMENTS
 * - Creates payments for existing carts with items
 * - Various payment statuses and methods
 * - Realistic payment timing and amounts
 * - Idempotent with detailed tracking
 */
export async function seedPayments(): Promise<Payment[]> {
  console.log("💳 Seeding sample payments...");

  // --- Pre-check: carts with items exist ---
  const cartsWithItems = await prisma.cart.findMany({
    where: {
      items: {
        some: {} // Has at least one item
      }
    },
    include: {
      user: {
        select: { id: true, email: true, firstName: true, lastName: true }
      },
      items: {
        include: {
          product: { select: { name: true, price: true } },
          course: { select: { title: true, price: true } }
        }
      }
    },
  });

  if (cartsWithItems.length === 0) {
    console.warn("⚠️ No carts with items found. Please seed carts first.");
    return [];
  }

  // --- Payment method options ---
  const paymentMethods = [
    "Credit Card",
    "Bank Transfer", 
    "E-Wallet (GoPay)",
    "E-Wallet (OVO)",
    "E-Wallet (Dana)",
    "Virtual Account (BCA)",
    "Virtual Account (Mandiri)",
    "QRIS",
  ];

  // --- Payment status scenarios ---
  const paymentScenarios = [
    { status: PaymentStatus.COMPLETED, weight: 0.6 }, // 60% completed
    { status: PaymentStatus.PENDING, weight: 0.2 },   // 20% pending
    { status: PaymentStatus.PROCESSING, weight: 0.1 }, // 10% processing
    { status: PaymentStatus.FAILED, weight: 0.05 },    // 5% failed
    { status: PaymentStatus.CANCELLED, weight: 0.04 },  // 4% cancelled
    { status: PaymentStatus.REFUNDED, weight: 0.01 },   // 1% refunded
  ];

  // --- Generate payment status for each cart ---
  const seededPayments: Payment[] = [];
  const paymentStats: string[] = [];
  const statusCounts: Record<PaymentStatus, number> = {} as Record<PaymentStatus, number>;
  const methodCounts: Record<string, number> = {};

  for (const cart of cartsWithItems) {
    // Calculate total cart amount
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + (Number(item.priceSnapshot) * item.quantity);
    }, 0);

    if (totalAmount === 0) {
      console.warn(`⚠️ Cart ${cart.id} has zero total amount, skipping...`);
      continue;
    }

    // Determine payment status using weighted random selection
    let randomValue = Math.random();
    let selectedStatus: PaymentStatus = PaymentStatus.COMPLETED;
    
    for (const scenario of paymentScenarios) {
      if (randomValue <= scenario.weight) {
        selectedStatus = scenario.status;
        break;
      }
      randomValue -= scenario.weight;
    }

    // Random payment method
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

    // Generate transaction ID (simulate external payment provider)
    const transactionId = selectedStatus !== PaymentStatus.PENDING 
      ? `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      : null;

    // Calculate payment timing based on status
    const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Last 30 days
    let paidAt: Date | null = null;

    if (selectedStatus === PaymentStatus.COMPLETED || selectedStatus === PaymentStatus.REFUNDED) {
      // Completed payments: paid within hours/days of creation
      paidAt = new Date(createdAt.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000);
    } else if (selectedStatus === PaymentStatus.PROCESSING) {
      // Processing payments: might be paid recently
      if (Math.random() > 0.5) {
        paidAt = new Date(createdAt.getTime() + Math.random() * 24 * 60 * 60 * 1000);
      }
    }

    // --- Check for existing payment ---
    const existingPayment = await prisma.payment.findFirst({
      where: {
        userId: cart.userId,
        cartId: cart.id,
      },
      select: { id: true },
    });

    const payment = await prisma.payment.upsert({
      where: {
        id: existingPayment?.id || -1,
      },
      update: {
        amount: new Prisma.Decimal(totalAmount),
        paymentMethod: paymentMethod,
        status: selectedStatus,
        transactionId: transactionId,
        paidAt: paidAt,
        updatedAt: new Date(),
      },
      create: {
        userId: cart.userId,
        cartId: cart.id,
        amount: new Prisma.Decimal(totalAmount),
        paymentMethod: paymentMethod,
        status: selectedStatus,
        transactionId: transactionId,
        paidAt: paidAt,
        createdAt: createdAt,
      },
    });

    seededPayments.push(payment);

    // Track statistics
    statusCounts[selectedStatus] = (statusCounts[selectedStatus] || 0) + 1;
    methodCounts[paymentMethod] = (methodCounts[paymentMethod] || 0) + 1;

    paymentStats.push(
      existingPayment 
        ? `Updated payment: ${cart.user.firstName} ${cart.user.lastName} - ${selectedStatus} - Rp ${totalAmount.toLocaleString()}`
        : `Created payment: ${cart.user.firstName} ${cart.user.lastName} - ${selectedStatus} - Rp ${totalAmount.toLocaleString()}`
    );
  }

  // --- Calculate summary statistics ---
  const totalRevenue = seededPayments
    .filter(p => p.status === PaymentStatus.COMPLETED)
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const avgPaymentAmount = seededPayments.length > 0 
    ? seededPayments.reduce((sum, p) => sum + Number(p.amount), 0) / seededPayments.length
    : 0;

  const completionRate = seededPayments.length > 0 
    ? ((statusCounts[PaymentStatus.COMPLETED] || 0) / seededPayments.length * 100)
    : 0;

  const failureRate = seededPayments.length > 0 
    ? (((statusCounts[PaymentStatus.FAILED] || 0) + (statusCounts[PaymentStatus.CANCELLED] || 0)) / seededPayments.length * 100)
    : 0;

  // --- Console Summary ---
  console.log("——— Payments Seeding Summary ———");
  console.log(`• Carts with items: ${cartsWithItems.length}`);
  console.log(`• Payments created/updated: ${seededPayments.length}`);
  console.log("");
  console.log("• Payment status distribution:");
  Object.entries(statusCounts).forEach(([status, count]) => {
    const percentage = ((count / seededPayments.length) * 100).toFixed(1);
    console.log(`  → ${status}: ${count} (${percentage}%)`);
  });
  console.log("");
  console.log("• Payment method distribution:");
  Object.entries(methodCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .forEach(([method, count]) => {
      const percentage = ((count / seededPayments.length) * 100).toFixed(1);
      console.log(`  → ${method}: ${count} (${percentage}%)`);
    });
  console.log("");
  console.log("• Financial metrics:");
  console.log(`  → Total revenue (completed): Rp ${totalRevenue.toLocaleString()}`);
  console.log(`  → Average payment amount: Rp ${avgPaymentAmount.toLocaleString()}`);
  console.log(`  → Payment completion rate: ${completionRate.toFixed(1)}%`);
  console.log(`  → Payment failure rate: ${failureRate.toFixed(1)}%`);
  console.log("");
  console.log("• Payment timing:");
  const recentPayments = seededPayments.filter(p => 
    p.paidAt && (Date.now() - p.paidAt.getTime()) < 7 * 24 * 60 * 60 * 1000
  ).length;
  console.log(`  → Payments in last 7 days: ${recentPayments}`);
  
  const pendingAmount = seededPayments
    .filter(p => p.status === PaymentStatus.PENDING)
    .reduce((sum, p) => sum + Number(p.amount), 0);
  console.log(`  → Pending payment value: Rp ${pendingAmount.toLocaleString()}`);

  console.log("✅ Sample payments seeded successfully.");
  return seededPayments;
}