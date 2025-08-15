import { ApiProperty } from '@nestjs/swagger';

export class OrderItemResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  orderId: number;

  @ApiProperty({ example: 101 })
  productId: number;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 100000.00 })
  priceEach: number;
}
