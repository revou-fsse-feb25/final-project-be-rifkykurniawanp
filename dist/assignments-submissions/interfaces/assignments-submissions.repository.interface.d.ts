import { AssignmentSubmission } from '@prisma/client';
import { CreateAssignmentSubmissionDto } from '../dto/request/create-submission.dto';
import { UpdateAssignmentSubmissionDto } from '../dto/request/update-submission.dto';
export interface PaginationOptions {
    page?: number;
    limit?: number;
}
export interface AssignmentSubmissionFilters {
    graded?: boolean;
    userId?: number;
}
export interface IAssignmentSubmissionRepository {
    create(assignmentId: number, userId: number, data: CreateAssignmentSubmissionDto): Promise<AssignmentSubmission>;
    findById(id: number): Promise<AssignmentSubmission | null>;
    findByIdWithRelations(id: number): Promise<AssignmentSubmission & {
        user: {
            id: number;
            firstName?: string;
            lastName?: string;
            email: string;
        };
        assignment: {
            id: number;
            title: string;
            dueDate?: Date | null;
        };
    } | null>;
    update(id: number, data: UpdateAssignmentSubmissionDto): Promise<AssignmentSubmission>;
    updateGrade(id: number, grade: number): Promise<AssignmentSubmission>;
    delete(id: number): Promise<void>;
    findByAssignmentId(assignmentId: number, filters?: AssignmentSubmissionFilters, pagination?: PaginationOptions): Promise<{
        submissions: (AssignmentSubmission & {
            user: {
                id: number;
                firstName?: string;
                lastName?: string;
                email: string;
            };
        })[];
        total: number;
    }>;
    findUserSubmission(assignmentId: number, userId: number): Promise<AssignmentSubmission | null>;
    exists(id: number): Promise<boolean>;
    userHasSubmission(assignmentId: number, userId: number): Promise<boolean>;
    isOwner(submissionId: number, userId: number): Promise<boolean>;
    getSubmissionStats(assignmentId: number): Promise<{
        totalSubmissions: number;
        gradedSubmissions: number;
        averageGrade?: number;
        highestGrade?: number;
        lowestGrade?: number;
    }>;
    getSubmissionWithCourse(submissionId: number): Promise<AssignmentSubmission & {
        assignment: {
            id: number;
            lesson: {
                module: {
                    course: {
                        id: number;
                        instructorId: number;
                    };
                };
            };
        };
    } | null>;
}
