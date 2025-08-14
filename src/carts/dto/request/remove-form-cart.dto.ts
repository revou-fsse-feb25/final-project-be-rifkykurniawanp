import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class RemoveFromCartDto {
  @ApiProperty({ example: 5 })
  @IsInt()
  cartItemId: number;
}
