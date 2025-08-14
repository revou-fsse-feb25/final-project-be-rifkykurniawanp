// dto/response/payment-response.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentWithRelations } from '../../interface/payments.repository.interface';

export class UserInfoDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  email: string;

  @ApiPropertyOptional({ description: 'User first name', example: 'John' })
  firstName?: string;

  @ApiPropertyOptional({ description: 'User last name', example: 'Doe' })
  lastName?: string;
}

export class CartItemDto {
  @ApiProperty({ description: 'Cart item ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Item type', example: 'product' })
  itemType: string;

  @ApiProperty({ description: 'Item ID', example: 5 })
  itemId: number;

  @ApiProperty({ description: 'Quantity', example: 2 })
  quantity: number;

  @ApiProperty({ description: 'Price per item', example: 25000.50 })
  price: number;
}

export class CartInfoDto {
  @ApiProperty({ description: 'Cart ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Cart status', example: 'active' })
  status: string;

  @ApiProperty({ description: 'Cart items', type: [CartItemDto] })
  items: CartItemDto[];
}

export class ProductOrderInfoDto {
  @ApiProperty({ description: 'Order ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Order status', example: 'pending' })
  status: string;

  @ApiProperty({ description: 'Total price', example: 150000.50 })
  totalPrice: number;
}

export class CourseEnrollmentInfoDto {
  @ApiProperty({ description: 'Enrollment ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Course ID', example: 5 })
  courseId: number;

  @ApiProperty({ description: 'Price paid', example: 500000.00 })
  pricePaid: number;
}

export class PaymentResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the payment',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'User ID who made the payment',
    example: 1
  })
  userId: number;

  @ApiProperty({
    description: 'Cart ID associated with payment',
    example: 1
  })
  cartId: number;

  @ApiProperty({
    description: 'Payment amount',
    example: 150000.50
  })
  amount: number;

  @ApiProperty({
    description: 'Payment method used',
    example: 'credit_card'
  })
  paymentMethod: string;

  @ApiProperty({
    description: 'Payment status',
    example: 'completed'
  })
  status: string;

  @ApiProperty({
    description: 'Type of item being paid for',
    example: 'cart'
  })
  payableType: string;

  @ApiProperty({
    description: 'ID of the item being paid for',
    example: 1
  })
  payableId: number;

  @ApiPropertyOptional({
    description: 'Payment completion timestamp',
    example: '2024-01-15T14:30:00.000Z'
  })
  paidAt?: Date | null;

  @ApiProperty({
    description: 'Payment creation timestamp',
    example: '2024-01-15T10:30:00.000Z'
  })
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'User information',
    type: UserInfoDto
  })
  user?: UserInfoDto;

  @ApiPropertyOptional({
    description: 'Cart information',
    type: CartInfoDto
  })
  cart?: CartInfoDto;

  @ApiPropertyOptional({
    description: 'Product orders information',
    type: [ProductOrderInfoDto]
  })
  productOrders?: ProductOrderInfoDto[];

  @ApiPropertyOptional({
    description: 'Course enrollments information',
    type: [CourseEnrollmentInfoDto]
  })
  courseEnrollments?: CourseEnrollmentInfoDto[];

  constructor(payment: PaymentWithRelations) {
    this.id = payment.id;
    this.userId = payment.userId;
    this.cartId = payment.cartId;
    this.amount = Number(payment.amount);
    this.paymentMethod = payment.paymentMethod;
    this.status = payment.status;
    this.payableType = payment.payableType;
    this.payableId = payment.payableId;
    this.paidAt = payment.paidAt;
    this.createdAt = payment.createdAt;

    // Map relations if they exist
    if (payment.user) {
      this.user = {
        id: payment.user.id,
        email: payment.user.email,
        firstName: payment.user.firstName || undefined,
        lastName: payment.user.lastName || undefined
      };
    }

    if (payment.cart) {
      this.cart = {
        id: payment.cart.id,
        status: payment.cart.status,
        items: payment.cart.items.map(item => ({
          id: item.id,
          itemType: item.itemType,
          itemId: item.itemId,
          quantity: item.quantity,
          price: Number(item.price)
        }))
      };
    }

    if (payment.productOrders) {
      this.productOrders = payment.productOrders.map(order => ({
        id: order.id,
        status: order.status,
        totalPrice: Number(order.totalPrice)
      }));
    }

    if (payment.courseEnrollments) {
      this.courseEnrollments = payment.courseEnrollments.map(enrollment => ({
        id: enrollment.id,
        courseId: enrollment.courseId,
        pricePaid: Number(enrollment.pricePaid)
      }));
    }
  }
}