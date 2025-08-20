import { CourseModule } from '@prisma/client';
import { CreateModuleDto } from '../dto/request/create-module.dto';
import { UpdateModuleDto } from '../dto/request/update-module.dto';

export interface ICourseModulesRepository {
  checkCourseExists(courseId: number): Promise<boolean>;
  findByCourseIdWithLessons(courseId: number): Promise<any[]>;
  findByIdWithLessons(id: number): Promise<any | null>;
  create(data: CreateModuleDto & { courseId: number }): Promise<any>;
  findById(id: number): Promise<any | null>;
  update(id: number, data: UpdateModuleDto): Promise<any>;
  delete(id: number): Promise<void>;
  checkModuleOwnership(id: number, userId: number): Promise<boolean>;
}