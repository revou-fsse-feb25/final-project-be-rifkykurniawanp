import { ApiProperty } from '@nestjs/swagger';
import { EnrollmentStatus } from '../request/update-enrollment.dto';

export class EnrollmentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  courseId: number;

  @ApiProperty({ example: 10 })
  studentId: number;

  @ApiProperty({ example: 1001 })
  paymentId: number;

  @ApiProperty({ example: 250000 })
  pricePaid: number;

  @ApiProperty({ example: 0, description: 'Progress percentage from 0-100' })
  progress: number;

  @ApiProperty({ example: false })
  certificateAwarded: boolean;

  @ApiProperty({ enum: EnrollmentStatus, example: EnrollmentStatus.ACTIVE })
  status: EnrollmentStatus;

  @ApiProperty({ example: '2025-08-21T08:00:00Z' })
  enrolledAt: Date;
}
