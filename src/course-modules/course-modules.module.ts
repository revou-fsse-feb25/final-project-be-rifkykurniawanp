import { Module } from '@nestjs/common';
import { CourseModulesService } from './course-modules.service';
import { CourseModulesController } from './course-modules.controller';

@Module({
  controllers: [CourseModulesController],
  providers: [CourseModulesService],
})
export class CourseModulesModule {}
