import { ApiProperty } from '@nestjs/swagger';
import { EnrollmentResponseDto } from './enrollment-response.dto';

export class PaginatedEnrollmentResponseDto {
  @ApiProperty({ type: [EnrollmentResponseDto] })
  data: EnrollmentResponseDto[];

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;
}
