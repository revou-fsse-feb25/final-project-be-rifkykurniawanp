import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderItemDto } from './dto/request/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/request/update-order-item.dto';

@Injectable()
export class ProductOrderItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOrderItemDto) {
    return this.prisma.productOrderItem.create({ data: dto });
  }

  findAll() {
    return this.prisma.productOrderItem.findMany();
  }

  findOne(id: number) {
    return this.prisma.productOrderItem.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateOrderItemDto) {
    return this.prisma.productOrderItem.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.productOrderItem.delete({ where: { id } });
  }
}
