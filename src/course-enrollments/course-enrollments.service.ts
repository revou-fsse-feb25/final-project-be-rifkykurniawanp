import { Injectable, NotFoundException } from '@nestjs/common';
import { EnrollmentsRepository } from './course-enrollments.repository';
import { EnrollCourseDto } from './dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';
import { EnrollmentResponseDto } from './dto/response/enrollment.response.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly repo: EnrollmentsRepository) {}

  create(dto: EnrollCourseDto): Promise<EnrollmentResponseDto> {
    return this.repo.create(dto);
  }

  findAll(): Promise<EnrollmentResponseDto[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<EnrollmentResponseDto> {
    const enrollment = await this.repo.findById(id);
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    return enrollment;
  }

  update(id: number, dto: UpdateEnrollmentDto): Promise<EnrollmentResponseDto> {
    return this.repo.update(id, dto);
  }

  remove(id: number): Promise<void> {
    return this.repo.remove(id);
  }
}
