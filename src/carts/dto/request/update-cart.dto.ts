import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsEnum, IsOptional } from 'class-validator';
import { CartItemType } from './add-to-cart.dto';

export class UpdateCartDto {
  @ApiPropertyOptional({ example: 2 })
  @IsInt()
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({ example: 100000.0 })
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ enum: CartItemType })
  @IsEnum(CartItemType)
  @IsOptional()
  itemType?: CartItemType;
}
