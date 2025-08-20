import { Injectable, Inject, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ICourseModulesRepository } from './interfaces/course-modules.repository.interface';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';
import { ModuleResponseDto } from './dto/response/module.response.dto';

@Injectable()
export class CourseModulesService {
  constructor(
    @Inject('ICourseModulesRepository')
    private readonly courseModulesRepository: ICourseModulesRepository,
  ) {}

  async findByCourseWithAccess(courseId: number, user: any): Promise<ModuleResponseDto[]> {
    const courseExists = await this.courseModulesRepository.checkCourseExists(courseId);
    if (!courseExists) {
      throw new NotFoundException('Course not found');
    }

    if (user.role === 'USER') {
      // TODO: cek enrollment
    }

    const modules = await this.courseModulesRepository.findByCourseIdWithLessons(courseId);
    return modules.map(module => this.mapToResponseDto(module));
  }

  async findOneWithAccess(id: number, user: any): Promise<ModuleResponseDto> {
    const module = await this.courseModulesRepository.findByIdWithLessons(id);
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    if (user.role === 'USER') {
      // TODO: cek enrollment
    }

    return this.mapToResponseDto(module);
  }

  async createForCourse(courseId: number, createModuleDto: CreateModuleDto, user: any): Promise<ModuleResponseDto> {
    const courseExists = await this.courseModulesRepository.checkCourseExists(courseId);
    if (!courseExists) {
      throw new NotFoundException('Course not found');
    }

    if (user.role === 'INSTRUCTOR') {
      // TODO: cek kepemilikan course
    }

    try {
      const module = await this.courseModulesRepository.create({
        ...createModuleDto,
        courseId,
      });
      return this.mapToResponseDto(module);
    } catch {
      throw new BadRequestException('Failed to create module');
    }
  }

  async updateWithOwnership(id: number, updateModuleDto: UpdateModuleDto, user: any): Promise<ModuleResponseDto> {
    const module = await this.courseModulesRepository.findById(id);
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    if (user.role === 'INSTRUCTOR') {
      const hasAccess = await this.courseModulesRepository.checkModuleOwnership(id, user.id);
      if (!hasAccess) {
        throw new ForbiddenException('You do not have permission to update this module');
      }
    }

    try {
      const updatedModule = await this.courseModulesRepository.update(id, updateModuleDto);
      return this.mapToResponseDto(updatedModule);
    } catch {
      throw new BadRequestException('Failed to update module');
    }
  }

  async removeWithOwnership(id: number, user: any): Promise<void> {
    const module = await this.courseModulesRepository.findById(id);
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    if (user.role === 'INSTRUCTOR') {
      const hasAccess = await this.courseModulesRepository.checkModuleOwnership(id, user.id);
      if (!hasAccess) {
        throw new ForbiddenException('You do not have permission to delete this module');
      }
    }

    try {
      await this.courseModulesRepository.delete(id);
    } catch {
      throw new BadRequestException('Failed to delete module');
    }
  }

  private mapToResponseDto(module: any): ModuleResponseDto {
    return {
      id: module.id,
      courseId: module.courseId,
      title: module.title,
      orderNumber: module.orderNumber,
      course: {
        id: module.course.id,
        title: module.course.title,
        instructorId: module.course.instructorId,
      },
      lessons: module.lessons?.map(lesson => ({
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        type: lesson.type,
        orderNumber: lesson.orderNumber,
      })) || [],
      createdAt: module.createdAt || new Date(),
    };
  }
}
