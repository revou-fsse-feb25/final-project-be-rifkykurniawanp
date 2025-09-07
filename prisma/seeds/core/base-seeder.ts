import { PrismaClient, Prisma } from '@prisma/client';
import { SeedResult, SeedStats, RollbackResult } from './seed-result';
import { SeedContext, SeederConfig, CartItemMix, PaymentSplitResult } from './seed-context';

export abstract class BaseSeeder {
  protected prisma: PrismaClient;
  protected context: SeedContext;
  protected config: SeederConfig;
  protected stats: SeedStats;

  constructor(prisma: PrismaClient, context: SeedContext, config: SeederConfig) {
    this.prisma = prisma;
    this.context = context;
    this.config = config;
    this.stats = {
      totalSeeded: 0,
      totalSkipped: 0,
      totalErrors: 0,
      startTime: new Date(),
    };
  }

  // Abstract methods that must be implemented
  abstract seed(): Promise<SeedResult>;
  abstract rollback?(): Promise<RollbackResult>;

  // Template method pattern - defines the seeding workflow
  async execute(): Promise<SeedResult> {
    this.logInfo(`Starting seeder: ${this.config.name}`);
    this.stats.startTime = new Date();

    try {
      // Pre-seed validation
      const validation = await this.validate();
      if (!validation.success) {
        return validation;
      }

      // Check environment compatibility
      if (!this.isEnvironmentSupported()) {
        const message = `Seeder not supported in ${this.context.environment} environment`;
        this.logWarning(message);
        return { success: true, message, count: 0 };
      }

      // Execute the actual seeding
      const result = await this.executeWithTransaction();
      
      // Post-seed cleanup and stats
      this.stats.endTime = new Date();
      this.stats.duration = this.stats.endTime.getTime() - this.stats.startTime.getTime();
      
      this.logSuccess(`Completed seeder: ${this.config.name}`, {
        duration: `${this.stats.duration}ms`,
        seeded: this.stats.totalSeeded,
        skipped: this.stats.totalSkipped,
      });

      return {
        ...result,
        duration: this.stats.duration,
      };

    } catch (error) {
      return this.handleError(error, 'execute seeder');
    }
  }

  // Transaction wrapper for atomic operations
  private async executeWithTransaction(): Promise<SeedResult> {
    if (this.context.transaction) {
      return await this.seed();
    }

    return await this.prisma.$transaction(async (tx) => {
      this.context.transaction = tx;
      const result = await this.seed();
      this.context.transaction = undefined;
      return result;
    });
  }

  // Validation before seeding
  protected async validate(): Promise<SeedResult> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      
      for (const dependency of this.config.dependencies) {
        const isResolved = await this.checkDependency(dependency);
        if (!isResolved) {
          return {
            success: false,
            message: `Dependency not met: ${dependency}`,
            error: `Required seeder '${dependency}' must run first`,
          };
        }
      }

