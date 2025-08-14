import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsRepository } from './enrollments.repository';

@Module({
  controllers: [EnrollmentsController],
  providers: [
    EnrollmentsService,
    { provide: 'IEnrollmentsRepository', useClass: EnrollmentsRepository },
  ],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
