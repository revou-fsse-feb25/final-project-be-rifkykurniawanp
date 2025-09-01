import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from '@prisma/client';

export class CreateLessonDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  duration?: string;

  @ApiProperty({ enum: LessonType, default: LessonType.VIDEO })
  type?: LessonType;

  @ApiProperty({ required: false })
  videoUrl?: string;

  @ApiProperty({ required: false })
  content?: string;

  @ApiProperty({ required: false })
  quizQuestions?: any;

  @ApiProperty({ default: 70 })
  passingScore?: number;

  @ApiProperty()
  orderNumber: number;
}
