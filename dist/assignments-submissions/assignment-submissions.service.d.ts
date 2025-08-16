import { AssignmentSubmissionsRepository } from './assignment-submissions.repository';
import { SubmitAssignmentDto } from './dto/request/submit-assignment.dto';
import { UpdateSubmissionDto } from './dto/request/update-submission.dto';
export declare class AssignmentSubmissionsService {
    private readonly repository;
    constructor(repository: AssignmentSubmissionsRepository);
    submit(dto: SubmitAssignmentDto): import(".prisma/client").Prisma.Prisma__AssignmentSubmissionClient<{
        id: number;
        content: string | null;
        userId: number;
        assignmentId: number;
        grade: import("@prisma/client/runtime/library").Decimal | null;
        submittedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        content: string | null;
        userId: number;
        assignmentId: number;
        grade: import("@prisma/client/runtime/library").Decimal | null;
        submittedAt: Date;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__AssignmentSubmissionClient<{
        id: number;
        content: string | null;
        userId: number;
        assignmentId: number;
        grade: import("@prisma/client/runtime/library").Decimal | null;
        submittedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateSubmissionDto): import(".prisma/client").Prisma.Prisma__AssignmentSubmissionClient<{
        id: number;
        content: string | null;
        userId: number;
        assignmentId: number;
        grade: import("@prisma/client/runtime/library").Decimal | null;
        submittedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__AssignmentSubmissionClient<{
        id: number;
        content: string | null;
        userId: number;
        assignmentId: number;
        grade: import("@prisma/client/runtime/library").Decimal | null;
        submittedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
