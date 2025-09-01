import { PrismaService } from '../prisma/prisma.service';
import { AssignmentSubmissionRepository } from './assignment-submissions.repository';
import { CreateAssignmentSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateAssignmentSubmissionDto } from './dto/request/update-submission.dto';
import { GradeAssignmentSubmissionDto } from './dto/request/grade-assignment-submission.dto';
import { AssignmentSubmissionListResponseDto, AssignmentSubmissionResponseDto, AssignmentSubmissionStatsDto } from './dto/response/submission.response.dto';
import { RoleName } from '@prisma/client';
export declare class AssignmentSubmissionService {
    private readonly submissionRepository;
    private readonly prisma;
    constructor(submissionRepository: AssignmentSubmissionRepository, prisma: PrismaService);
    submitAssignment(assignmentId: number, createSubmissionDto: CreateAssignmentSubmissionDto, userId: number): Promise<AssignmentSubmissionResponseDto>;
    getAssignmentSubmissions(assignmentId: number, userId: number, userRole: RoleName, page?: number, limit?: number, graded?: boolean, filterUserId?: number): Promise<AssignmentSubmissionListResponseDto>;
    getSubmissionById(submissionId: number, userId: number, userRole: RoleName): Promise<AssignmentSubmissionResponseDto>;
    updateSubmission(submissionId: number, updateSubmissionDto: UpdateAssignmentSubmissionDto, userId: number, userRole: RoleName): Promise<AssignmentSubmissionResponseDto>;
    deleteSubmission(submissionId: number, userId: number, userRole: RoleName): Promise<void>;
    gradeSubmission(submissionId: number, gradeSubmissionDto: GradeAssignmentSubmissionDto, userId: number, userRole: RoleName): Promise<AssignmentSubmissionResponseDto>;
    getSubmissionStats(assignmentId: number, userId: number, userRole: RoleName): Promise<AssignmentSubmissionStatsDto>;
    private mapSubmissionToResponse;
}
