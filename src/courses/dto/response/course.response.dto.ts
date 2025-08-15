// src/courses/dto/response/course.response.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseCategory, CourseLevel } from '@prisma/client';

export class CourseResponseDto {
  @ApiProperty() id: number;
  @ApiProperty() title: string;
  @ApiProperty() slug: string;
  @ApiPropertyOptional() description?: string;
  @ApiPropertyOptional() syllabus?: string;
  @ApiProperty() price: number;
  @ApiProperty() rating: number;
  @ApiProperty() students: number;
  @ApiPropertyOptional() duration?: string;
  @ApiProperty({ enum: CourseLevel }) level: CourseLevel;
  @ApiProperty({ enum: CourseCategory }) category: CourseCategory;
  @ApiProperty() language: string;
  @ApiProperty() certificate: boolean;
  @ApiProperty() createdAt: Date;

  @ApiProperty({
    type: () => ({
      id: Number,
      firstName: String,
      lastName: String,
      email: String,
    }),
  })
  instructor: any;

  @ApiPropertyOptional({
    type: [Object],
  })
  modules?: Array<any>;

  @ApiPropertyOptional({
    type: [Object],
  })
  enrollments?: Array<any>;
}
