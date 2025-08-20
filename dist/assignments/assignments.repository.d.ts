import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
export declare class AssignmentsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAssignmentDto): import(".prisma/client").Prisma.Prisma__AssignmentClient<{
        id: number;
        lessonId: number;
        title: string;
        instructions: string;
        dueDate: Date | null;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        lessonId: number;
        title: string;
        instructions: string;
        dueDate: Date | null;
        createdAt: Date;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__AssignmentClient<{
        id: number;
        lessonId: number;
        title: string;
        instructions: string;
        dueDate: Date | null;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateAssignmentDto): import(".prisma/client").Prisma.Prisma__AssignmentClient<{
        id: number;
        lessonId: number;
        title: string;
        instructions: string;
        dueDate: Date | null;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__AssignmentClient<{
        id: number;
        lessonId: number;
        title: string;
        instructions: string;
        dueDate: Date | null;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
