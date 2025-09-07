import { PrismaClient, Prisma } from '@prisma/client';

export interface SeedContext {
  prisma: PrismaClient;
  transaction?: Prisma.TransactionClient;
  environment: 'development' | 'staging' | 'production' | 'test';
  skipDuplicates: boolean;
  batchSize: number;
  logging: boolean;
  mixedCartRatio: number; // Percentage of carts with both products and courses (0-1)
  averageCartSize: number; // Average items per cart
}

export interface SeederConfig {
  name: string;
  description?: string;
  dependencies: string[];
  environment: string[];
  rollbackSupported: boolean;
}

export interface SeedPhase {
  name: string;
  order: number;
  seeders: string[];
  parallel: boolean;
  required: boolean;
}

export interface CartItemMix {
  products: Array<{ id: number; quantity: number; price: number }>;
  courses: Array<{ id: number; price: number }>;
}

export interface PaymentSplitResult {
  payment: any;
  productOrders: any[];
  courseEnrollments: any[];
  totalAmount: number;
}