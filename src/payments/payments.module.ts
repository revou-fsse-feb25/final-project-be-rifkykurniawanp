import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { PaymentsRepository } from "./payments.repository";
import { IPaymentsRepository } from "./interfaces/payments.repository.interface";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PrismaService,
    { provide: "IPaymentsRepository", useClass: PaymentsRepository },
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
