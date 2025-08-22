import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { CourseResponseDto } from './dto/response/course.response.dto';
import { CourseFilter } from './interfaces/courses.repository.interface';
import { RoleName } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private coursesRepository: CoursesRepository) {}

  async create(createCourseDto: CreateCourseDto, currentUserId: number, currentUserRole: RoleName): Promise<CourseResponseDto> {
    // Check for existing course with same slug (including soft deleted)
    const existingCourse = await this.coursesRepository.findBySlugIncludingDeleted(createCourseDto.slug);
    if (existingCourse && !existingCourse.deletedAt) {
      throw new BadRequestException('Course slug already exists');
    }

    // Set instructorId based on role
    let instructorId = createCourseDto.instructorId;
    if (currentUserRole === 'INSTRUCTOR') {
      instructorId = currentUserId; // Instructors can only create courses for themselves
    } else if (currentUserRole !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN and INSTRUCTOR can create courses');
    }

    const course = await this.coursesRepository.create({
      ...createCourseDto,
      instructorId,
    });
    return this.toResponseDto(course);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter?: CourseFilter,
  ): Promise<CourseResponseDto[]> {
    const skip = (page - 1) * limit;
    // Add deletedAt: null filter to exclude soft deleted courses
    const courses = await this.coursesRepository.findAll(skip, limit, {
      ...filter,
      deletedAt: null
    });
    return courses.map(course => this.toResponseDto(course));
  }

  async findOne(id: number): Promise<CourseResponseDto> {
    const course = await this.coursesRepository.findById(id, { deletedAt: null });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.toResponseDto(course);
  }

  async findBySlug(slug: string): Promise<CourseResponseDto> {
    const course = await this.coursesRepository.findBySlug(slug, { deletedAt: null });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.toResponseDto(course);
  }

  async findByInstructorId(instructorId: number): Promise<CourseResponseDto[]> {
    const courses = await this.coursesRepository.findByInstructorId(instructorId, { deletedAt: null });
    return courses.map(course => this.toResponseDto(course));
  }

  async update(
    id: number, 
    updateCourseDto: UpdateCourseDto, 
    currentUserId: number, 
    currentUserRole: RoleName
  ): Promise<CourseResponseDto> {
    const existingCourse = await this.coursesRepository.findById(id, { deletedAt: null });
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }

    // Check ownership permissions
    if (currentUserRole === 'INSTRUCTOR' && existingCourse.instructorId !== currentUserId) {
      throw new ForbiddenException('You can only update your own courses');
    } else if (currentUserRole !== 'ADMIN' && currentUserRole !== 'INSTRUCTOR') {
      throw new ForbiddenException('Only ADMIN and INSTRUCTOR can update courses');
    }

    if (updateCourseDto.slug && updateCourseDto.slug !== existingCourse.slug) {
      const slugExists = await this.coursesRepository.findBySlug(updateCourseDto.slug, { deletedAt: null });
      if (slugExists) {
        throw new BadRequestException('Course slug already exists');
      }
    }

    const course = await this.coursesRepository.update(id, updateCourseDto);
    return this.toResponseDto(course);
  }

  // Soft delete implementation
  async remove(id: number, currentUserId: number, currentUserRole: RoleName): Promise<void> {
    const existingCourse = await this.coursesRepository.findById(id, { deletedAt: null });
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }

    // Check ownership permissions
    if (currentUserRole === 'INSTRUCTOR' && existingCourse.instructorId !== currentUserId) {
      throw new ForbiddenException('You can only delete your own courses');
    } else if (currentUserRole !== 'ADMIN' && currentUserRole !== 'INSTRUCTOR') {
      throw new ForbiddenException('Only ADMIN and INSTRUCTOR can delete courses');
    }

    // Perform soft delete by setting deletedAt timestamp
    await this.coursesRepository.softDelete(id);
  }

  // Hard delete for admin purposes (optional)
  async forceDelete(id: number, currentUserRole: RoleName): Promise<void> {
    if (currentUserRole !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN can permanently delete courses');
    }

    const existingCourse = await this.coursesRepository.findByIdIncludingDeleted(id);
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }

    await this.coursesRepository.hardDelete(id);
  }

  // Restore soft deleted course
  async restore(id: number, currentUserRole: RoleName): Promise<CourseResponseDto> {
    if (currentUserRole !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN can restore courses');
    }

    const course = await this.coursesRepository.findByIdIncludingDeleted(id);
    if (!course || !course.deletedAt) {
      throw new NotFoundException('Deleted course not found');
    }

    const restoredCourse = await this.coursesRepository.restore(id);
    return this.toResponseDto(restoredCourse);
  }

  private toResponseDto(course: any): CourseResponseDto {
    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      syllabus: course.syllabus,
      price: Number(course.price),
      rating: Number(course.rating),
      students: course.students,
      duration: course.duration,
      level: course.level,
      category: course.category,
      language: course.language,
      certificate: course.certificate,
      createdAt: course.createdAt,
      instructor: course.instructor,
      modules: course.modules,
      enrollments: course.enrollments,
    };
  }
}