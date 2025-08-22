import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto } from './dto/request/create-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
import { Cart, RoleName } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateCartDto, role: RoleName): Promise<Cart> {
    // hanya USER yang bisa create cart
    if (role !== 'USER') throw new ForbiddenException('Access denied');

    return this.prisma.cart.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll(userId: number, role: RoleName): Promise<Cart[]> {
    // ADMIN bisa lihat semua cart
    if (role === 'ADMIN') {
      return this.prisma.cart.findMany({
        include: { user: true, items: { include: { product: true, course: true } }, payments: true },
      });
    }

    // USER hanya bisa lihat cart miliknya sendiri
    return this.prisma.cart.findMany({
      where: { userId },
      include: { user: true, items: { include: { product: true, course: true } }, payments: true },
    });
  }

  async findOne(id: number, userId: number, role: RoleName): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: { user: true, items: { include: { product: true, course: true } }, payments: true },
    });
    if (!cart) throw new NotFoundException(`Cart ${id} not found`);

    if (role !== 'ADMIN' && cart.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return cart;
  }

  async update(id: number, dto: UpdateCartDto, userId: number, role: RoleName): Promise<Cart> {
    const cart = await this.findOne(id, userId, role);

    return this.prisma.cart.update({
      where: { id },
      data: dto,
      include: { items: { include: { product: true, course: true } }, payments: true },
    });
  }

  async remove(id: number, userId: number, role: RoleName): Promise<Cart> {
    const cart = await this.findOne(id, userId, role);

    return this.prisma.cart.delete({ where: { id } });
  }

  async addItem(cartId: number, userId: number, itemType: 'PRODUCT' | 'COURSE', itemId: number, quantity: number, role: RoleName) {
    const cart = await this.findOne(cartId, userId, role);

    if (itemType === 'PRODUCT') {
      const product = await this.prisma.product.findUnique({ where: { id: itemId } });
      if (!product) throw new BadRequestException('Product not found');
    } else if (itemType === 'COURSE') {
      const course = await this.prisma.course.findUnique({ where: { id: itemId } });
      if (!course) throw new BadRequestException('Course not found');
    }

    return this.prisma.cartItem.create({
      data: { cartId, itemType, itemId, quantity, price: new Prisma.Decimal(0) },
    });
  }

  async removeItem(cartId: number, userId: number, itemId: number, role: RoleName) {
    const cart = await this.findOne(cartId, userId, role);

    const item = await this.prisma.cartItem.findFirst({ where: { cartId, id: itemId } });
    if (!item) throw new NotFoundException('CartItem not found');

    return this.prisma.cartItem.delete({ where: { id: item.id } });
  }
}
