import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSubmissionDto {
  @ApiPropertyOptional({ example: 'https://cdn.example.com/submissions/vid1-v2.mp4' })
  @IsString()
  @IsOptional()
  contentUrl?: string;

  @ApiPropertyOptional({ example: 'Revisi jawaban: perbaiki pouring' })
  @IsString()
  @IsOptional()
  notes?: string;
}
