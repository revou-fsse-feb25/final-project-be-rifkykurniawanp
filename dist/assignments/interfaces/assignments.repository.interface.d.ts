import { CreateAssignmentDto } from '../dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from '../dto/request/update-assignment.dto';
export interface IAssignmentsRepository {
    create(dto: CreateAssignmentDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, dto: UpdateAssignmentDto): any;
    remove(id: number): any;
}
