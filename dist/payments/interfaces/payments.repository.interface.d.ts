import { CreatePaymentDto } from '../dto/request/create-payment.dto';
import { UpdatePaymentDto } from '../dto/request/update-payment.dto';
export interface IPaymentsRepository {
    create(dto: CreatePaymentDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, dto: UpdatePaymentDto): any;
    remove(id: number): any;
}
