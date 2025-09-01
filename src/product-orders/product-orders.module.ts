import { Module } from '@nestjs/common';
import { ProductOrdersService } from './product-orders.service';
import { ProductOrdersController } from './product-orders.controller';
import { ProductOrdersRepository } from './product-order.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductOrdersController],
  providers: [ProductOrdersService, ProductOrdersRepository, PrismaService],
  exports: [ProductOrdersService],
})
export class ProductOrdersModule {}
