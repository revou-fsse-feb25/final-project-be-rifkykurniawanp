import { IsString, IsOptional, IsDateString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAssignmentDto {
  @ApiPropertyOptional({ example: 'Updated Assignment Title', maxLength: 200 })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  title?: string;

  @ApiPropertyOptional({ example: 'Updated instructions text', maxLength: 2000 })
  @IsOptional()
  @IsString()
  @Length(1, 2000)
  instructions?: string;

  @ApiPropertyOptional({ example: '2025-09-05T12:00:00Z', description: 'Updated due date or null' })
  @IsOptional()
  @IsDateString()
  dueDate?: string | null;
}
