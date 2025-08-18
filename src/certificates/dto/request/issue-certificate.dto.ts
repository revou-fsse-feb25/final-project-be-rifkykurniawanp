// certificates/dto/request/issue-certificate.dto.ts

import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IssueCertificateDto {
  @ApiProperty({ example: 101, description: 'The unique ID of the associated enrollment' })
  @IsInt()
  @IsNotEmpty()
  enrollmentId: number;
}