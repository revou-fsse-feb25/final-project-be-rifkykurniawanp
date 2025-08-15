import { Module } from '@nestjs/common';
import { ProductReviewsController } from './product-reviews.controller';
import { ProductReviewsService } from './product-reviews.service';
import { ProductReviewsRepository } from './product-reviews.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductReviewsController],
  providers: [
    PrismaService,
    ProductReviewsService,
    {
      provide: 'IProductReviewsRepository', // token untuk interface
      useClass: ProductReviewsRepository,
    },
  ],
  exports: [ProductReviewsService],
})
export class ProductReviewsModule {}
