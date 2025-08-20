import { EnrollCourseDto } from '../dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from '../dto/request/update-enrollment.dto';
import { EnrollmentResponseDto } from '../dto/response/enrollment.response.dto';

export interface IEnrollmentRepository {
  create(dto: EnrollCourseDto): Promise<EnrollmentResponseDto>;
  findAll(): Promise<EnrollmentResponseDto[]>;
  findById(id: number): Promise<EnrollmentResponseDto | null>; // ✅ allow null
  update(id: number, dto: UpdateEnrollmentDto): Promise<EnrollmentResponseDto>;
  remove(id: number): Promise<void>;
}
