import { ApiProperty } from "@nestjs/swagger";

export class PaymentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({
    example: { id: 1, name: "John Doe", email: "john@example.com" },
    nullable: true,
  })
  user: {
    id: number;
    name: string;
    email: string;
  } | null;

  @ApiProperty({
    example: { id: 12, totalAmount: 50000 },
    nullable: true,
  })
  cart: {
    id: number;
    totalAmount: number;
  } | null;

  @ApiProperty({ example: 50000 })
  amount: number;

  @ApiProperty({ example: "PENDING" })
  status: string;

  @ApiProperty({ example: "CREDIT_CARD" })
  paymentMethod: string;

  @ApiProperty({ example: "ORDER" })
  payableType: string;

  @ApiProperty({ example: 45 })
  payableId: number;

  @ApiProperty({ example: "2025-08-19T10:00:00.000Z", nullable: true })
  paidAt: Date | null;

  @ApiProperty({ example: "2025-08-19T09:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ example: "2025-08-19T09:30:00.000Z" })
  updatedAt: Date;

  constructor(payment: any) {
    this.id = payment.id;
    this.user = payment.user
      ? {
          id: payment.user.id,
          name: payment.user.name,
          email: payment.user.email,
        }
      : null;
    this.cart = payment.cart
      ? {
          id: payment.cart.id,
          totalAmount: payment.cart.totalAmount,
        }
      : null;
    this.amount = payment.amount;
    this.status = payment.status;
    this.paymentMethod = payment.paymentMethod;
    this.payableType = payment.payableType;
    this.payableId = payment.payableId;
    this.paidAt = payment.paidAt;
    this.createdAt = payment.createdAt;
    this.updatedAt = payment.updatedAt;
  }
}
