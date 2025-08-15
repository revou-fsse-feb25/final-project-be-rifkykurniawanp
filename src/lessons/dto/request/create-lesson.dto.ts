import { IsInt, IsOptional, IsString, IsEnum, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from '@prisma/client'; // Enum dari Prisma

export class CreateLessonDto {
  @ApiProperty({ example: 1, description: 'ID of the course module' })
  @IsInt()
  moduleId: number;

  @ApiProperty({ example: 'intro-to-brewing', description: 'Slug of the lesson', required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ example: 'Introduction to Brewing' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Learn the basics of coffee brewing', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '10m', required: false })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({ enum: LessonType, example: LessonType.VIDEO })
  @IsEnum(LessonType)
  type: LessonType;

  @ApiProperty({ example: 'https://video.url/lesson.mp4', required: false })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiProperty({ example: 'Lesson content here', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ example: '[]', required: false })
  @IsOptional()
  @IsString()
  quizQuestions?: string;

  @ApiProperty({ example: 70 })
  @IsOptional()
  @IsDecimal()
  passingScore?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  orderNumber: number;
}
