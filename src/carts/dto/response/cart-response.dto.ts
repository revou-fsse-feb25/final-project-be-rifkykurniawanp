import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty({ example: 1, description: 'ID of the cart item' })
  id: number;

  @ApiProperty({ example: 'product', description: 'Type of the item (product or course)' })
  itemType: string;

  @ApiProperty({ example: 101, description: 'ID of the related product or course' })
  itemId: number;

  @ApiProperty({ example: 2, description: 'Quantity of the item in the cart' })
  quantity: number;

  @ApiProperty({ example: 150000.00, description: 'Price of a single item' })
  price: number;
}

export class CartResponseDto {
  @ApiProperty({ example: 1, description: 'ID of the cart' })
  id: number;

  @ApiProperty({ example: 5, description: 'User ID who owns the cart' })
  userId: number;

  @ApiProperty({ example: 'active', description: 'Current status of the cart' })
  status: string;

  @ApiProperty({
    type: [CartItemDto],
    description: 'List of items in the cart',
  })
  items: CartItemDto[];

  @ApiProperty({
    example: '2025-08-14T12:34:56.000Z',
    description: 'Date when the cart was created',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;
}
