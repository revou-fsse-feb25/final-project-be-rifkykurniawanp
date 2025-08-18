import { ApiProperty } from '@nestjs/swagger';

export class CertificateResponseDto {
  @ApiProperty({ example: 1, description: 'The unique ID of the certificate' })
  id: number;

  @ApiProperty({ example: 101, description: 'The unique ID of the associated enrollment' })
  enrollmentId: number;

  @ApiProperty({ example: 10, description: 'The unique ID of the user who received the certificate' })
  userId: number;

  @ApiProperty({ example: 201, description: 'The unique ID of the course the certificate is for' })
  courseId: number;

  @ApiProperty({ example: true, description: 'Whether the user completed all required lessons' })
  finalLessonsCompleted: boolean;

  @ApiProperty({ example: true, description: 'Whether the user completed all required assignments' })
  finalAssignmentsCompleted: boolean;

  @ApiProperty({ example: true, description: 'Overall eligibility status for the certificate' })
  eligible: boolean;

  @ApiProperty({ example: '2025-08-15T12:00:00Z', description: 'The date and time the certificate was issued', required: false })
  issuedAt?: Date;

  @ApiProperty({ example: 'https://example.com/certificate.pdf', description: 'URL to download the certificate PDF', required: false })
  certificateUrl?: string;
}