import { ApiProperty } from '@nestjs/swagger';

export class LessonProgressResponseDto {
  @ApiProperty({ example: 1 })
  lessonId: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: true })
  completed: boolean;

  @ApiProperty({ example: '2025-08-15T12:00:00Z' })
  updatedAt: Date;
}
