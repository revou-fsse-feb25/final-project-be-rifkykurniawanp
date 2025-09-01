import { CreateOrderItemDto } from '../dto/request/create-order-item.dto';
import { UpdateOrderItemDto } from '../dto/request/update-order-item.dto';

export interface IProductOrderItemsRepository {
  create(dto: CreateOrderItemDto);
  findAll();
  findOne(id: number);
  update(id: number, dto: UpdateOrderItemDto);
  remove(id: number);
}
