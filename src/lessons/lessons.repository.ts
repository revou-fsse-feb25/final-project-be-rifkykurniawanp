import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';

@Injectable()
export class LessonsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLessonDto) {
    return this.prisma.lesson.create({ data: dto });
  }

  findAllByModule(moduleId: number) {
    return this.prisma.lesson.findMany({ where: { moduleId } });
  }

  findOne(id: number) {
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  findBySlug(slug: string) {
    return this.prisma.lesson.findUnique({ where: { slug } });
  }

  update(id: number, dto: UpdateLessonDto) {
    return this.prisma.lesson.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.lesson.delete({ where: { id } });
  }

  // ===== Progress (tanpa ubah schema) =====

  // Ambil progress 1 user untuk 1 lesson (pakai composite PK)
  getProgress(lessonId: number, userId: number) {
    return this.prisma.lessonProgress.findUnique({
      where: { lessonId_userId: { lessonId, userId } },
    });
  }

  // Tandai complete: upsert berdasarkan composite PK
  completeLesson(lessonId: number, userId: number) {
    return this.prisma.lessonProgress.upsert({
      where: { lessonId_userId: { lessonId, userId } },
      create: { lessonId, userId, completed: true },
      update: { completed: true }, // updatedAt auto via @updatedAt di schema
    });
  }

  // Course progress:
  // - Jika userId diberikan → progress milik user tsb
  // - Jika tidak → kembalikan semua progress di course (untuk ADMIN, jika perlu)
  getCourseProgress(courseId: number, userId?: number) {
    return this.prisma.lessonProgress.findMany({
      where: {
        ...(userId ? { userId } : {}),
        lesson: {
          module: { courseId },
        },
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            moduleId: true,
            module: {
              select: { id: true, courseId: true, title: true, orderNumber: true },
            },
          },
        },
      },
    });
  }
}
