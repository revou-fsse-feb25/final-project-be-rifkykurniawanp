import { ApiProperty } from '@nestjs/swagger';

export class CertificateResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 42 })
  enrollmentId: number;

  @ApiProperty({ example: true })
  finalLessonsCompleted: boolean;

  @ApiProperty({ example: true })
  finalAssignmentsCompleted: boolean;

  @ApiProperty({ example: true })
  eligible: boolean;

  @ApiProperty({ example: '2025-08-14T10:00:00.000Z', nullable: true })
  issuedAt?: Date | null;

  @ApiProperty({
    example: 'https://cdn.example.com/certs/uuid.pdf',
    nullable: true,
  })
  certificateUrl?: string | null;
}
