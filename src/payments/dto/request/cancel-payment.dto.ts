import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CancelPaymentDto {
  @ApiProperty({ example: "User requested cancellation", required: false })
  @IsString()
  @IsOptional()
  reason?: string;
}
