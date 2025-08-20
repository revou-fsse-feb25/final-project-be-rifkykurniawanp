import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
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

  // ✅ Get current user's cart
  @UseGuards(JwtGuard)
  @Get()
  @ApiOperation({ summary: 'Get current user cart' })
  @ApiResponse({ status: 200, type: CartResponseDto })
  getCart(@Req() req) {
    return this.service.getCartByUser(req.user.id);
  }

  // ✅ Get cart by ID (as in route docs)
  @UseGuards(JwtGuard)
  @Get(':cartId/items')
  @ApiOperation({ summary: 'Get cart by ID (with items)' })
  @ApiResponse({ status: 200, type: CartResponseDto })
  getCartById(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.service.getCartById(cartId);
  }

  // ✅ Add item to cart
  @UseGuards(JwtGuard)
  @Post(':cartId/items')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, type: CartResponseDto })
  addItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Body() dto: AddToCartDto,
    @Req() req,
  ) {
    return this.service.addItem({ ...dto, userId: req.user.id, cartId });
  }

  // ✅ Update cart item
  @UseGuards(JwtGuard)
  @Put(':cartId/items/:itemId')
  @ApiOperation({ summary: 'Update cart item' })
  @ApiResponse({ status: 200, type: CartResponseDto })
  updateItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateCartDto,
  ) {
    return this.service.updateItem(itemId, dto);
  }

  // ✅ Remove cart item
  @UseGuards(JwtGuard)
  @Delete(':cartId/items/:itemId')
  @ApiOperation({ summary: 'Remove cart item' })
  @ApiResponse({ status: 204 })
  removeItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.service.removeItem(itemId);
  }

  // ✅ Checkout
  @UseGuards(JwtGuard)
  @Post(':cartId/checkout')
  @ApiOperation({ summary: 'Checkout cart' })
  @ApiResponse({ status: 200, description: 'Checkout successful' })
  checkout(@Param('cartId', ParseIntPipe) cartId: number, @Req() req) {
    return this.service.checkout(cartId, req.user.id);
  }
}
