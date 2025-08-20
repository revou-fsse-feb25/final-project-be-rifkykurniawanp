import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { PayableType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: "User ID who makes the payment" })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 12, description: "Cart ID associated with the payment" })
  @IsInt()
  @IsNotEmpty()
  cartId: number;

  @ApiProperty({ example: 50000, description: "Total amount to pay" })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: "CREDIT_CARD", description: "Payment method used" })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({ enum: PayableType, description: "Type of payable entity" })
  @IsEnum(PayableType)
  payableType: PayableType;

  @ApiProperty({ example: 45, description: "ID of payable entity" })
  @IsInt()
  @IsNotEmpty()
  payableId: number;
}
