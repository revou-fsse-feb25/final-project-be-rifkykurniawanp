import { ApiProperty } from '@nestjs/swagger';
import { CartItemType } from '@prisma/client';

export class CartResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'ACTIVE' })
  status: string;

  @ApiProperty({ type: () => [CartItemResponseDto] })
  items: CartItemResponseDto[];
}

export class CartItemResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ enum: CartItemType })
  itemType: CartItemType;

  @ApiProperty({ example: 101 })
  itemId: number;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 100000.00 })
  price: number;
}
