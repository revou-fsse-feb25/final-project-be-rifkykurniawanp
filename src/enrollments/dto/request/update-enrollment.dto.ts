import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEnrollmentDto {
  @ApiPropertyOptional({ example: 'active', description: 'Status of enrollment' })
  status?: string;
}
