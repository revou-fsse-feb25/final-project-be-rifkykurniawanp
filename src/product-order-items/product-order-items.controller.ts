import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductOrderItemsService } from './product-order-items.service';
import { CreateOrderItemDto } from './dto/request/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/request/update-order-item.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderItemResponseDto } from './dto/response/order-item.response.dto';

@ApiTags('Product Order Items')
@Controller('product-order-items')
export class ProductOrderItemsController {
  constructor(private readonly service: ProductOrderItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create product order item' })
  @ApiResponse({ status: 201, type: OrderItemResponseDto })
  create(@Body() dto: CreateOrderItemDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all product order items' })
  @ApiResponse({ status: 200, type: [OrderItemResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product order item by id' })
  @ApiResponse({ status: 200, type: OrderItemResponseDto })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product order item' })
  @ApiResponse({ status: 200, type: OrderItemResponseDto })
  update(@Param('id') id: number, @Body() dto: UpdateOrderItemDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product order item' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
