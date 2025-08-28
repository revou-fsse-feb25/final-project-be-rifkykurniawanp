import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { CourseResponseDto, ModuleResponseDto, LessonResponseDto } from './dto/response/course.response.dto';
import { RoleName } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  async create(dto: CreateCourseDto, userId: number, role: RoleName): Promise<CourseResponseDto> {
    const exists = await this.coursesRepository.findBySlugIncludingDeleted(dto.slug);
    if (exists && !exists.deletedAt) throw new BadRequestException('Course slug already exists');

    let instructorId = dto.instructorId;
    if (role === 'INSTRUCTOR') instructorId = userId;
    else if (role !== 'ADMIN') throw new ForbiddenException('Only ADMIN and INSTRUCTOR can create courses');

    const course = await this.coursesRepository.create({ ...dto, instructorId });
    return this.toResponseDto(course);
  }

  async findAll(page = 1, limit = 10): Promise<CourseResponseDto[]> {
    const skip = (page - 1) * limit;
    const courses = await this.coursesRepository.findAll(skip, limit, { deletedAt: null });
    return courses.map(c => this.toResponseDto(c));
  }

  async findOne(id: number): Promise<CourseResponseDto> {
    const course = await this.coursesRepository.findById(id, { deletedAt: null });
    if (!course) throw new NotFoundException('Course not found');
    return this.toResponseDto(course);
  }

  async findBySlug(slug: string): Promise<CourseResponseDto> {
    const course = await this.coursesRepository.findBySlug(slug, { deletedAt: null });
    if (!course) throw new NotFoundException('Course not found');
    return this.toResponseDto(course);
  }

  async findByInstructorId(instructorId: number): Promise<CourseResponseDto[]> {
    const courses = await this.coursesRepository.findByInstructorId(instructorId, { deletedAt: null });
    return courses.map(c => this.toResponseDto(c));
  }

  async update(id: number, dto: UpdateCourseDto, userId: number, role: RoleName): Promise<CourseResponseDto> {
    const course = await this.coursesRepository.findById(id, { deletedAt: null });
    if (!course) throw new NotFoundException('Course not found');
    if (role === 'INSTRUCTOR' && course.instructorId !== userId) throw new ForbiddenException('Cannot update other instructors');
    if (dto.slug && dto.slug !== course.slug) {
      const slugExists = await this.coursesRepository.findBySlug(dto.slug, { deletedAt: null });
      if (slugExists) throw new BadRequestException('Course slug already exists');
    }
    const updated = await this.coursesRepository.update(id, dto);
    return this.toResponseDto(updated);
  }

  async remove(id: number, userId: number, role: RoleName): Promise<void> {
    const course = await this.coursesRepository.findById(id, { deletedAt: null });
    if (!course) throw new NotFoundException('Course not found');
    if (role === 'INSTRUCTOR' && course.instructorId !== userId) throw new ForbiddenException('Cannot delete other instructors');
    await this.coursesRepository.softDelete(id);
  }

  async forceDelete(id: number, role: RoleName): Promise<void> {
    if (role !== 'ADMIN') throw new ForbiddenException('Only ADMIN can delete');
    const course = await this.coursesRepository.findByIdIncludingDeleted(id);
    if (!course) throw new NotFoundException('Course not found');
    await this.coursesRepository.hardDelete(id);
  }

  async restore(id: number, role: RoleName): Promise<CourseResponseDto> {
    if (role !== 'ADMIN') throw new ForbiddenException('Only ADMIN can restore');
    const course = await this.coursesRepository.findByIdIncludingDeleted(id);
    if (!course || !course.deletedAt) throw new NotFoundException('Deleted course not found');
    const restored = await this.coursesRepository.restore(id);
    return this.toResponseDto(restored);
  }

  private toResponseDto(course: any): CourseResponseDto {
    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      syllabus: course.syllabus,
      price: Number(course.price),
      rating: Number(course.rating ?? 0),
      students: course.students ?? 0,
      duration: course.duration,
      level: course.level,
      category: course.category,
      language: course.language,
      certificate: course.certificate,
      createdAt: course.createdAt,
      instructor: course.instructor,
      modules: course.modules?.map((m: any) => ({
        id: m.id,
        title: m.title,
        orderNumber: m.orderNumber,
        lessons: m.lessons?.map((l: any) => ({
          id: l.id,
          slug: l.slug,
          title: l.title,
          description: l.description,
          duration: l.duration,
          type: l.type,
          videoUrl: l.videoUrl,
          content: l.content,
          quizQuestions: l.quizQuestions,
          passingScore: Number(l.passingScore ?? 0),
          orderNumber: l.orderNumber,
        })),
      })),
      enrollments: course.enrollments,
    };
  }
}
