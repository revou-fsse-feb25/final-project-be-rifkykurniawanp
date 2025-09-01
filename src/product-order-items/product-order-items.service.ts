import { Injectable } from '@nestjs/common';
import { ProductOrderItemsRepository } from './product-order-items.repository';
import { CreateOrderItemDto } from './dto/request/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/request/update-order-item.dto';

@Injectable()
export class ProductOrderItemsService {
  constructor(private readonly repository: ProductOrderItemsRepository) {}

  create(dto: CreateOrderItemDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateOrderItemDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
