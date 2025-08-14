import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class IssueCertificateDto {
  @ApiProperty({ example: 42, description: 'ID dari CourseEnrollment yang akan diberi sertifikat' })
  @IsNumber()
  @IsNotEmpty()
  enrollmentId: number;

  @ApiProperty({ example: true, description: 'Semua lesson final sudah diselesaikan' })
  @IsBoolean()
  finalLessonsCompleted: boolean;

  @ApiProperty({ example: true, description: 'Semua assignment final sudah diselesaikan' })
  @IsBoolean()
  finalAssignmentsCompleted: boolean;

  @ApiProperty({ example: true, description: 'Kelayakan penerbitan sertifikat' })
  @IsBoolean()
  eligible: boolean;

  @ApiProperty({
    example: 'https://cdn.example.com/certs/uuid.pdf',
    required: false,
    description: 'URL file sertifikat (opsional, bisa diisi setelah generate)',
  })
  @IsOptional()
  @IsString()
  certificateUrl?: string;
}
