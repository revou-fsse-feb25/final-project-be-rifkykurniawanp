import { ApiProperty } from '@nestjs/swagger';
import { CartItemType } from '@prisma/client';

export class ProductBasicDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Arabica Premium' })
  name: string;

  @ApiProperty({ example: 'arabica-premium' })
  slug: string;

  @ApiProperty({ example: 'image.jpg' })
  image?: string;

  @ApiProperty({ example: 25000 })
  price: number;

  @ApiProperty({ example: 50 })
  stock: number;
}

export class CourseBasicDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Coffee Brewing Masterclass' })
  title: string;

  @ApiProperty({ example: 'coffee-brewing-masterclass' })
  slug: string;

  @ApiProperty({ example: 150000 })
  price: number;

  @ApiProperty({ example: 'BEGINNER' })
  level: string;

  @ApiProperty({ example: 'COFFEE_BREWING' })
  category: string;
}

export class CartItemResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  cartId: number;

  @ApiProperty({ enum: CartItemType, example: 'PRODUCT' })
  itemType: CartItemType;

  @ApiProperty({ example: 1 })
  itemId: number;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 25000 })
  price: number;

  @ApiProperty({ example: 50000, description: 'price * quantity' })
  subtotal: number;

  @ApiProperty({ type: ProductBasicDto, required: false })
  product?: ProductBasicDto;

  @ApiProperty({ type: CourseBasicDto, required: false })
  course?: CourseBasicDto;
}