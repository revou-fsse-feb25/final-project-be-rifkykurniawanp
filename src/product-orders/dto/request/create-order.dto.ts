import { IsInt, IsDecimal, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty({ example: 1 })
  buyerId: number;

  @ApiProperty({ example: 1 })
  paymentId: number;

  @ApiProperty({ example: 200000.00 })
  totalPrice: number;

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.PENDING })
  status: OrderStatus;
}
