import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICourseModulesRepository, CourseModuleFilter } from './interfaces/course-modules.repository.interface';
import { CreateCourseModuleDto } from './dto/request/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/request/update-course-module.dto';

@Injectable()
export class CourseModulesRepository implements ICourseModulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCourseModuleDto & { courseId: number }) {
    return this.prisma.courseModule.create({ data });
  }

  async findAll(skip: number, take: number, filter: CourseModuleFilter = {}) {
    return this.prisma.courseModule.findMany({
      skip,
      take,
      where: {
        courseId: filter.courseId,
        deletedAt: filter.deletedAt ?? null,
      },
      orderBy: { orderNumber: 'asc' },
      include: { lessons: true, course: true },
    });
  }

  async findById(id: number, filter: CourseModuleFilter = {}) {
    return this.prisma.courseModule.findFirst({
      where: { id, deletedAt: filter.deletedAt ?? null },
      include: { lessons: true, course: true },
    });
  }

  async findByIdIncludingDeleted(id: number) {
    return this.prisma.courseModule.findUnique({
      where: { id },
      include: { lessons: true, course: true },
    });
  }

  async update(id: number, data: UpdateCourseModuleDto) {
    return this.prisma.courseModule.update({
      where: { id },
      data,
      include: { lessons: true, course: true },
    });
  }

  async softDelete(id: number) {
    return this.prisma.courseModule.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(id: number) {
    return this.prisma.courseModule.delete({ where: { id } });
  }

  async restore(id: number) {
    return this.prisma.courseModule.update({
      where: { id },
      data: { deletedAt: null },
      include: { lessons: true, course: true },
    });
  }
}
