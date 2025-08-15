import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly repository: PaymentsRepository) {}

  create(dto: CreatePaymentDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdatePaymentDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
