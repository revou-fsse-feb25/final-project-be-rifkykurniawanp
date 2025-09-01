import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Req,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/request/create-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RoleName } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(RolesGuard)
  @Roles('USER')
  @Post()
  async create(@Req() req: any, @Body() dto: CreateCartDto) {
    const { user } = req;
    return this.cartsService.create(user.id, dto, user.role as RoleName);
  }

  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @Get()
  async findAll(@Req() req: any, @Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    const { user } = req;
    return this.cartsService.findAll(user.id, user.role as RoleName);
  }

  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const { user } = req;
    return this.cartsService.findOne(id, user.id, user.role as RoleName);
  }

  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCartDto, @Req() req: any) {
    const { user } = req;
    return this.cartsService.update(id, dto, user.id, user.role as RoleName);
  }

  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const { user } = req;
    return this.cartsService.remove(id, user.id, user.role as RoleName);
  }

  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @Post(':id/items')
  async addItem(
    @Param('id', ParseIntPipe) cartId: number,
    @Body() body: { itemType: 'PRODUCT' | 'COURSE'; itemId: number; quantity: number },
    @Req() req: any,
  ) {
    const { user } = req;
    return this.cartsService.addItem(cartId, user.id, body.itemType, body.itemId, body.quantity, user.role as RoleName);
  }

  @UseGuards(RolesGuard)
  @Roles('USER', 'ADMIN')
  @Delete(':id/items/:itemId')
  async removeItem(@Param('id', ParseIntPipe) cartId: number, @Param('itemId', ParseIntPipe) itemId: number, @Req() req: any) {
    const { user } = req;
    return this.cartsService.removeItem(cartId, user.id, itemId, user.role as RoleName);
  }
}
