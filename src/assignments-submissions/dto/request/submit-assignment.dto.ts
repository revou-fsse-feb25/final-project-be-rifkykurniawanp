import { IsInt, IsOptional, IsString, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitAssignmentDto {
  @ApiProperty({ example: 1, description: 'ID of the assignment' })
  @IsInt()
  assignmentId: number;

  @ApiProperty({ example: 1, description: 'ID of the user submitting' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 'My assignment content', description: 'Submission content', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ example: 95.5, description: 'Grade for the submission', required: false })
  @IsOptional()
  @IsDecimal()
  grade?: number;
}
