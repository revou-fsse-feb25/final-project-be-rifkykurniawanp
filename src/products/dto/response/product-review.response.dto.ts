import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user.response.dto';

export class ProductReviewResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5' })
  rating: number;

  @ApiProperty({ example: 'Produk ini sangat bagus', nullable: true })
  comment: string | null;

  @ApiProperty({ example: '2025-08-15T14:12:00.000Z' })
  createdAt: Date;

  @ApiProperty({ type: () => UserResponseDto })
  user: UserResponseDto;
}