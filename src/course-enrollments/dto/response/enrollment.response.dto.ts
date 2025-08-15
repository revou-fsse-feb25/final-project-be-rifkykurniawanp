import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  courseId: number;

  @ApiProperty({ example: 2 })
  studentId: number;

  @ApiProperty({ example: 1 })
  paymentId: number;

  @ApiProperty({ example: 200000.00 })
  pricePaid: number;

  @ApiProperty({ example: 0 })
  progress: number;

  @ApiProperty({ example: false })
  certificateAwarded: boolean;

  @ApiProperty({ example: '2025-08-15T12:00:00Z' })
  enrolledAt: Date;
}
