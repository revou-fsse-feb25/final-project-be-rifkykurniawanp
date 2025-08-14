import { ApiProperty } from '@nestjs/swagger';

export class SubmissionResponseDto {
  @ApiProperty({ example: 1001 })
  id: number;

  @ApiProperty({ example: 1 })
  assignmentId: number;

  @ApiProperty({ example: 5 })
  userId: number;

  @ApiProperty({ example: 'https://cdn.example.com/submissions/vid1.mp4', nullable: true })
  contentUrl?: string | null;

  @ApiProperty({ example: 'Catatan dari siswa', nullable: true })
  notes?: string | null;

  @ApiProperty({ example: 92.5, nullable: true })
  grade?: number | null;

  @ApiProperty({ example: 'Bagus, teknik stabil', nullable: true })
  feedback?: string | null;

  @ApiProperty({ example: '2025-08-14T12:00:00.000Z' })
  submittedAt: Date;

  @ApiProperty({ example: '2025-08-14T12:00:00.000Z' })
  updatedAt: Date;
}
