import { CreateAssignmentDto } from '../dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from '../dto/request/update-assignment.dto';
import { GradeAssignmentDto } from '../dto/request/grade-assignment.dto';
import { AssignmentResponseDto } from '../dto/response/assignment-response.dto';

export interface IAssignmentsRepository {
  create(dto: CreateAssignmentDto): Promise<AssignmentResponseDto>;
  findAll(page: number, limit: number): Promise<{ data: AssignmentResponseDto[]; total: number; page: number; limit: number }>;
  findOne(id: number): Promise<AssignmentResponseDto | null>;
  update(id: number, dto: UpdateAssignmentDto): Promise<AssignmentResponseDto>;
  grade(id: number, dto: GradeAssignmentDto): Promise<AssignmentResponseDto>;
  remove(id: number): Promise<void>;
}
