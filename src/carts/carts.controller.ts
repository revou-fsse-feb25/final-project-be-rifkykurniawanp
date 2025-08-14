import { Controller, Post, Patch, Delete, Get, Body, Param } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
import { RemoveFromCartDto } from './dto/request/remove-form-cart.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartResponseDto } from './dto/response/cart-response.dto';

@ApiTags('Carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, type: CartResponseDto })
  async addToCart(@Body() dto: AddToCartDto) {
    return this.cartsService.addToCart(dto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update cart item quantity or status' })
  @ApiResponse({ status: 200, type: CartResponseDto })
  async updateCart(@Body() dto: UpdateCartDto) {
    return this.cartsService.updateCart(dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({ status: 200, description: 'Item removed successfully' })
  async removeFromCart(@Body() dto: RemoveFromCartDto) {
    return this.cartsService.removeFromCart(dto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get active cart for a user' })
  @ApiResponse({ status: 200, type: CartResponseDto })
  async getUserCart(@Param('userId') userId: number) {
    return this.cartsService.getUserCart(userId);
  }
}
