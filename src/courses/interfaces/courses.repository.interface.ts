// src/courses/interfaces/courses.repository.interface.ts
import { Course, CourseCategory, CourseLevel } from '@prisma/client';

export interface CreateCourseData {
  title: string;
  slug: string;
  description?: string;
  syllabus?: string;
  price: number;
  instructorId: number;
  duration?: string;
  level: CourseLevel;
  category: CourseCategory;
  language?: string;
  certificate?: boolean;
}

export interface UpdateCourseData {
  title?: string;
  slug?: string;
  description?: string;
  syllabus?: string;
  price?: number;
  duration?: string;
  level?: CourseLevel;
  category?: CourseCategory;
  language?: string;
  certificate?: boolean;
}

export interface CourseFilter {
  category?: CourseCategory;
  level?: CourseLevel;
  instructorId?: number;
  minPrice?: number;
  maxPrice?: number;
  language?: string;
  certificate?: boolean;
}

export interface ICoursesRepository {
  create(data: CreateCourseData): Promise<Course>;
  findById(id: number): Promise<Course | null>;
  findBySlug(slug: string): Promise<Course | null>;
  findAll(skip?: number, take?: number, filter?: CourseFilter): Promise<Course[]>;
  update(id: number, data: UpdateCourseData): Promise<Course>;
  delete(id: number): Promise<Course>;
  updateRating(id: number, rating: number): Promise<Course>;
  incrementStudentCount(id: number): Promise<Course>;
  findByInstructorId(instructorId: number): Promise<Course[]>;
}
