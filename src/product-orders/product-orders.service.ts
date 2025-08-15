import { Injectable } from '@nestjs/common';
import { ProductOrdersRepository } from './product-order.repository';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';

@Injectable()
export class ProductOrdersService {
  constructor(private readonly repository: ProductOrdersRepository) {}

  create(dto: CreateOrderDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateOrderDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
