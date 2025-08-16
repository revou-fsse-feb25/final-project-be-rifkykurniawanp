import { CreateOrderItemDto } from '../dto/request/create-order-item.dto';
import { UpdateOrderItemDto } from '../dto/request/update-order-item.dto';
export interface IProductOrderItemsRepository {
    create(dto: CreateOrderItemDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, dto: UpdateOrderItemDto): any;
    remove(id: number): any;
}
