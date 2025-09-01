import { IsInt, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 1 })
  orderId: number;

  @ApiProperty({ example: 101 })
  productId: number;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 100000.00 })
  priceEach: number;
}
