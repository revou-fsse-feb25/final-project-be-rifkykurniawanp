import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartResponseDto } from './dto/response/cart.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly service: CartsService) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, type: CartResponseDto })
  addItem(@Body() dto: AddToCartDto) {
    return this.service.addItem(dto);
  }

  @UseGuards(JwtGuard)
  @Put(':cartItemId')
  @ApiOperation({ summary: 'Update cart item' })
  @ApiResponse({ status: 200, type: CartResponseDto })
  updateItem(@Param('cartItemId') cartItemId: number, @Body() dto: UpdateCartDto) {
    return this.service.updateItem(cartItemId, dto);
  }

  @UseGuards(JwtGuard)
  @Get(':userId')
  @ApiOperation({ summary: 'Get cart by user' })
  @ApiResponse({ status: 200, type: CartResponseDto })
  getCartByUser(@Param('userId') userId: number) {
    return this.service.getCartByUser(userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':cartItemId')
  @ApiOperation({ summary: 'Remove cart item' })
  removeItem(@Param('cartItemId') cartItemId: number) {
    return this.service.removeItem(cartItemId);
  }
}
