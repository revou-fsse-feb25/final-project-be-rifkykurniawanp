import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICoursesRepository, CourseFilter } from './interfaces/courses.repository.interface';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { Prisma, Course } from '@prisma/client';

@Injectable()
export class CoursesRepository implements ICoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** Create course with all required fields */
  async create(data: CreateCourseDto & { instructorId: number }): Promise<Course> {
    return this.prisma.course.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        syllabus: data.syllabus,
        price: data.price,
        level: data.level,
        category: data.category,
        instructorId: data.instructorId,
        duration: data.duration,
        language: data.language,
        certificate: data.certificate,
      },
      include: {
        instructor: true,
        modules: true,
        enrollments: true,
        cartItems: true,
      },
    });
  }

  async findAll(skip: number, take: number, filter?: CourseFilter): Promise<Course[]> {
    return this.prisma.course.findMany({
      skip,
      take,
      where: { ...filter },
      orderBy: { createdAt: 'desc' },
      include: { instructor: true, modules: true, enrollments: true, cartItems: true },
    });
  }

  async findById(id: number, filter?: CourseFilter): Promise<Course | null> {
    return this.prisma.course.findFirst({
      where: { id, ...filter },
      include: { instructor: true, modules: true, enrollments: true, cartItems: true },
    });
  }

  async findByIdIncludingDeleted(id: number): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { id },
      include: { instructor: true, modules: true, enrollments: true, cartItems: true },
    });
  }

  async findBySlug(slug: string, filter?: CourseFilter): Promise<Course | null> {
    return this.prisma.course.findFirst({
      where: { slug, ...filter },
      include: { instructor: true, modules: true, enrollments: true, cartItems: true },
    });
  }

  async findBySlugIncludingDeleted(slug: string): Promise<Course | null> {
    return this.prisma.course.findFirst({
      where: { slug },
      include: { instructor: true, modules: true, enrollments: true, cartItems: true },
    });
  }

  async findByInstructorId(instructorId: number, filter?: CourseFilter): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: { instructorId, ...filter },
      include: { instructor: true, modules: true, enrollments: true, cartItems: true },
    });
  }

  async update(id: number, data: UpdateCourseDto): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data,
      include: { instructor: true, modules: true, enrollments: true, cartItems: true },
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.prisma.course.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(id: number): Promise<void> {
    await this.prisma.course.delete({ where: { id } });
  }

  async restore(id: number): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data: { deletedAt: null },
      include: { instructor: true, modules: true, enrollments: true, cartItems: true },
    });
  }
}
