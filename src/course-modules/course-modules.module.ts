import { Module } from '@nestjs/common';
import { CourseModulesController } from './course-modules.controller';
import { CourseModulesService } from './course-modules.service';
import { CourseModulesRepository } from './course-modules.repository';
import { ICourseModulesRepository } from './interfaces/course-modules.repository.interface';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseModulesController],
  providers: [
    CourseModulesService,
    {
      provide: 'ICourseModulesRepository',
      useClass: CourseModulesRepository,
    },
  ],
  exports: [CourseModulesService],
})
export class CourseModulesModule {}