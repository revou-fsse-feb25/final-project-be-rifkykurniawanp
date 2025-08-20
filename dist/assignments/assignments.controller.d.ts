import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            lessonId: number;
            title: string;
            instructions: string;
            dueDate: Date | null;
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
            id: number;
            lessonId: number;
            title: string;
            instructions: string;
            dueDate: Date | null;
            createdAt: Date;
        };
    }>;
    create(dto: CreateAssignmentDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            lessonId: number;
            title: string;
            instructions: string;
            dueDate: Date | null;
            createdAt: Date;
        };
    }>;
    update(id: number, dto: UpdateAssignmentDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            lessonId: number;
            title: string;
            instructions: string;
            dueDate: Date | null;
            createdAt: Date;
        };
    }>;
    remove(id: number, req: any): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
}
