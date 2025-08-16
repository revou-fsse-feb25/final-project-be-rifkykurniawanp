import { AssignmentsRepository } from './assignments.repository';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
export declare class AssignmentsService {
    private readonly repository;
    constructor(repository: AssignmentsRepository);
    create(dto: CreateAssignmentDto): import(".prisma/client").Prisma.Prisma__AssignmentClient<{
        id: number;
        createdAt: Date;
        title: string;
        lessonId: number;
        instructions: string;
        dueDate: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        title: string;
        lessonId: number;
        instructions: string;
        dueDate: Date | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__AssignmentClient<{
        id: number;
        createdAt: Date;
        title: string;
        lessonId: number;
        instructions: string;
        dueDate: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateAssignmentDto): import(".prisma/client").Prisma.Prisma__AssignmentClient<{
        id: number;
        createdAt: Date;
        title: string;
        lessonId: number;
        instructions: string;
        dueDate: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__AssignmentClient<{
        id: number;
        createdAt: Date;
        title: string;
        lessonId: number;
        instructions: string;
        dueDate: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
