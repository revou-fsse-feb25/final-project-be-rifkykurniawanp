import { CreateEnrollmentDto } from '../dto/request/create-enrollment.dto';
import { UpdateEnrollmentDto } from '../dto/request/update-enrollment.dto';
import { CompleteEnrollmentDto } from '../dto/request/complete-enrollment.dto';
import { EnrollmentResponseDto } from '../dto/response/enrollment-response.dto';
import { PaginatedEnrollmentResponseDto } from '../dto/response/pagination-enrollment-response.dto';

export interface IEnrollmentsRepository {
  create(data: CreateEnrollmentDto): Promise<EnrollmentResponseDto>;
  findAll(page: number, limit: number): Promise<PaginatedEnrollmentResponseDto>;
  findOne(id: string): Promise<EnrollmentResponseDto>;
  update(id: string, data: UpdateEnrollmentDto): Promise<EnrollmentResponseDto>;
  complete(id: string, data: CompleteEnrollmentDto): Promise<EnrollmentResponseDto>;
  remove(id: string): Promise<void>;
}
