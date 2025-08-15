import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from '@prisma/client';

export class LessonResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  moduleId: number;

  @ApiProperty({ example: 'intro-to-brewing', required: false })
  slug?: string;

  @ApiProperty({ example: 'Introduction to Brewing' })
  title: string;

  @ApiProperty({ example: 'Learn the basics of coffee brewing', required: false })
  description?: string;

  @ApiProperty({ example: '10m', required: false })
  duration?: string;

  @ApiProperty({ enum: LessonType })
  type: LessonType;

  @ApiProperty({ example: 'https://video.url/lesson.mp4', required: false })
  videoUrl?: string;

  @ApiProperty({ example: 'Lesson content here', required: false })
  content?: string;

  @ApiProperty({ example: '[]', required: false })
  quizQuestions?: string;

  @ApiProperty({ example: 70 })
  passingScore: number;

  @ApiProperty({ example: 1 })
  orderNumber: number;

  @ApiProperty({ example: '2025-08-15T12:00:00Z' })
  createdAt: Date;
}
