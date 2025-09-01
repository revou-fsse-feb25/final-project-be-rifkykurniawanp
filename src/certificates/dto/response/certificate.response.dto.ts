import { ApiProperty } from '@nestjs/swagger';

export class CertificateResponseDto {
  @ApiProperty({ example: 1, description: 'Unique ID of the certificate' })
  id: number;

  @ApiProperty({ example: 101, description: 'Unique ID of the associated enrollment' })
  enrollmentId: number;

  @ApiProperty({ example: 10, description: 'Unique ID of the user who received the certificate (from enrollment.studentId)' })
  userId: number; // derived from enrollment.studentId

  @ApiProperty({ example: 201, description: 'Unique ID of the course the certificate is for (from enrollment.courseId)' })
  courseId: number; // derived from enrollment.courseId

  @ApiProperty({ example: true, description: 'Whether all required lessons are completed' })
  finalLessonsCompleted: boolean;

  @ApiProperty({ example: true, description: 'Whether all required assignments are completed' })
  finalAssignmentsCompleted: boolean;

  @ApiProperty({ example: true, description: 'Overall eligibility status for the certificate' })
  eligible: boolean;

  @ApiProperty({
    example: '2025-08-15T12:00:00Z',
    description: 'The date and time the certificate was issued',
    required: false,
    type: String,
    format: 'date-time',
  })
  issuedAt?: Date;

  @ApiProperty({
    example: 'https://example.com/certificate.pdf',
    description: 'URL to download the certificate PDF',
    required: false,
  })
  certificateUrl?: string;
}
