import { CreateOrderDto } from '../dto/request/create-order.dto';
import { UpdateOrderDto } from '../dto/request/update-order.dto';

export interface IProductOrdersRepository {
  create(dto: CreateOrderDto);
  findAll();
  findOne(id: number);
  update(id: number, dto: UpdateOrderDto);
  remove(id: number);
}
