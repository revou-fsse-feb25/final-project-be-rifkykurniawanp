import { IsString, IsOptional, IsDateString, Length, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty({ example: 'Essay on Climate Change', maxLength: 200 })
  @IsString()
  @Length(1, 200)
  title: string;

  @ApiProperty({ example: 'Write a 2000-word essay about global warming', maxLength: 2000 })
  @IsString()
  @Length(1, 2000)
  instructions: string;

  @ApiPropertyOptional({ example: '2025-09-01T23:59:59Z', description: 'Due date in ISO format' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsInt()
  @IsNotEmpty()
  lessonId: number;
}
