import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { LessonsRepository } from './lessons.repository';
import { ILessonsRepository } from './interfaces/lessons.repository.interface';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LessonsController],
  providers: [
    LessonsService,
    {
      provide: ILessonsRepository,  // pakai token, bukan interface langsung
      useClass: LessonsRepository,  // implementasi repository
    },
  ],
  exports: [LessonsService],
})
export class LessonsModule {}
