import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentsRepository } from './payments.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository, PrismaService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
