import { CreateSubmissionDto } from '../dto/request/create-submission.dto';
import { UpdateSubmissionDto } from '../dto/request/update-submission.dto';
import { SubmissionResponseDto } from '../dto/response/submission-response.dto';

export interface ISubmissionsRepository {
  create(assignmentId: number, dto: CreateSubmissionDto): Promise<SubmissionResponseDto>;
  findAll(assignmentId: number, page: number, limit: number): Promise<{ data: SubmissionResponseDto[]; total: number; page: number; limit: number }>;
  findOne(assignmentId: number, id: number): Promise<SubmissionResponseDto | null>;
  update(assignmentId: number, id: number, dto: UpdateSubmissionDto): Promise<SubmissionResponseDto>;
  remove(assignmentId: number, id: number): Promise<void>;
}
