import { Injectable } from '@nestjs/common';
import { CourseEnrollmentsRepository } from './course-enrollments.repository';
import { EnrollCourseDto } from './dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';

@Injectable()
export class CourseEnrollmentsService {
  constructor(private readonly repository: CourseEnrollmentsRepository) {}

  enroll(dto: EnrollCourseDto, paymentId: number) {
    return this.repository.enroll({ ...dto, paymentId });
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateEnrollmentDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
