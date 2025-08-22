import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmissionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  assignmentId: number;

  @ApiProperty()
  userId: number;

  @ApiPropertyOptional()
  content?: string;

  @ApiPropertyOptional()
  grade?: number;

  @ApiProperty()
  submittedAt: Date;

  @ApiPropertyOptional()
  user?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };

  @ApiPropertyOptional()
  assignment?: {
    id: number;
    title: string;
    dueDate?: Date;
    lesson: {
      id: number;
      title: string;
      module: {
        id: number;
        title: string;
        course: {
          id: number;
          title: string;
        };
      };
    };
  };
}
