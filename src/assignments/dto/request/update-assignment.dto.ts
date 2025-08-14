import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAssignmentDto {
  @ApiPropertyOptional({ example: 10 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  lessonId?: number;

  @ApiPropertyOptional({ example: 'Latte Art Intermediate' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Perbarui video teknik tulip' })
  @IsString()
  @IsOptional()
  instructions?: string;

  @ApiPropertyOptional({ example: '2025-09-05T00:00:00.000Z' })
  @IsOptional()
  dueDate?: Date;
}
