import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignmentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 10 })
  lessonId: number;

  @ApiProperty({ example: 'Essay on Climate Change' })
  title: string;

  @ApiProperty({ example: 'Write a 2000-word essay...' })
  instructions: string;

  @ApiPropertyOptional({ example: '2025-09-01T23:59:59Z' })
  dueDate?: Date | null;

  @ApiProperty({ example: '2025-08-20T10:00:00Z' })
  createdAt: Date;

  @ApiPropertyOptional({
    example: { submissions: 5 },
    description: 'Optional relation counts',
  })
  _count?: { submissions: number };

  @ApiPropertyOptional({
    example: {
      id: 101,
      content: 'My essay content...',
      grade: 90,
      submittedAt: '2025-08-20T11:00:00Z',
    },
    description: 'Student’s submission if exists',
  })
  userSubmission?: {
    id: number;
    content?: string;
    grade?: number;
    submittedAt: Date;
  } | null;
}

export class AssignmentListResponseDto {
  @ApiProperty({ type: [AssignmentResponseDto] })
  assignments: AssignmentResponseDto[];

  @ApiPropertyOptional({ example: 50 })
  total?: number;

  @ApiPropertyOptional({ example: 1 })
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  limit?: number;
}
