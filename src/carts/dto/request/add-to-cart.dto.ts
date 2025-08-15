import { IsInt, IsEnum, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CartItemType } from '@prisma/client';

export class AddToCartDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ enum: CartItemType, example: CartItemType.PRODUCT })
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
