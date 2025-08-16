import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductOrdersService } from './product-orders.service';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderResponseDto } from './dto/response/order.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('Product Orders')
@Controller('product-orders')
export class ProductOrdersController {
  constructor(private readonly service: ProductOrdersService) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({ summary: 'Create product order' })
  @ApiResponse({ status: 201, type: OrderResponseDto })
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all product orders' })
  @ApiResponse({ status: 200, type: [OrderResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Get(':id')
  @ApiOperation({ summary: 'Get product order by id' })
  @ApiResponse({ status: 200, type: OrderResponseDto })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  @ApiOperation({ summary: 'Update product order' })
  @ApiResponse({ status: 200, type: OrderResponseDto })
  update(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete product order' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
