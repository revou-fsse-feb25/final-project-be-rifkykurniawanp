import { EnrollCourseDto } from '../dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from '../dto/request/update-enrollment.dto';

export interface ICourseEnrollmentsRepository {
  enroll(dto: EnrollCourseDto);
  findAll();
  findOne(id: number);
  update(id: number, dto: UpdateEnrollmentDto);
  remove(id: number);
}
