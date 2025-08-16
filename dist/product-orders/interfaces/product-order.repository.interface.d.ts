import { CreateOrderDto } from '../dto/request/create-order.dto';
import { UpdateOrderDto } from '../dto/request/update-order.dto';
export interface IProductOrdersRepository {
    create(dto: CreateOrderDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, dto: UpdateOrderDto): any;
    remove(id: number): any;
}
