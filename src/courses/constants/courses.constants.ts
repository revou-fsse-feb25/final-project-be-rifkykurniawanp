// src/courses/constants/courses.constants.ts
import { Prisma } from '@prisma/client';
import { CourseFilter } from '../interfaces/courses.repository.interface';

/* ====== SELECT & INCLUDE CONSTANTS ====== */
export const INSTRUCTOR_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
} satisfies Prisma.UserSelect;

export const STUDENT_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
} satisfies Prisma.UserSelect;

export const LESSONS_INCLUDE = {
  lessons: {
    orderBy: { orderNumber: 'asc' as const },
  },
}; // Removed type assertion to Prisma.ModuleFindManyArgs as it does not exist

export const MODULES_INCLUDE = {
  include: LESSONS_INCLUDE,
  orderBy: { orderNumber: 'asc' as const },
};

export const COURSE_INCLUDE_BASIC = {
  instructor: { select: INSTRUCTOR_SELECT },
} satisfies Prisma.CourseInclude;

export const COURSE_INCLUDE_WITH_MODULES = {
  ...COURSE_INCLUDE_BASIC,
  modules: MODULES_INCLUDE,
} satisfies Prisma.CourseInclude;

export const COURSE_INCLUDE_FULL = {
  ...COURSE_INCLUDE_WITH_MODULES,
  enrollments: {
    include: {
      student: { select: STUDENT_SELECT },
    },
  },
} satisfies Prisma.CourseInclude;

export const ORDER_BY_CREATED_DESC = { createdAt: 'desc' as const };

/* ====== WHERE FILTER BUILDER ====== */
export function buildCourseWhere(filter?: CourseFilter): Prisma.CourseWhereInput {
  if (!filter) return {};

  const where: Prisma.CourseWhereInput = {};

  if (filter.category) where.category = filter.category;
  if (filter.level) where.level = filter.level;
  if (typeof filter.instructorId === 'number') where.instructorId = filter.instructorId;
  if (filter.language) where.language = filter.language;
  if (typeof filter.certificate === 'boolean') where.certificate = filter.certificate;

  if (filter.minPrice != null || filter.maxPrice != null) {
    where.price = {};
    if (filter.minPrice != null) where.price.gte = filter.minPrice;
    if (filter.maxPrice != null) where.price.lte = filter.maxPrice;
  }

  return where;
}
