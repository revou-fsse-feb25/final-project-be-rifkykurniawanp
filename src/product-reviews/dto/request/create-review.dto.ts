import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 5, description: 'Rating from 1 to 5' })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Produk ini sangat bagus', required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ example: 101 })
  @IsInt()
  productId: number;
}
