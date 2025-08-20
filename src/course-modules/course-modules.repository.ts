import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICourseModulesRepository } from './interfaces/course-modules.repository.interface';
import { CourseModule } from '@prisma/client';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';

@Injectable()
export class CourseModulesRepository implements ICourseModulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateModuleDto & { courseId: number }): Promise<CourseModule> {
    return await this.prisma.courseModule.create({
      data: {
        title: data.title,
        orderNumber: data.orderNumber,
        courseId: data.courseId,
      },
      include: {
        course: { select: { id: true, title: true, instructorId: true } },
        lessons: { orderBy: { orderNumber: 'asc' } },
      },
    });
  }

  async findAll(): Promise<CourseModule[]> {
    return await this.prisma.courseModule.findMany({
      include: {
        course: { select: { id: true, title: true, instructorId: true } },
        lessons: { orderBy: { orderNumber: 'asc' } },
      },
      orderBy: [{ courseId: 'asc' }, { orderNumber: 'asc' }],
    });
  }

  async findById(id: number): Promise<CourseModule | null> {
    return await this.prisma.courseModule.findUnique({
      where: { id },
      include: {
        course: { select: { id: true, title: true, instructorId: true } },
        lessons: { orderBy: { orderNumber: 'asc' } },
      },
    });
  }

  async findByCourseId(courseId: number): Promise<CourseModule[]> {
    return await this.prisma.courseModule.findMany({
      where: { courseId },
      include: {
        course: { select: { id: true, title: true, instructorId: true } },
        lessons: { orderBy: { orderNumber: 'asc' } },
      },
      orderBy: { orderNumber: 'asc' },
    });
  }

  async update(id: number, data: UpdateModuleDto): Promise<CourseModule> {
    return await this.prisma.courseModule.update({
      where: { id },
      data,
      include: {
        course: { select: { id: true, title: true, instructorId: true } },
        lessons: { orderBy: { orderNumber: 'asc' } },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.courseModule.delete({ where: { id } });
  }

  async findByIdWithLessons(id: number): Promise<CourseModule & { lessons: any[] } | null> {
    return await this.prisma.courseModule.findUnique({
      where: { id },
      include: {
        course: { select: { id: true, title: true, instructorId: true } },
        lessons: {
          orderBy: { orderNumber: 'asc' },
          include: { progresses: true, assignments: true },
        },
      },
    });
  }

  async findByCourseIdWithLessons(courseId: number): Promise<(CourseModule & { lessons: any[] })[]> {
    return await this.prisma.courseModule.findMany({
      where: { courseId },
      include: {
        course: { select: { id: true, title: true, instructorId: true } },
        lessons: {
          orderBy: { orderNumber: 'asc' },
          include: { progresses: true, assignments: true },
        },
      },
      orderBy: { orderNumber: 'asc' },
    });
  }

  async checkCourseExists(courseId: number): Promise<boolean> {
    const course = await this.prisma.course.findUnique({ where: { id: courseId }, select: { id: true } });
    return !!course;
  }

  async checkModuleOwnership(moduleId: number, instructorId: number): Promise<boolean> {
    const module = await this.prisma.courseModule.findUnique({
      where: { id: moduleId },
      include: { course: { select: { instructorId: true } } },
    });
    return module?.course.instructorId === instructorId;
  }
}
