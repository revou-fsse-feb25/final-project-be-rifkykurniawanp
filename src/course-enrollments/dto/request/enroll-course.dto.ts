// src/course-enrollments/dto/request/enroll-course.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class EnrollCourseDto {
  @ApiProperty({ example: 1, description: 'ID of the course' })
  @IsInt()
  @IsNotEmpty()
  courseId: number;

  @ApiProperty({ example: 10, description: 'ID of the student' })
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: 1001, description: 'ID of the payment record' })
  @IsInt()
  @IsNotEmpty()
  paymentId: number;

  @ApiProperty({ example: 250000, description: 'Amount paid for the course' })
  @IsNumber()
  @IsNotEmpty()
  pricePaid: number; // 👈 tambah ini supaya sesuai schema & response DTO
}
