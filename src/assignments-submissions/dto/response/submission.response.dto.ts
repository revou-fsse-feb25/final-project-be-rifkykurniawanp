import { ApiProperty } from '@nestjs/swagger';

export class SubmissionResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  assignmentId: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'My assignment content', required: false })
  content?: string;

  @ApiProperty({ example: 95.5, required: false })
  grade?: number;

  @ApiProperty({ example: '2025-08-15T12:00:00Z' })
  submittedAt: Date;
}
