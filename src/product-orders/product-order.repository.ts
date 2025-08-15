import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';

@Injectable()
export class ProductOrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOrderDto) {
    return this.prisma.productOrder.create({ data: dto });
  }

  findAll() {
    return this.prisma.productOrder.findMany({ include: { items: true } });
  }

  findOne(id: number) {
    return this.prisma.productOrder.findUnique({ where: { id }, include: { items: true } });
  }

  update(id: number, dto: UpdateOrderDto) {
    return this.prisma.productOrder.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.productOrder.delete({ where: { id } });
  }
}
