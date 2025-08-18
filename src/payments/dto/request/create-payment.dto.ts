import { 
  IsInt, 
  IsDecimal, 
  IsEnum, 
  IsOptional, 
  IsString, 
  IsDateString,
  Min,
  Length,
  IsPositive
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PayableType } from '@prisma/client';
import { Transform } from 'class-transformer';

// ================= CREATE PAYMENT DTO =================
export class CreatePaymentDto {
  @ApiProperty({ 
    example: 1, 
    description: 'ID of the user making the payment',
    minimum: 1 
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ 
    example: 1, 
    description: 'ID of the cart being paid for',
    minimum: 1 
  })
  @IsInt()
  @IsPositive()
  cartId: number;

  @ApiProperty({ 
    example: 150000.50, 
    description: 'Payment amount (matches Decimal(12,2) from schema)',
    minimum: 0.01
  })
  @IsDecimal({ decimal_digits: '2' })
  @Min(0.01, { message: 'Amount must be greater than 0' })
  @Transform(({ value }) => parseFloat(value))
  amount: number;

  @ApiProperty({ 
    example: 'CREDIT_CARD',
    description: 'Payment method used',
    examples: ['CREDIT_CARD', 'BANK_TRANSFER', 'E_WALLET', 'CASH_ON_DELIVERY']
  })
  @IsString()
  @Length(1, 100, { message: 'Payment method must be between 1 and 100 characters' })
  paymentMethod: string;

  @ApiProperty({ 
    enum: PaymentStatus, 
    example: PaymentStatus.PENDING,
    description: 'Payment status - defaults to PENDING if not provided'
  })
  @IsEnum(PaymentStatus, { message: 'Invalid payment status' })
  @IsOptional()
  status?: PaymentStatus;

  @ApiProperty({ 
    enum: PayableType, 
    example: PayableType.PRODUCT,
    description: 'Type of item being paid for (PRODUCT or COURSE)'
  })
  @IsEnum(PayableType, { message: 'Invalid payable type' })
  payableType: PayableType;

  @ApiProperty({ 
    example: 101,
    description: 'ID of the product or course being paid for',
    minimum: 1
  })
  @IsInt()
  @IsPositive()
  payableId: number;

  @ApiProperty({ 
    example: '2025-08-15T12:00:00Z', 
    required: false,
    description: 'Timestamp when payment was completed (ISO 8601 format)'
  })
  @IsOptional()
  @IsDateString({}, { message: 'paidAt must be a valid ISO 8601 date string' })
  paidAt?: string;
}
