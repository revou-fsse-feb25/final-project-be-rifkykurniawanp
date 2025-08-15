import { IsInt, IsDecimal, IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PayableType } from '@prisma/client';

export class CreatePaymentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  cartId: number;

  @ApiProperty({ example: 100000.00 })
  amount: number;

  @ApiProperty({ example: 'CREDIT_CARD' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.PENDING })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({ enum: PayableType, example: PayableType.PRODUCT })
  @IsEnum(PayableType)
  payableType: PayableType;

  @ApiProperty({ example: 101 })
  @IsInt()
  payableId: number;

  @ApiProperty({ example: '2025-08-15T12:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  paidAt?: string;
}
