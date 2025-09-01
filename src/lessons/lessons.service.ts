import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ILessonsRepository } from './interfaces/lessons.repository.interface';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';
import { LessonResponseDto } from './dto/response/lesson.response.dto';

@Injectable()
export class LessonsService {
  constructor(
    @Inject(ILessonsRepository)
    private readonly repo: ILessonsRepository,
  ) {}

  async create(createDto: CreateLessonDto, moduleId: number): Promise<LessonResponseDto> {
    const lesson = await this.repo.create({ ...createDto, moduleId });
    return this.toResponseDto(lesson);
  }

  async findAll(moduleId: number, page = 1, limit = 10): Promise<LessonResponseDto[]> {
    const skip = (page - 1) * limit;
    const lessons = await this.repo.findAll(skip, limit, { moduleId, deletedAt: null });
    return lessons.map(l => this.toResponseDto(l));
  }

  async findOne(id: number): Promise<LessonResponseDto> {
    const lesson = await this.repo.findById(id, { deletedAt: null });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return this.toResponseDto(lesson);
  }

  async update(id: number, updateDto: UpdateLessonDto): Promise<LessonResponseDto> {
    const existing = await this.repo.findById(id, { deletedAt: null });
    if (!existing) throw new NotFoundException('Lesson not found');
    const updated = await this.repo.update(id, updateDto);
    return this.toResponseDto(updated);
  }

  async remove(id: number): Promise<void> {
    const existing = await this.repo.findById(id, { deletedAt: null });
    if (!existing) throw new NotFoundException('Lesson not found');
    await this.repo.softDelete(id);
  }

  async forceDelete(id: number): Promise<void> {
    const existing = await this.repo.findByIdIncludingDeleted(id);
    if (!existing) throw new NotFoundException('Lesson not found');
    await this.repo.hardDelete(id);
  }

  async restore(id: number): Promise<LessonResponseDto> {
    const lesson = await this.repo.findByIdIncludingDeleted(id);
    if (!lesson || !lesson.deletedAt) throw new NotFoundException('Deleted lesson not found');
    const restored = await this.repo.restore(id);
    return this.toResponseDto(restored);
  }

  // ✅ mapper lengkap sesuai schema & DTO terbaru
  private toResponseDto(lesson: any): LessonResponseDto {
    return {
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      description: lesson.description,
      duration: lesson.duration,
      type: lesson.type,
      moduleId: lesson.moduleId,
      orderNumber: lesson.orderNumber,
      videoUrl: lesson.videoUrl,
      content: lesson.content,
      quizQuestions: lesson.quizQuestions,
      passingScore: lesson.passingScore,
      createdAt: lesson.createdAt,
      deletedAt: lesson.deletedAt,
    };
  }
}
