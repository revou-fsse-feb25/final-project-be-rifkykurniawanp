import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive, IsDecimal } from 'class-validator';
import { CartItemType } from '@prisma/client';

export class AddItemToCartDto {
  @ApiProperty({ enum: CartItemType, example: 'PRODUCT' })
  @IsEnum(CartItemType)
  itemType: CartItemType;

  @ApiProperty({ example: 1, description: 'Product or Course ID' })
  @IsNumber()
  @IsPositive()
  itemId: number;

  @ApiProperty({ example: 2, description: 'Quantity of the item' })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ example: 25000, description: 'Price per unit' })
  @IsNumber()
  @IsPositive()
  price: number;
}