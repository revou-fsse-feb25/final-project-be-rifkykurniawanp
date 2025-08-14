import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAssignmentDto {
  @ApiProperty({ example: 10, description: 'Lesson ID that this assignment belongs to' })
  @Type(() => Number)
  @IsInt()
  lessonId: number;

  @ApiProperty({ example: 'Latte Art Basic', description: 'Assignment title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Buat video 3 menit teknik latte art rosetta', description: 'Assignment instructions' })
  @IsString()
  @IsOptional()
  instructions?: string;

  @ApiProperty({ example: '2025-09-01T00:00:00.000Z', required: false, description: 'Optional due date' })
  @IsOptional()
  dueDate?: Date;
}
