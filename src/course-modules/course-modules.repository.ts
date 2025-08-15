import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICourseModulesRepository } from './interfaces/course-modules.repository.interface';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseModulesRepository implements ICourseModulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateModuleDto) {
    return this.prisma.courseModule.create({
      data,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        lessons: {
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            duration: true,
            orderNumber: true,
          },
          orderBy: {
            orderNumber: 'asc',
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.courseModule.findMany({
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        lessons: {
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            duration: true,
            orderNumber: true,
          },
          orderBy: {
            orderNumber: 'asc',
          },
        },
      },
      orderBy: {
        orderNumber: 'asc',
      },
    });
  }

  async findById(id: number) {
    return this.prisma.courseModule.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        lessons: {
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            duration: true,
            orderNumber: true,
          },
          orderBy: {
            orderNumber: 'asc',
          },
        },
      },
    });
  }

  async findByCourseId(courseId: number) {
    return this.prisma.courseModule.findMany({
      where: { courseId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        lessons: {
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            duration: true,
            orderNumber: true,
          },
          orderBy: {
            orderNumber: 'asc',
          },
        },
      },
      orderBy: {
        orderNumber: 'asc',
      },
    });
  }

  async update(id: number, data: UpdateModuleDto) {
    return this.prisma.courseModule.update({
      where: { id },
      data,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        lessons: {
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            duration: true,
            orderNumber: true,
          },
          orderBy: {
            orderNumber: 'asc',
          },
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.courseModule.delete({
      where: { id },
    });
  }
}