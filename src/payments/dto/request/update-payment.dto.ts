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


export class UpdatePaymentDto {
  @ApiProperty({ 
    example: 150000.50, 
    description: 'Payment amount',
    required: false
  })
  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  @Min(0.01)
  @Transform(({ value }) => parseFloat(value))
  amount?: number;

  @ApiProperty({ 
    example: 'BANK_TRANSFER',
    description: 'Payment method',
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  paymentMethod?: string;

  @ApiProperty({ 
    enum: PaymentStatus, 
    example: PaymentStatus.COMPLETED,
    description: 'Payment status',
    required: false
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiProperty({ 
    example: '2025-08-15T12:00:00Z', 
    required: false,
    description: 'Timestamp when payment was completed'
  })
  @IsOptional()
  @IsDateString()
  paidAt?: string;
}