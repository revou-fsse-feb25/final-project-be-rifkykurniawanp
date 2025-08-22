import { IsNotEmpty, IsOptional, IsString, IsInt, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty({ description: 'ID of the lesson this assignment belongs to' })
  @IsInt()
  lessonId: number;

  @ApiProperty({ description: 'Title of the assignment' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Instructions for the assignment' })
  @IsString()
  @IsNotEmpty()
  instructions: string;

  @ApiPropertyOptional({ description: 'Due date of the assignment', type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}
