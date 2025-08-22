import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignmentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  lessonId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  instructions: string;

  @ApiPropertyOptional()
  dueDate?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  lesson?: {
    id: number;
    title: string;
    slug?: string;
    type: string;
    module: {
      id: number;
      title: string;
      course: {
        id: number;
        title: string;
        slug: string;
        instructorId: number;
      };
    };
  };

  @ApiProperty()
  submissionCount: number;

  @ApiProperty()
  gradedSubmissionCount: number;
}
