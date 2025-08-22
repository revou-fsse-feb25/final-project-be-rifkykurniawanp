import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CourseModulesRepository } from './course-modules.repository';
import { CreateCourseModuleDto } from './dto/request/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/request/update-course-module.dto';
import { CourseModuleResponseDto } from './dto/response/course-module.response.dto';

@Injectable()
export class CourseModulesService {
  constructor(private readonly repo: CourseModulesRepository) {}

  async create(createDto: CreateCourseModuleDto, courseId: number): Promise<CourseModuleResponseDto> {
    const module = await this.repo.create({ ...createDto, courseId });
    return this.toResponseDto(module);
  }

  async findAll(courseId: number, page = 1, limit = 10): Promise<CourseModuleResponseDto[]> {
    const skip = (page - 1) * limit;
    const modules = await this.repo.findAll(skip, limit, { courseId, deletedAt: null });
    return modules.map(m => this.toResponseDto(m));
  }

  async findOne(id: number): Promise<CourseModuleResponseDto> {
    const module = await this.repo.findById(id, { deletedAt: null });
    if (!module) throw new NotFoundException('Course module not found');
    return this.toResponseDto(module);
  }

  async update(id: number, updateDto: UpdateCourseModuleDto): Promise<CourseModuleResponseDto> {
    const existing = await this.repo.findById(id, { deletedAt: null });
    if (!existing) throw new NotFoundException('Course module not found');
    const updated = await this.repo.update(id, updateDto);
    return this.toResponseDto(updated);
  }

  async remove(id: number): Promise<void> {
    const existing = await this.repo.findById(id, { deletedAt: null });
    if (!existing) throw new NotFoundException('Course module not found');
    await this.repo.softDelete(id);
  }

  async forceDelete(id: number): Promise<void> {
    const existing = await this.repo.findByIdIncludingDeleted(id);
    if (!existing) throw new NotFoundException('Course module not found');
    await this.repo.hardDelete(id);
  }

  async restore(id: number): Promise<CourseModuleResponseDto> {
    const module = await this.repo.findByIdIncludingDeleted(id);
    if (!module || !module.deletedAt) throw new NotFoundException('Deleted course module not found');
    const restored = await this.repo.restore(id);
    return this.toResponseDto(restored);
  }

  private toResponseDto(module: any): CourseModuleResponseDto {
    return {
      id: module.id,
      title: module.title,
      orderNumber: module.orderNumber,
      courseId: module.courseId,
      lessons: module.lessons,
      createdAt: module.createdAt,
    };
  }
}
