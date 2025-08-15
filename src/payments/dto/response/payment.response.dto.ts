import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PayableType } from '@prisma/client';

export class PaymentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  cartId: number;

  @ApiProperty({ example: 100000.00 })
  amount: number;

  @ApiProperty({ example: 'CREDIT_CARD' })
  paymentMethod: string;

  @ApiProperty({ enum: PaymentStatus })
  status: PaymentStatus;

  @ApiProperty({ enum: PayableType })
  payableType: PayableType;

  @ApiProperty({ example: 101 })
  payableId: number;

  @ApiProperty({ example: '2025-08-15T12:00:00Z', required: false })
  paidAt?: string;

  @ApiProperty({ example: '2025-08-15T12:00:00Z' })
  createdAt: Date;
}
