import { IsString, Length } from 'class-validator';

export class CreateAssignmentSubmissionDto {
  @IsString()
  @Length(1, 5000, { message: 'Submission content must be between 1 and 5000 characters' })
  content: string;
}