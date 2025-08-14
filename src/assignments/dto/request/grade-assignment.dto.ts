import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GradeAssignmentDto {
  @ApiProperty({ example: 95.5, description: 'Grade/score' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  grade: number;

  @ApiProperty({ example: 'Good job on technique and consistency', required: false })
  @IsString()
  @IsOptional()
  feedback?: string;
}
