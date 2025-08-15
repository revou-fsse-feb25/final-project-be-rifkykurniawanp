import { IsInt, IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IssueCertificateDto {
  @ApiProperty({ example: 1 })
  enrollmentId: number;

  @ApiProperty({ example: true })
  finalLessonsCompleted: boolean;

  @ApiProperty({ example: true })
  finalAssignmentsCompleted: boolean;

  @ApiProperty({ example: true })
  eligible: boolean;

  @ApiProperty({ example: '2025-08-15T12:00:00Z', required: false })
  @IsOptional()
  issuedAt?: Date;

  @ApiProperty({ example: 'https://example.com/certificate.pdf', required: false })
  @IsOptional()
  certificateUrl?: string;
}
