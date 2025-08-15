import { IsString, IsOptional, IsNumber, IsEnum, IsArray } from 'class-validator';
import { ProductCategory, ProductOrigin, ProductStatus, ProductTagName } from '@prisma/client';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Unique slug for the product', example: 'premium-coffee-beans' })
  @IsString()
  slug: string;

  @ApiProperty({ description: 'Name of the product', example: 'Premium Coffee Beans' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Description of the product' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Price of the product', example: 150000 })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @ApiPropertyOptional({ description: 'Stock quantity of the product', example: 100 })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiPropertyOptional({ description: 'URL to the product image' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: 'Category of the product', enum: ProductCategory })
  @IsEnum(ProductCategory)
  category: ProductCategory;

  @ApiProperty({ description: 'Status of the product', enum: ProductStatus })
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty({ description: 'ID of the supplier', example: 1 })
  @IsNumber()
  supplierId: number;

  @ApiProperty({ description: 'Origin of the product', enum: ProductOrigin })
  @IsEnum(ProductOrigin)
  origin: ProductOrigin;

  @ApiPropertyOptional({ description: 'Weight of the product', example: '500g' })
  @IsOptional()
  @IsString()
  weight?: string;

  @ApiPropertyOptional({ description: 'Tags associated with the product', enum: ProductTagName, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(ProductTagName, { each: true })
  tags?: ProductTagName[];
}
