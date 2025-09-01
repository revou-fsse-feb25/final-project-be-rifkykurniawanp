import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsPositive, IsOptional, IsDateString } from 'class-validator';
import { PaymentStatus, PayableType } from '@prisma/client';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'User ID making the payment' })
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiProperty({ example: 1, description: 'Cart ID being paid for' })
  @IsNumber()
  @IsPositive()
  cartId: number;

  @ApiProperty({ example: 75000, description: 'Payment amount' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: 'credit_card', description: 'Payment method used' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ enum: PaymentStatus, example: 'PENDING', required: false })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiProperty({ enum: PayableType, example: 'PRODUCT' })
  @IsEnum(PayableType)
  payableType: PayableType;

  @ApiProperty({ example: 1, description: 'ID of the payable item (product or course)' })
  @IsNumber()
  @IsPositive()
  payableId: number;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  paidAt?: Date;
}
