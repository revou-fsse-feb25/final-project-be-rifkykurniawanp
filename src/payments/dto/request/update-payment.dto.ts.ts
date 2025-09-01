import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsPositive, IsOptional, IsDateString } from 'class-validator';
import { PaymentStatus } from '@prisma/client';

export class UpdatePaymentDto {
  @ApiProperty({ example: 80000, description: 'Updated payment amount', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;

  @ApiProperty({ example: 'bank_transfer', description: 'Updated payment method', required: false })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiProperty({ enum: PaymentStatus, example: 'COMPLETED', required: false })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  paidAt?: Date;
}