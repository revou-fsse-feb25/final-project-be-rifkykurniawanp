import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from '@prisma/client';

export class LessonResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  slug?: string | null;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  duration?: string;

  @ApiProperty({ enum: LessonType })
  type: LessonType;

  @ApiProperty()
  moduleId: number;

  @ApiProperty()
  orderNumber: number;

  @ApiProperty({ required: false })
  videoUrl?: string;

  @ApiProperty({ required: false })
  content?: string;

  @ApiProperty({ required: false })
  quizQuestions?: any;

  @ApiProperty({ required: false })
  passingScore?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false, nullable: true })
  deletedAt?: Date | null;
}

export default LessonResponseDto;