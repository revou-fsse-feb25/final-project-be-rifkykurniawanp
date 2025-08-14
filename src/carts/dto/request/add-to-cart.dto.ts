import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 'product', description: 'Type of item (product or course)' })
  @IsString()
  itemType: string;

  @ApiProperty({ example: 101 })
  @IsInt()
  itemId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 150000.00 })
  @IsNumber()
  price: number;
}
