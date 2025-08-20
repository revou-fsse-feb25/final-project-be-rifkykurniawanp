import { PrismaService } from '../prisma/prisma.service';
import { AssignmentSubmission } from '@prisma/client';
import { CreateAssignmentSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateAssignmentSubmissionDto } from './dto/request/update-submission.dto';
import { IAssignmentSubmissionRepository, PaginationOptions, AssignmentSubmissionFilters } from './interfaces/assignments-submissions.repository.interface';
export declare class AssignmentSubmissionRepository implements IAssignmentSubmissionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(assignmentId: number, userId: number, data: CreateAssignmentSubmissionDto): Promise<AssignmentSubmission>;
    findById(id: number): Promise<AssignmentSubmission | null>;
    findByIdWithRelations(id: number): Promise<{
        user: {
            firstName: string | undefined;
            lastName: string | undefined;
            id: number;
            email: string;
        };
        assignment: {
            dueDate: Date | undefined;
            id: number;
            title: string;
        };
        id: number;
        assignmentId: number;
        userId: number;
        content: string | null;
        grade: import("@prisma/client/runtime/library").Decimal | null;
        submittedAt: Date;
    } | null>;
    update(id: number, data: UpdateAssignmentSubmissionDto): Promise<AssignmentSubmission>;
    updateGrade(id: number, grade: number): Promise<AssignmentSubmission>;
    delete(id: number): Promise<void>;
    findByAssignmentId(assignmentId: number, filters?: AssignmentSubmissionFilters, pagination?: PaginationOptions): Promise<{
        submissions: {
            user: {
                firstName: string | undefined;
                lastName: string | undefined;
                id: number;
                email: string;
            };
            assignment: {
                dueDate: Date | undefined;
                id: number;
                title: string;
            };
            id: number;
            assignmentId: number;
            userId: number;
            content: string | null;
            grade: import("@prisma/client/runtime/library").Decimal | null;
            submittedAt: Date;
        }[];
        total: number;
    }>;
    findUserSubmission(assignmentId: number, userId: number): Promise<AssignmentSubmission | null>;
    exists(id: number): Promise<boolean>;
    userHasSubmission(assignmentId: number, userId: number): Promise<boolean>;
    isOwner(submissionId: number, userId: number): Promise<boolean>;
    getSubmissionStats(assignmentId: number): Promise<{
        totalSubmissions: number;
        gradedSubmissions: number;
        averageGrade: number | undefined;
        highestGrade: number | undefined;
        lowestGrade: number | undefined;
    }>;
    getSubmissionWithCourse(submissionId: number): Promise<({
        assignment: {
            lesson: {
                module: {
                    course: {
                        id: number;
                        instructorId: number;
                    };
                } & {
                    id: number;
                    title: string;
                    orderNumber: number;
                    courseId: number;
                };
            } & {
                id: number;
                content: string | null;
                createdAt: Date;
                title: string;
                description: string | null;
                slug: string | null;
                duration: string | null;
                moduleId: number;
                type: import(".prisma/client").$Enums.LessonType;
                videoUrl: string | null;
                quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
                passingScore: import("@prisma/client/runtime/library").Decimal;
                orderNumber: number;
            };
        } & {
            id: number;
            createdAt: Date;
            lessonId: number;
            title: string;
            instructions: string;
            dueDate: Date | null;
        };
    } & {
        id: number;
        assignmentId: number;
        userId: number;
        content: string | null;
        grade: import("@prisma/client/runtime/library").Decimal | null;
        submittedAt: Date;
    }) | null>;
}
