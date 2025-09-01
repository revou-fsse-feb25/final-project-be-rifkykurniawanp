import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

export class OrderResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  buyerId: number;

  @ApiProperty({ example: 1 })
  paymentId: number;

  @ApiProperty({ example: 200000.00 })
  totalPrice: number;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty({ example: '2025-08-15T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ type: () => [OrderOrderItemResponseDto] })
  items: OrderOrderItemResponseDto[];
}

export class OrderOrderItemResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 101 })
  productId: number;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 100000.00 })
  priceEach: number;
}
