import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from '@prisma/client';

export class LessonResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

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

  @ApiProperty()
  createdAt: Date;
}
