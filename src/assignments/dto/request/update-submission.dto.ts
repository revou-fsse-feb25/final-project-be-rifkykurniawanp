import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSubmissionDto {
  @ApiPropertyOptional({ description: 'Content of the submission' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'Grade assigned to the submission' })
  @IsOptional()
  @IsNumber()
  grade?: number;
}
