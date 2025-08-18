import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    getAllAssignments(): Promise<{
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
    getAssignment(id: string): Promise<{
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
    createAssignment(dto: CreateAssignmentDto, req: any): Promise<{
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
    updateAssignment(id: string, dto: UpdateAssignmentDto, req: any): Promise<{
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
    deleteAssignment(id: string, req: any): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
}
