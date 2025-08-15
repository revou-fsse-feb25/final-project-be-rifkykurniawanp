import { Module } from '@nestjs/common';
import { LessonProgressesService } from './lesson-progresses.service';
import { LessonProgressesController } from './lesson-progresses.controller';
import { LessonProgressesRepository } from './lesson-progresses.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LessonProgressesController],
  providers: [LessonProgressesService, LessonProgressesRepository, PrismaService],
  exports: [LessonProgressesService],
})
export class LessonProgressesModule {}
