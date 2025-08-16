import { SubmitAssignmentDto } from '../dto/request/submit-assignment.dto';
import { UpdateSubmissionDto } from '../dto/request/update-submission.dto';
export interface IAssignmentSubmissionsRepository {
    submit(dto: SubmitAssignmentDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, dto: UpdateSubmissionDto): any;
    remove(id: number): any;
}
