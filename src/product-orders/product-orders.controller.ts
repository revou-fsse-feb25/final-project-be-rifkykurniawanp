import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductOrdersService } from './product-orders.service';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderResponseDto } from './dto/response/order.response.dto';

@ApiTags('Product Orders')
@Controller('product-orders')
export class ProductOrdersController {
  constructor(private readonly service: ProductOrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create product order' })
  @ApiResponse({ status: 201, type: OrderResponseDto })
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all product orders' })
  @ApiResponse({ status: 200, type: [OrderResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product order by id' })
  @ApiResponse({ status: 200, type: OrderResponseDto })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product order' })
  @ApiResponse({ status: 200, type: OrderResponseDto })
  update(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product order' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
