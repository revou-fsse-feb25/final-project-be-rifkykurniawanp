import { ApiProperty } from '@nestjs/swagger';

export class CreateEnrollmentDto {
  @ApiProperty({ example: 'user-uuid', description: 'ID of the user' })
  userId: string;

  @ApiProperty({ example: 'course-uuid', description: 'ID of the course' })
  courseId: string;
}
