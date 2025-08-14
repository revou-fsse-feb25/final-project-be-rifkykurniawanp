import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubmissionDto {
  @ApiProperty({ example: 5, description: 'User (student) ID who submits' })
  @Type(() => Number)
  @IsInt()
  userId: number;

  @ApiProperty({ example: 'https://cdn.example.com/submissions/vid1.mp4', required: false })
  @IsString()
  @IsOptional()
  contentUrl?: string;

  @ApiProperty({ example: 'Ini link video tugas saya', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
