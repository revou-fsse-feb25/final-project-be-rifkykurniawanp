import { AssignmentsRepository } from './assignments.repository';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
export declare class AssignmentsService {
    private readonly repository;
    constructor(repository: AssignmentsRepository);
    create(dto: CreateAssignmentDto, user: any): Promise<{
        success: boolean;
        message: string;
        data: {
            title: string;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
            id: number;
            createdAt: Date;
        };
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: {
            title: string;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
            id: number;
            createdAt: Date;
        }[];
        meta: {
            total: number;
        };
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            isOverdue: boolean;
            title: string;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
            id: number;
            createdAt: Date;
        };
    }>;
    update(id: number, dto: UpdateAssignmentDto, user: any): Promise<{
        success: boolean;
        message: string;
        data: {
            title: string;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
            id: number;
            createdAt: Date;
        };
    }>;
    remove(id: number, user: any): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    private isAssignmentOverdue;
    private validateAssignmentDates;
}
