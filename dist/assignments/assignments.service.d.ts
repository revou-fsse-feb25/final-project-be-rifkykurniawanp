import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
import { CreateSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateSubmissionDto } from './dto/request/update-submission.dto';
import { AssignmentResponseDto } from './dto/response/assignment.response.dto';
import { SubmissionResponseDto } from './dto/response/submission.response.dto';
import { RoleName } from '@prisma/client';
export declare class AssignmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAssignmentDto, userId: number, role: RoleName): Promise<AssignmentResponseDto>;
    findAll(page: number, limit: number, role: RoleName): Promise<AssignmentResponseDto[]>;
    getDeleted(page: number, limit: number, role: RoleName): Promise<AssignmentResponseDto[]>;
    findByLesson(lessonId: number, userId: number, role: RoleName): Promise<AssignmentResponseDto[]>;
    findByCourse(courseId: number, userId: number, role: RoleName): Promise<AssignmentResponseDto[]>;
    findOne(id: number, userId: number, role: RoleName): Promise<AssignmentResponseDto>;
    update(id: number, dto: UpdateAssignmentDto, userId: number, role: RoleName): Promise<AssignmentResponseDto>;
    remove(id: number, userId: number, role: RoleName): Promise<{
        message: string;
    }>;
    forceDelete(id: number, role: RoleName): Promise<{
        message: string;
    }>;
    restore(id: number, role: RoleName): Promise<AssignmentResponseDto>;
    createSubmission(dto: CreateSubmissionDto, userId: number, role: RoleName): Promise<SubmissionResponseDto>;
    findSubmissionsByAssignment(assignmentId: number, userId: number, role: RoleName): Promise<SubmissionResponseDto[]>;
    findSubmissionsByUser(targetUserId: number, userId: number, role: RoleName): Promise<SubmissionResponseDto[]>;
    updateSubmission(id: number, dto: UpdateSubmissionDto, userId: number, role: RoleName): Promise<SubmissionResponseDto>;
    removeSubmission(id: number, userId: number, role: RoleName): Promise<{
        message: string;
    }>;
    private mapAssignment;
    private mapSubmission;
}
