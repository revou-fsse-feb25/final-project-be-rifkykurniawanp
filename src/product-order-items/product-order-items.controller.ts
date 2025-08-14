import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductOrderItemsService } from './product-order-items.service';
import { CreateProductOrderItemDto } from './dto/request/create-order-item.dto';
import { UpdateProductOrderItemDto } from './dto/request/update-order-item.dto';

@Controller('product-order-items')
export class ProductOrderItemsController {
  constructor(private readonly productOrderItemsService: ProductOrderItemsService) {}

  @Post()
  create(@Body() createProductOrderItemDto: CreateProductOrderItemDto) {
    return this.productOrderItemsService.create(createProductOrderItemDto);
  }

  @Get()
  findAll() {
    return this.productOrderItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productOrderItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductOrderItemDto: UpdateProductOrderItemDto) {
    return this.productOrderItemsService.update(+id, updateProductOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productOrderItemsService.remove(+id);
  }
}
