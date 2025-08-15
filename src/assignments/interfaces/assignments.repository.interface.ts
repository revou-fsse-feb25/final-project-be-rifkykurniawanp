import { CreateAssignmentDto } from '../dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from '../dto/request/update-assignment.dto';

export interface IAssignmentsRepository {
  create(dto: CreateAssignmentDto);
  findAll();
  findOne(id: number);
  update(id: number, dto: UpdateAssignmentDto);
  remove(id: number);
}
