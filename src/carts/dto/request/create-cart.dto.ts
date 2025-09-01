import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: 1, description: 'User ID who owns the cart' })
  @IsNumber()
  @IsPositive()
  userId: number;
}