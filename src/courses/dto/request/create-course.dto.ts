// src/courses/dto/request/create-course.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean } from 'class-validator';
import { CourseCategory, CourseLevel } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  syllabus?: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @ApiProperty()
  @IsNumber()
  instructorId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({ enum: CourseLevel })
  @IsEnum(CourseLevel)
  level: CourseLevel;

  @ApiProperty({ enum: CourseCategory })
  @IsEnum(CourseCategory)
  category: CourseCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  certificate?: boolean;
}
