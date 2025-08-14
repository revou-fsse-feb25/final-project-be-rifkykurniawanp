import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({ example: 5 })
  @IsInt()
  cartItemId: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  quantity: number;
}
