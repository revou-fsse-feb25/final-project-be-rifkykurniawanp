import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { DetailsModule } from './details/details.module';
import { ModulesModule } from './modules/modules.module';
import { LessonsModule } from './lessons/lessons.module';
import { ProgressesModule } from './progresses/progresses.module';

@Module({
  providers: [CoursesService],
  controllers: [CoursesController],
  imports: [DetailsModule, ModulesModule, LessonsModule, ProgressesModule],
})
export class CoursesModule {}
