import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { OrderModule } from './order/order.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TagsModule } from './tags/tags.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [OrderModule, ReviewsModule, TagsModule],
})
export class ProductsModule {}
