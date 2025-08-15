import { PartialType } from '@nestjs/mapped-types';
import { EnrollCourseDto } from './enroll-course.dto';

export class UpdateEnrollmentDto extends PartialType(EnrollCourseDto) {}
