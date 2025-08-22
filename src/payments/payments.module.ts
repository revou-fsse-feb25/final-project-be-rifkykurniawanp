import { Module } from "@nestjs/common";
import { PaymentService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { PaymentsRepository } from "./payments.repository";
import { IPaymentsRepository } from "./interfaces/payments.repository.interface";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentService,
    PrismaService,
    { provide: "IPaymentsRepository", useClass: PaymentsRepository },
  ],
  exports: [PaymentService],
})
export class PaymentsModule {}
