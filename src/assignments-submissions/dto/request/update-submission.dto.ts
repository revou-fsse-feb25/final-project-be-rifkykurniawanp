import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateAssignmentSubmissionDto {
  @IsOptional()
  @IsString()
  @Length(1, 5000, { message: 'Submission content must be between 1 and 5000 characters' })
  content?: string;
}