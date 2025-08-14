import { Injectable } from '@nestjs/common';
import { CreateCourseEnrollmentDto } from './dto/request/enroll-course.dto';
import { UpdateCourseEnrollmentDto } from './dto/request/update-enrollment.dto';

@Injectable()
export class CourseEnrollmentsService {
  create(createCourseEnrollmentDto: CreateCourseEnrollmentDto) {
    return 'This action adds a new courseEnrollment';
  }

  findAll() {
    return `This action returns all courseEnrollments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseEnrollment`;
  }

  update(id: number, updateCourseEnrollmentDto: UpdateCourseEnrollmentDto) {
    return `This action updates a #${id} courseEnrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseEnrollment`;
  }
}
