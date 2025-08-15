import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { LessonsRepository } from './lessons.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService, LessonsRepository, PrismaService],
  exports: [LessonsService],
})
export class LessonsModule {}
