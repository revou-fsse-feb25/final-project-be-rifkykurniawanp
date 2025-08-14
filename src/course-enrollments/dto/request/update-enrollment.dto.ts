import { PartialType } from '@nestjs/swagger';
import { CreateCourseEnrollmentDto } from './enroll-course.dto';

export class UpdateCourseEnrollmentDto extends PartialType(CreateCourseEnrollmentDto) {}
