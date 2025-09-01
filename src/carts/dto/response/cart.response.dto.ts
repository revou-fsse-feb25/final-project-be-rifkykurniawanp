import { ApiProperty } from '@nestjs/swagger';
import { CartItemResponseDto } from './cart-item.response.dto';

export class UserBasicDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  lastName?: string;
}

export class CartResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ type: UserBasicDto })
  user?: UserBasicDto;

  @ApiProperty({ type: [CartItemResponseDto] })
  items: CartItemResponseDto[];

  @ApiProperty({ example: 3, description: 'Total number of items in cart' })
  totalItems: number;

  @ApiProperty({ example: 75000, description: 'Total amount of all items' })
  totalAmount: number;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  updatedAt: Date;
}
