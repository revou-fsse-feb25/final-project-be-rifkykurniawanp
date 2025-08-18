import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PayableType } from '@prisma/client';
import { IsInt, IsOptional, IsEnum, Min } from 'class-validator';
import { Transform } from 'class-transformer';

// ================= MAIN PAYMENT RESPONSE DTO =================
export class PaymentResponseDto {
  @ApiProperty({ example: 1, description: 'Payment ID' })
  id: number;

  @ApiProperty({ example: 1, description: 'User ID who made the payment' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Cart ID associated with payment' })
  cartId: number;

  @ApiProperty({ example: 150000.50, description: 'Payment amount' })
  amount: number;

  @ApiProperty({ example: 'CREDIT_CARD', description: 'Payment method used' })
  paymentMethod: string;

  @ApiProperty({ 
    enum: PaymentStatus, 
    example: PaymentStatus.PENDING,
    description: 'Current payment status'
  })
  status: PaymentStatus;

  @ApiProperty({ 
    enum: PayableType, 
    example: PayableType.PRODUCT,
    description: 'Type of item being paid for'
  })
  payableType: PayableType;

  @ApiProperty({ example: 101, description: 'ID of the product or course being paid for' })
  payableId: number;

  @ApiProperty({ 
    example: '2025-08-15T12:00:00Z', 
    nullable: true,
    description: 'Timestamp when payment was completed'
  })
  paidAt: string | null;

  @ApiProperty({ 
    example: '2025-08-15T10:00:00Z',
    description: 'Timestamp when payment was created'
  })
  createdAt: string;

  // Optional nested objects
  @ApiProperty({ 
    required: false,
    description: 'User information (included when requested)'
  })
  user?: UserSummaryDto;

  @ApiProperty({ 
    required: false,
    description: 'Cart information (included when requested)'
  })
  cart?: CartSummaryDto;

  @ApiProperty({ 
    required: false,
    description: 'Product information (included when payableType is PRODUCT)'
  })
  product?: ProductSummaryDto;

  @ApiProperty({ 
    required: false,
    description: 'Course information (included when payableType is COURSE)'
  })
  course?: CourseSummaryDto;
}

// ================= NESTED SUMMARY DTOs =================
export class UserSummaryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'John', nullable: true })
  firstName: string | null;

  @ApiProperty({ example: 'Doe', nullable: true })
  lastName: string | null;
}

export class CartSummaryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2025-08-15T09:00:00Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-08-15T10:00:00Z' })
  updatedAt: string;

  @ApiProperty({ example: 3, description: 'Total items in cart' })
  totalItems?: number;
}

export class ProductSummaryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'premium-arabica-coffee' })
  slug: string;

  @ApiProperty({ example: 'Premium Arabica Coffee' })
  name: string;

  @ApiProperty({ example: 125000.00 })
  price: number;

  @ApiProperty({ example: 'COFFEE' })
  category: string;

  @ApiProperty({ example: 'ACTIVE' })
  status: string;
}

export class CourseSummaryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'coffee-brewing-masterclass' })
  slug: string;

  @ApiProperty({ example: 'Coffee Brewing Masterclass' })
  title: string;

  @ApiProperty({ example: 299000.00 })
  price: number;

  @ApiProperty({ example: 'COFFEE_BREWING' })
  category: string;

  @ApiProperty({ example: 'INTERMEDIATE' })
  level: string;
}

// ================= QUERY DTO =================
export class PaymentQueryDto {
  @ApiProperty({ 
    required: false, 
    example: 1,
    description: 'Filter by user ID'
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  userId?: number;

  @ApiProperty({ 
    enum: PaymentStatus, 
    required: false,
    description: 'Filter by payment status'
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiProperty({ 
    enum: PayableType, 
    required: false,
    description: 'Filter by payable type'
  })
  @IsOptional()
  @IsEnum(PayableType)
  payableType?: PayableType;

  @ApiProperty({ 
    required: false, 
    example: 1, 
    minimum: 1,
    description: 'Page number for pagination'
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @ApiProperty({ 
    required: false, 
    example: 10, 
    minimum: 1, 
    maximum: 100,
    description: 'Number of items per page'
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @ApiProperty({ 
    required: false,
    example: '2025-08-01T00:00:00Z',
    description: 'Filter payments from this date'
  })
  @IsOptional()
  startDate?: string;

  @ApiProperty({ 
    required: false,
    example: '2025-08-31T23:59:59Z',
    description: 'Filter payments until this date'
  })
  @IsOptional()
  endDate?: string;
}

// ================= PAGINATED RESPONSE DTO =================
export class PaginatedPaymentResponseDto {
  @ApiProperty({ 
    type: [PaymentResponseDto],
    description: 'Array of payment records'
  })
  data: PaymentResponseDto[];

  @ApiProperty({ example: 150, description: 'Total number of records' })
  total: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ example: 15, description: 'Total number of pages' })
  totalPages: number;

  @ApiProperty({ example: true, description: 'Whether there is a next page' })
  hasNext: boolean;

  @ApiProperty({ example: false, description: 'Whether there is a previous page' })
  hasPrev: boolean;
}

// ================= STATS DTO =================
export class PaymentStatsDto {
  @ApiProperty({ 
    example: 5000000.00,
    description: 'Total revenue from completed payments'
  })
  totalAmount: number;

  @ApiProperty({ 
    example: 150,
    description: 'Total number of payments'
  })
  totalPayments: number;

  @ApiProperty({ 
    example: 120,
    description: 'Number of completed payments'
  })
  completedPayments: number;

  @ApiProperty({ 
    example: 20,
    description: 'Number of pending payments'
  })
  pendingPayments: number;

  @ApiProperty({ 
    example: 5,
    description: 'Number of processing payments'
  })
  processingPayments: number;

  @ApiProperty({ 
    example: 5,
    description: 'Number of failed payments'
  })
  failedPayments: number;

  @ApiProperty({ 
    example: 0,
    description: 'Number of cancelled payments'
  })
  cancelledPayments: number;

  @ApiProperty({ 
    example: 80.0,
    description: 'Success rate percentage'
  })
  successRate: number;

  @ApiProperty({ 
    example: 41666.67,
    description: 'Average payment amount'
  })
  averageAmount: number;
}

// ================= PAYMENT SUMMARY DTO =================
export class PaymentSummaryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 150000.50 })
  amount: number;

  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.COMPLETED })
  status: PaymentStatus;

  @ApiProperty({ example: 'CREDIT_CARD' })
  paymentMethod: string;

  @ApiProperty({ example: '2025-08-15T12:00:00Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-08-15T12:30:00Z', nullable: true })
  paidAt: string | null;
}