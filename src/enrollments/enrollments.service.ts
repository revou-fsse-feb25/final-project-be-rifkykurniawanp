import { Injectable, Inject } from '@nestjs/common';
import { IEnrollmentsRepository } from './interface/enrollments.repository.interface';
import { CreateEnrollmentDto } from './dto/request/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';
import { CompleteEnrollmentDto } from './dto/request/complete-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @Inject('IEnrollmentsRepository')
    private readonly repository: IEnrollmentsRepository,
  ) {}

  create(dto: CreateEnrollmentDto) {
    return this.repository.create(dto);
  }

  findAll(page: number, limit: number) {
    return this.repository.findAll(page, limit);
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, dto: UpdateEnrollmentDto) {
    return this.repository.update(id, dto);
  }

  complete(id: string, dto: CompleteEnrollmentDto) {
    return this.repository.complete(id, dto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
