import { CreatePaymentDto } from '../dto/request/create-payment.dto';
import { UpdatePaymentDto } from '../dto/request/update-payment.dto';

export interface IPaymentsRepository {
  create(dto: CreatePaymentDto);
  findAll();
  findOne(id: number);
  update(id: number, dto: UpdatePaymentDto);
  remove(id: number);
}
