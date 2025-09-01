import { AssignmentSubmissionService } from './assignment-submissions.service';
import { CreateAssignmentSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateAssignmentSubmissionDto } from './dto/request/update-submission.dto';
import { GradeAssignmentSubmissionDto } from './dto/request/grade-assignment-submission.dto';
import { AssignmentSubmissionListResponseDto, AssignmentSubmissionResponseDto, AssignmentSubmissionStatsDto } from './dto/response/submission.response.dto';
export declare class SubmissionController {
    private readonly submissionService;
    constructor(submissionService: AssignmentSubmissionService);
    getAssignmentSubmissions(assignmentId: number, req: any, page?: number, limit?: number, graded?: boolean, userId?: number): Promise<AssignmentSubmissionListResponseDto>;
    submitAssignment(assignmentId: number, createSubmissionDto: CreateAssignmentSubmissionDto, req: any): Promise<AssignmentSubmissionResponseDto>;
    getSubmissionById(id: number, req: any): Promise<AssignmentSubmissionResponseDto>;
    updateSubmission(id: number, updateSubmissionDto: UpdateAssignmentSubmissionDto, req: any): Promise<AssignmentSubmissionResponseDto>;
    deleteSubmission(id: number, req: any): Promise<void>;
    gradeSubmission(id: number, gradeSubmissionDto: GradeAssignmentSubmissionDto, req: any): Promise<AssignmentSubmissionResponseDto>;
    getSubmissionStats(assignmentId: number, req: any): Promise<AssignmentSubmissionStatsDto>;
}
