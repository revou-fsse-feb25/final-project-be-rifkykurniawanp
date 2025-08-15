import { Module } from '@nestjs/common';
import { CourseModulesService } from './course-modules.service';
import { CourseModulesController } from './course-modules.controller';
import { CourseModulesRepository } from './course-modules.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseModulesController],
  providers: [CourseModulesService, CourseModulesRepository],
  exports: [CourseModulesService, CourseModulesRepository],
})
export class CourseModulesModule {}