import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyPaymentDto {
  @ApiProperty({ example: true, required: false, description: "Auto complete after verification" })
  @IsBoolean()
  @IsOptional()
  autoComplete?: boolean = true;
}
