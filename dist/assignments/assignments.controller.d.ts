import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
import { CreateSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateSubmissionDto } from './dto/request/update-submission.dto';
import { AssignmentResponseDto } from './dto/response/assignment.response.dto';
import { SubmissionResponseDto } from './dto/response/submission.response.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    create(dto: CreateAssignmentDto, req: any): Promise<AssignmentResponseDto>;
    findAll(page?: string, limit?: string, req?: any): Promise<AssignmentResponseDto[]>;
    getDeleted(page?: string, limit?: string, req?: any): Promise<AssignmentResponseDto[]>;
    findByLesson(lessonId: number, req: any): Promise<AssignmentResponseDto[]>;
    findByCourse(courseId: number, req: any): Promise<AssignmentResponseDto[]>;
    findOne(id: number, req: any): Promise<AssignmentResponseDto>;
    update(id: number, dto: UpdateAssignmentDto, req: any): Promise<AssignmentResponseDto>;
    remove(id: number, req: any): Promise<{
        message: string;
    }>;
    forceDelete(id: number, req: any): Promise<{
        message: string;
    }>;
    restore(id: number, req: any): Promise<AssignmentResponseDto>;
    createSubmission(dto: CreateSubmissionDto, req: any): Promise<SubmissionResponseDto>;
    getSubmissionsByAssignment(assignmentId: number, req: any): Promise<SubmissionResponseDto[]>;
    getSubmissionsByUser(userId: number, req: any): Promise<SubmissionResponseDto[]>;
    updateSubmission(id: number, dto: UpdateSubmissionDto, req: any): Promise<SubmissionResponseDto>;
    removeSubmission(id: number, req: any): Promise<{
        message: string;
    }>;
}
