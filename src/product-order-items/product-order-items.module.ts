import { Module } from '@nestjs/common';
import { ProductOrderItemsService } from './product-order-items.service';
import { ProductOrderItemsController } from './product-order-items.controller';

@Module({
  controllers: [ProductOrderItemsController],
  providers: [ProductOrderItemsService],
})
export class ProductOrderItemsModule {}
