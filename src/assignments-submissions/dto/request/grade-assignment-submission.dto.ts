import { IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class GradeAssignmentSubmissionDto {
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Grade must be a number with up to 2 decimal places' })
  @Min(0, { message: 'Grade cannot be negative' })
  @Max(100, { message: 'Grade cannot exceed 100' })
  @Transform(({ value }) => parseFloat(value))
  grade: number;
}