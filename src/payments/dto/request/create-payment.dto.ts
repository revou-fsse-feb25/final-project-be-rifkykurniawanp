import { 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  IsDecimal, 
  IsPositive,
  Min,
  MaxLength,
  IsIn
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID of the user making the payment',
    example: 1
  })
  @IsNotEmpty({ message: 'User ID is required' })
  @IsNumber({}, { message: 'User ID must be a number' })
  @IsPositive({ message: 'User ID must be positive' })
  userId: number;

  @ApiProperty({
    description: 'ID of the cart being paid for',
    example: 1
  })
  @IsNotEmpty({ message: 'Cart ID is required' })
  @IsNumber({}, { message: 'Cart ID must be a number' })
  @IsPositive({ message: 'Cart ID must be positive' })
  cartId: number;

  @ApiProperty({
    description: 'Payment amount',
    example: 150000.50
  })
  @IsNotEmpty({ message: 'Amount is required' })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Amount must be a valid decimal number with up to 2 decimal places' })
  @IsPositive({ message: 'Amount must be positive' })
  amount: number;

  @ApiProperty({
    description: 'Payment method used',
    example: 'credit_card',
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'e_wallet', 'cash']
  })
  @IsNotEmpty({ message: 'Payment method is required' })
  @IsString({ message: 'Payment method must be a string' })
  @MaxLength(50, { message: 'Payment method cannot exceed 50 characters' })
  @IsIn(['credit_card', 'debit_card', 'bank_transfer', 'e_wallet', 'cash'], {
    message: 'Payment method must be one of: credit_card, debit_card, bank_transfer, e_wallet, cash'
  })
  paymentMethod: string;

  @ApiProperty({
    description: 'Type of item being paid for',
    example: 'cart',
    enum: ['cart', 'product', 'course']
  })
  @IsNotEmpty({ message: 'Payable type is required' })
  @IsString({ message: 'Payable type must be a string' })
  @MaxLength(20, { message: 'Payable type cannot exceed 20 characters' })
  @IsIn(['cart', 'product', 'course'], {
    message: 'Payable type must be one of: cart, product, course'
  })
  payableType: string;

  @ApiProperty({
    description: 'ID of the item being paid for',
    example: 1
  })
  @IsNotEmpty({ message: 'Payable ID is required' })
  @IsNumber({}, { message: 'Payable ID must be a number' })
  @IsPositive({ message: 'Payable ID must be positive' })
  payableId: number;
}