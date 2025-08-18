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

  // Get current user's cart
  @UseGuards(JwtGuard)
  @Get()
  @ApiOperation({ summary: 'Get current user cart' })
  @ApiResponse({ status: 200, type: CartResponseDto })
  getCart(@Req() req) {
    return this.service.getCartByUser(req.user.id);
  }

  // Add item to cart (requires cartId from DTO)
  @UseGuards(JwtGuard)
  @Post(':cartId/items')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, type: CartResponseDto })
  addItem(@Param('cartId') cartId: number, @Body() dto: AddToCartDto, @Req() req) {
    return this.service.addItem({ ...dto, userId: req.user.id, cartId });
  }

  // Update cart item
  @UseGuards(JwtGuard)
  @Put(':cartId/items/:itemId')
  @ApiOperation({ summary: 'Update cart item' })
  @ApiResponse({ status: 200, type: CartResponseDto })
  updateItem(
    @Param('cartId') cartId: number,
    @Param('itemId') itemId: number,
    @Body() dto: UpdateCartDto,
  ) {
    // Optionally verify cartId matches itemId's cart in service
    return this.service.updateItem(itemId, dto);
  }

  // Remove cart item
  @UseGuards(JwtGuard)
  @Delete(':cartId/items/:itemId')
  @ApiOperation({ summary: 'Remove cart item' })
  @ApiResponse({ status: 204 })
  removeItem(@Param('cartId') cartId: number, @Param('itemId') itemId: number) {
    // Optionally verify cartId matches itemId's cart in service
    return this.service.removeItem(itemId);
  }

  // Checkout
  @UseGuards(JwtGuard)
  @Post(':cartId/checkout')
  @ApiOperation({ summary: 'Checkout cart' })
  @ApiResponse({ status: 200, description: 'Checkout successful' })
  checkout(@Param('cartId') cartId: number, @Req() req) {
    // Dummy implementation, integrate with PaymentsService
    return { message: `User ${req.user.id} checked out cart ${cartId}` };
  }
}
