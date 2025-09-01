import { Module } from '@nestjs/common';
import { ProductOrderItemsService } from './product-order-items.service';
import { ProductOrderItemsController } from './product-order-items.controller';
import { ProductOrderItemsRepository } from './product-order-items.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductOrderItemsController],
  providers: [ProductOrderItemsService, ProductOrderItemsRepository, PrismaService],
  exports: [ProductOrderItemsService],
})
export class ProductOrderItemsModule {}
