// assignment-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class AssignmentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  lessonId: number;

  @ApiProperty({ example: 'Intro Assignment' })
  title: string;

  @ApiProperty({ example: 'Complete the quiz and submit screenshots', required: false })
  instructions?: string;

  @ApiProperty({ example: '2025-08-20T23:59:00Z', required: false })
  dueDate?: string;

  @ApiProperty({ example: '2025-08-15T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-08-16T12:00:00Z' })
  updatedAt: Date;
}
