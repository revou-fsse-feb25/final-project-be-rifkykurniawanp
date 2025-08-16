import { IsInt, IsEnum, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CartItemType {
  PRODUCT = 'PRODUCT',
  COURSE = 'COURSE',
}

export class AddToCartDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 'PRODUCT', enum: CartItemType })
  @IsEnum(CartItemType)
  itemType: CartItemType;

  @ApiProperty({ example: 101 })
  @IsInt()
  itemId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  quantity: number;

  @ApiProperty({ example: 100000.00 })
  price: number;
}
