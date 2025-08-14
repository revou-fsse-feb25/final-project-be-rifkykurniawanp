import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductReviewsService } from './product-reviews.service';
import { CreateProductReviewDto } from './dto/request/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/request/update-product-review.dto';

@Controller('product-reviews')
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @Post()
  create(@Body() createProductReviewDto: CreateProductReviewDto) {
    return this.productReviewsService.create(createProductReviewDto);
  }

  @Get()
  findAll() {
    return this.productReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productReviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductReviewDto: UpdateProductReviewDto) {
    return this.productReviewsService.update(+id, updateProductReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productReviewsService.remove(+id);
  }
}
