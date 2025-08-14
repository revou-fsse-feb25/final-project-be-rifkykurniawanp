import { Injectable } from '@nestjs/common';
import { IEnrollmentsRepository } from './interface/enrollments.repository.interface';
import { CreateEnrollmentDto } from './dto/request/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';
import { CompleteEnrollmentDto } from './dto/request/complete-enrollment.dto';
import { EnrollmentResponseDto } from './dto/response/enrollment-response.dto';
import { PaginatedEnrollmentResponseDto } from './dto/response/pagination-enrollment-response.dto';

@Injectable()
export class EnrollmentsRepository implements IEnrollmentsRepository {
  async create(data: CreateEnrollmentDto): Promise<EnrollmentResponseDto> {
    return { id: '1', ...data, status: 'active', completed: false, certificateId: null };
  }

  async findAll(page: number, limit: number): Promise<PaginatedEnrollmentResponseDto> {
    return {
      data: [],
      page,
      limit,
      total: 0,
    };
  }

  async findOne(id: string): Promise<EnrollmentResponseDto> {
    return {
      id,
      userId: 'user-uuid',
      courseId: 'course-uuid',
      status: 'active',
      completed: false,
      certificateId: null,
    };
  }

  async update(id: string, data: UpdateEnrollmentDto): Promise<EnrollmentResponseDto> {
    return {
      id,
      userId: 'user-uuid',
      courseId: 'course-uuid',
      status: data.status || 'active',
      completed: false,
      certificateId: null,
    };
  }

  async complete(id: string, data: CompleteEnrollmentDto): Promise<EnrollmentResponseDto> {
    return {
      id,
      userId: 'user-uuid',
      courseId: 'course-uuid',
      status: 'completed',
      completed: data.completed,
      certificateId: data.certificateId,
    };
  }

  async remove(id: string): Promise<void> {
    return;
  }
}
