import { PrismaService } from '../prisma/prisma.service';
import { ICourseModulesRepository } from './interfaces/course-modules.repository.interface';
import { CourseModule } from '@prisma/client';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';
export declare class CourseModulesRepository implements ICourseModulesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateModuleDto & {
        courseId: number;
    }): Promise<CourseModule>;
    findAll(): Promise<CourseModule[]>;
    findById(id: number): Promise<CourseModule | null>;
    findByCourseId(courseId: number): Promise<CourseModule[]>;
    update(id: number, data: UpdateModuleDto): Promise<CourseModule>;
    delete(id: number): Promise<void>;
    findByIdWithLessons(id: number): Promise<CourseModule & {
        lessons: any[];
    } | null>;
    findByCourseIdWithLessons(courseId: number): Promise<(CourseModule & {
        lessons: any[];
    })[]>;
    checkCourseExists(courseId: number): Promise<boolean>;
    checkModuleOwnership(moduleId: number, instructorId: number): Promise<boolean>;
}
