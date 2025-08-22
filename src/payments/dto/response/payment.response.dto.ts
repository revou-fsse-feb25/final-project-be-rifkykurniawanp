import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PayableType } from '@prisma/client';

export class UserBasicDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  lastName?: string;
}

export class CartBasicDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 3 })
  totalItems: number;

  @ApiProperty({ example: 75000 })
  totalAmount: number;
}

export class ProductOrderDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 75000 })
  totalPrice: number;

  @ApiProperty({ example: 'COMPLETED' })
  status: string;

  @ApiProperty({ example: 2 })
  itemCount: number;
}

export class CourseEnrollmentDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  courseId: number;

  @ApiProperty({ example: 'Coffee Brewing Masterclass' })
  courseName?: string;

  @ApiProperty({ example: 150000 })
  pricePaid: number;

  @ApiProperty({ example: 75 })
  progress: number;
}

export class PaymentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  cartId: number;

  @ApiProperty({ example: 75000 })
  amount: number;

  @ApiProperty({ example: 'credit_card' })
  paymentMethod: string;

  @ApiProperty({ enum: PaymentStatus, example: 'COMPLETED' })
  status: PaymentStatus;

  @ApiProperty({ enum: PayableType, example: 'PRODUCT' })
  payableType: PayableType;

  @ApiProperty({ example: 1 })
  payableId: number;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  paidAt?: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: Date;

  @ApiProperty({ type: UserBasicDto })
  user?: UserBasicDto;

  @ApiProperty({ type: CartBasicDto })
  cart?: CartBasicDto;

  @ApiProperty({ type: [ProductOrderDto] })
  productOrders: ProductOrderDto[];

  @ApiProperty({ type: [CourseEnrollmentDto] })
  courseEnrollments: CourseEnrollmentDto[];
}