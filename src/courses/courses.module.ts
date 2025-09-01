// src/courses/courses.module.ts
import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository, PrismaService],
  exports: [CoursesService, CoursesRepository],
})
export class CoursesModule {}
