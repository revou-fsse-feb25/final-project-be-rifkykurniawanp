import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto';

@Injectable()
export class PaymentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePaymentDto) {
    return this.prisma.payment.create({ data: dto });
  }

  findAll() {
    return this.prisma.payment.findMany();
  }

  findOne(id: number) {
    return this.prisma.payment.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdatePaymentDto) {
    return this.prisma.payment.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.payment.delete({ where: { id } });
  }
}
