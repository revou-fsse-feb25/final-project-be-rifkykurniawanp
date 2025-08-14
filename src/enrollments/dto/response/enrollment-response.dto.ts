import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentResponseDto {
  @ApiProperty({ example: 'enrollment-uuid' })
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @ApiProperty({ example: 'course-uuid' })
  courseId: string;

  @ApiProperty({ example: 'active' })
  status: string;

  @ApiProperty({ example: false })
  completed: boolean;

  @ApiProperty({ example: null })
  certificateId: string | null;
}