      return { success: true, message: 'Validation passed' };
    } catch (error) {
      return this.handleError(error, 'validate seeder');
    }
  }

  protected async checkDependency(dependency: string): Promise<boolean> {
    return true; // Managed by orchestrator
  }

  protected isEnvironmentSupported(): boolean {
    return this.config.environment.includes(this.context.environment);
  }

  protected getClient(): PrismaClient | Prisma.TransactionClient {
    return this.context.transaction || this.prisma;
  }

  // Utility methods
  protected async processBatch<T, R>(
    items: T[],
    processor: (batch: T[]) => Promise<R[]>,
    batchSize: number = this.context.batchSize
  ): Promise<R[]> {
    const results: R[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await processor(batch);
      results.push(...batchResults);
      
      this.logInfo(`Processed batch ${Math.ceil((i + batchSize) / batchSize)} of ${Math.ceil(items.length / batchSize)}`);
    }

    return results;
  }

  protected async safeUpsert<T>(
    model: any,
    data: any,
    where: any,
    conflictMessage?: string
  ): Promise<T | null> {
    try {
      if (this.context.skipDuplicates) {
        const existing = await model.findUnique({ where });
        if (existing) {
          this.stats.totalSkipped++;
          this.logDebug(`Skipped duplicate: ${conflictMessage || JSON.stringify(where)}`);
          return existing;
        }
      }

      const created = await model.create({ data });
      this.stats.totalSeeded++;
      return created;
    } catch (error) {
      if (error.code === 'P2002') {
        this.stats.totalSkipped++;
        this.logDebug(`Skipped duplicate: ${conflictMessage || error.message}`);
        return null;
      }
      throw error;
    }
  }

  protected handleError(error: any, operation: string): SeedResult {
    this.stats.totalErrors++;
    const message = `Failed to ${operation}: ${error.message}`;
    this.logError(message, error);
    
    return {
      success: false,
      message,
      error: error.message,
      count: this.stats.totalSeeded,
    };
  }

  // Logging methods
  protected logInfo(message: string, data?: any) {
    if (this.context.logging) {
      console.log(`ℹ️  [${this.config.name}] ${message}`, data || '');
    }
  }

  protected logSuccess(message: string, data?: any) {
    if (this.context.logging) {
      console.log(`✅ [${this.config.name}] ${message}`, data || '');
    }
  }

  protected logWarning(message: string, data?: any) {
    if (this.context.logging) {
      console.warn(`⚠️  [${this.config.name}] ${message}`, data || '');
    }
  }

  protected logError(message: string, error?: any) {
    if (this.context.logging) {
      console.error(`❌ [${this.config.name}] ${message}`, error || '');
    }
  }

  protected logDebug(message: string, data?: any) {
    if (this.context.logging && process.env.DEBUG_SEEDING === 'true') {
      console.debug(`🐛 [${this.config.name}] ${message}`, data || '');
    }
  }

  // Random data helpers
  protected randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  protected randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  protected randomDecimal(min: number, max: number, decimals: number = 2): number {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(decimals));
  }

  // Mixed cart business logic helpers
  protected createMixedCartItems(products: any[], courses: any[]): CartItemMix {
    const cartItems: CartItemMix = { products: [], courses: [] };
    const shouldHaveMixedCart = Math.random() < this.context.mixedCartRatio;
    
    const addProducts = Math.random() > 0.5 || !shouldHaveMixedCart;
    const addCourses = shouldHaveMixedCart || !addProducts;
    
    if (addProducts && products.length > 0) {
      const productCount = this.randomInt(1, Math.min(3, products.length));
      const selectedProducts = this.shuffleArray(products).slice(0, productCount);
      
      cartItems.products = selectedProducts.map(product => ({
        id: product.id,
        quantity: this.randomInt(1, 3),
        price: product.price
      }));
    }
    
    if (addCourses && courses.length > 0) {
      const courseCount = this.randomInt(1, Math.min(2, courses.length));
      const selectedCourses = this.shuffleArray(courses).slice(0, courseCount);
      
      cartItems.courses = selectedCourses.map(course => ({
        id: course.id,
        price: course.price
      }));
    }
    
    return cartItems;
  }

  protected calculateCartTotal(cartMix: CartItemMix): number {
    const productTotal = cartMix.products.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0);
    const courseTotal = cartMix.courses.reduce((sum, item) => 
      sum + item.price, 0);
    
    return productTotal + courseTotal;
  }

  protected async processPaymentWithSplitFulfillment(
    userId: number, 
    cartId: number, 
    cartMix: CartItemMix,
    paymentMethod: string = 'credit_card'
  ): Promise<PaymentSplitResult> {
    const client = this.getClient();
    const totalAmount = this.calculateCartTotal(cartMix);
    
    const payment = await client.payment.create({
      data: {
        userId,
        cartId,
        amount: totalAmount,
        paymentMethod,
        status: 'COMPLETED',
        paidAt: new Date(),
        transactionId: this.generateTransactionId(),
      }
    });

    const result: PaymentSplitResult = {
      payment,
      productOrders: [],
      courseEnrollments: [],
      totalAmount
    };

    if (cartMix.products.length > 0) {
      const productOrder = await client.productOrder.create({
        data: {
          buyerId: userId,
          paymentId: payment.id,
          totalPrice: cartMix.products.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          status: 'PENDING',
          items: {
            create: cartMix.products.map(item => ({
              productId: item.id,
              quantity: item.quantity,
              priceEach: item.price
            }))
          }
        },
        include: { items: true }
      });
      
      result.productOrders.push(productOrder);
    }

    if (cartMix.courses.length > 0) {
      const enrollments = await Promise.all(
        cartMix.courses.map(async (course) => {
          return await client.courseEnrollment.create({
            data: {
              courseId: course.id,
              studentId: userId,
              paymentId: payment.id,
              pricePaid: course.price,
              enrolledAt: new Date(),
            }
          });
        })
      );
      
      result.courseEnrollments.push(...enrollments);
    }

    return result;
  }

  protected generateTransactionId(): string {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  protected shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  protected randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  protected daysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }

  protected daysFromNow(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
}