import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty({ example: 1, description: 'ID of the related lesson' })
  @IsInt()
  lessonId: number;

  @ApiProperty({ example: 'Intro Assignment' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Complete the quiz and submit screenshots', required: false })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiProperty({ example: '2025-08-20T23:59:00Z', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
