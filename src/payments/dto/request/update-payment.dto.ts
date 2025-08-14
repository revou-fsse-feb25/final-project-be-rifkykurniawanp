// dto/request/update-payment.dto.ts
import { 
  IsOptional, 
  IsString, 
  IsIn,
  MaxLength,
  IsDateString
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePaymentDto {
  @ApiPropertyOptional({
    description: 'Payment status',
    example: 'completed',
    enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded']
  })
  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  @IsIn(['pending', 'completed', 'failed', 'cancelled', 'refunded'], {
    message: 'Status must be one of: pending, completed, failed, cancelled, refunded'
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Payment method used',
    example: 'credit_card',
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'e_wallet', 'cash']
  })
  @IsOptional()
  @IsString({ message: 'Payment method must be a string' })
  @MaxLength(50, { message: 'Payment method cannot exceed 50 characters' })
  @IsIn(['credit_card', 'debit_card', 'bank_transfer', 'e_wallet', 'cash'], {
    message: 'Payment method must be one of: credit_card, debit_card, bank_transfer, e_wallet, cash'
  })
  paymentMethod?: string;

  @ApiPropertyOptional({
    description: 'Payment completion date and time',
    example: '2024-01-15T14:30:00.000Z'
  })
  @IsOptional()
  @IsDateString({}, { message: 'Paid at must be a valid ISO date string' })
  paidAt?: string;
}

export class UpdatePaymentStatusDto {
  @ApiPropertyOptional({
    description: 'Payment status',
    example: 'completed',
    enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded']
  })
  @IsString({ message: 'Status must be a string' })
  @IsIn(['pending', 'completed', 'failed', 'cancelled', 'refunded'], {
    message: 'Status must be one of: pending, completed, failed, cancelled, refunded'
  })
  status: string;
}