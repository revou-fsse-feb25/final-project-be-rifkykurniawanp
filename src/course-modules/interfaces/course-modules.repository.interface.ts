import { CreateCourseModuleDto } from '../dto/request/create-course-module.dto';
import { UpdateCourseModuleDto } from '../dto/request/update-course-module.dto';

export interface CourseModuleFilter {
  courseId?: number;
  deletedAt?: Date | null;
}

export interface ICourseModulesRepository {
  create(data: CreateCourseModuleDto & { courseId: number }): Promise<any>;
  findAll(skip: number, take: number, filter?: CourseModuleFilter): Promise<any[]>;
  findById(id: number, filter?: CourseModuleFilter): Promise<any>;
  findByIdIncludingDeleted(id: number): Promise<any>;
  update(id: number, data: UpdateCourseModuleDto): Promise<any>;
  softDelete(id: number): Promise<any>;
  hardDelete(id: number): Promise<any>;
  restore(id: number): Promise<any>;
}
