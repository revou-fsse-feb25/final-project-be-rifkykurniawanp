import { ApiProperty } from '@nestjs/swagger';

export class AssignmentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 10 })
  lessonId: number;

  @ApiProperty({ example: 'Latte Art Basic' })
  title: string;

  @ApiProperty({ example: 'Buat video 3 menit teknik latte art rosetta', nullable: true })
  instructions?: string | null;

  @ApiProperty({ example: '2025-09-01T00:00:00.000Z', nullable: true })
  dueDate?: Date | null;

  @ApiProperty({ example: '2025-08-14T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-08-14T12:00:00.000Z' })
  updatedAt: Date;

  // Optional fields for grading overview (aggregate)
  @ApiProperty({ example: 87.5, required: false, nullable: true })
  averageGrade?: number | null;

  @ApiProperty({ example: 12, required: false, nullable: true })
  submissionsCount?: number | null;
}
