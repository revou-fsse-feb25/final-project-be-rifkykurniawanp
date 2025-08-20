import { IsEnum, IsNotEmpty } from "class-validator";
import { PaymentStatus } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePaymentStatusDto {
  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.COMPLETED })
  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  status: PaymentStatus;
}
