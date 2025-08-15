// src/courses/courses.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Course } from '@prisma/client';
import {
  ICoursesRepository,
  CreateCourseData,
  UpdateCourseData,
  CourseFilter,
} from './interfaces/courses.repository.interface';
import {
  COURSE_INCLUDE_BASIC,
  COURSE_INCLUDE_WITH_MODULES,
  COURSE_INCLUDE_FULL,
  ORDER_BY_CREATED_DESC,
  buildCourseWhere,
} from './constants/courses.constants';

@Injectable()
export class CoursesRepository implements ICoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCourseData): Promise<Course> {
    return this.prisma.course.create({
      data,
      include: COURSE_INCLUDE_WITH_MODULES,
    });
  }

  async findById(id: number): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { id },
      include: COURSE_INCLUDE_FULL,
    });
  }

  async findBySlug(slug: string): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { slug },
      include: COURSE_INCLUDE_WITH_MODULES,
    });
  }

  async findAll(skip = 0, take = 10, filter?: CourseFilter): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: buildCourseWhere(filter),
      skip,
      take,
      include: COURSE_INCLUDE_BASIC,
      orderBy: ORDER_BY_CREATED_DESC,
    });
  }

  async update(id: number, data: UpdateCourseData): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data,
      include: COURSE_INCLUDE_WITH_MODULES,
    });
  }

  async delete(id: number): Promise<Course> {
    return this.prisma.course.delete({ where: { id } });
  }

  async updateRating(id: number, rating: number): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data: { rating },
    });
  }

  async incrementStudentCount(id: number): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data: { students: { increment: 1 } },
    });
  }

  async findByInstructorId(instructorId: number): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: { instructorId },
      include: COURSE_INCLUDE_WITH_MODULES,
      orderBy: ORDER_BY_CREATED_DESC,
    });
  }
}
