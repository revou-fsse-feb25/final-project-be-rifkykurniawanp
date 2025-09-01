import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateCartItemDto {
  @ApiProperty({ example: 3, description: 'New quantity', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @ApiProperty({ example: 30000, description: 'New price per unit', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;
}