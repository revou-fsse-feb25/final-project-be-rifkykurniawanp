import { ApiProperty } from '@nestjs/swagger';

export class CompleteEnrollmentDto {
  @ApiProperty({ example: true, description: 'Whether the course is completed' })
  completed: boolean;

  @ApiProperty({
    example: 'certificate-uuid',
    description: 'Certificate ID issued after completion',
  })
  certificateId: string;
}
