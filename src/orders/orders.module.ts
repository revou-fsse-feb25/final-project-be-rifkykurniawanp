import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ItemsModule } from './items/items.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [ItemsModule],
})
export class OrdersModule {}
