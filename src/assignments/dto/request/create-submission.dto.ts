import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubmissionDto {
  @ApiProperty({ description: 'ID of the assignment' })
  @IsInt()
  assignmentId: number;

  @ApiProperty({ description: 'ID of the submitting user' })
  @IsInt()
  userId: number;

  @ApiPropertyOptional({ description: 'Content of the submission' })
  @IsOptional()
  @IsString()
  content?: string;
}
