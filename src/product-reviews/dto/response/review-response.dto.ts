import { ApiProperty } from '@nestjs/swagger';

export class ReviewResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 101 })
  productId: number;

  @ApiProperty({ example: 12 })
  userId: number;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5' })
  rating: number;

  @ApiProperty({ example: 'Produk ini sangat bagus', nullable: true })
  comment: string | null;

  @ApiProperty({ example: '2025-08-15T14:12:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-08-15T14:12:00.000Z' })
  updatedAt: Date;
}
