import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonProgressesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOne(userId: number, lessonId: number) {
    return this.prisma.lessonProgress.findUnique({
      where: { lessonId_userId: { lessonId, userId } },
    });
  }

  markCompleted(userId: number, lessonId: number) {
    return this.prisma.lessonProgress.upsert({
      where: { lessonId_userId: { lessonId, userId } },
      update: { completed: true, updatedAt: new Date() },
      create: { userId, lessonId, completed: true },
    });
  }

  findAllByUser(userId: number) {
    return this.prisma.lessonProgress.findMany({ where: { userId } });
  }
}
