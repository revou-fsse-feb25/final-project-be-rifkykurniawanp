import { ProductCategory, ProductOrigin, ProductStatus, ProductTagName } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ description: 'The unique ID of the product', example: 1 })
  id: number;
  
  @ApiProperty({ description: 'Unique slug for the product', example: 'premium-coffee-beans' })
  slug: string;

  @ApiProperty({ description: 'Name of the product', example: 'Premium Coffee Beans' })
  name: string;
  
  @ApiPropertyOptional({ description: 'Description of the product' })
  description?: string;

  @ApiProperty({ description: 'Price of the product', example: 150000 })
  price: number;

  @ApiProperty({ description: 'Stock quantity of the product', example: 100 })
  stock: number;
  
  @ApiPropertyOptional({ description: 'URL to the product image' })
  image?: string;

  @ApiProperty({ description: 'Category of the product', enum: ProductCategory })
  category: ProductCategory;

  @ApiProperty({ description: 'Status of the product', enum: ProductStatus })
  status: ProductStatus;

  @ApiProperty({ description: 'Current rating of the product', example: 4.5 })
  rating: number;

  @ApiProperty({ description: 'Total number of reviews for the product', example: 10 })
  reviewCount: number;

  @ApiProperty({ description: 'Origin of the product', enum: ProductOrigin })
  origin: ProductOrigin;
  
  @ApiPropertyOptional({ description: 'Weight of the product', example: '500g' })
  weight?: string;

  @ApiProperty({ description: 'Tags associated with the product', enum: ProductTagName, isArray: true })
  tags: ProductTagName[];

  @ApiProperty({ description: 'Creation date of the product', example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({
    description: 'Supplier of the product',
    type: 'object',
    properties: {
      id: { type: 'number' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string' },
    },
  })
  supplier: {
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  
  @ApiPropertyOptional({
    description: 'Reviews for the product',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        rating: { type: 'number' },
        comment: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
          },
        },
      },
    },
  })
  reviews?: Array<{
    id: number;
    rating: number;
    comment?: string;
    createdAt: Date;
    user: {
      id: number;
      firstName?: string;
      lastName?: string;
    };
  }>;
}
