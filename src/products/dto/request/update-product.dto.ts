import { IsString, IsOptional, IsNumber, IsEnum, IsArray } from 'class-validator';
import { ProductCategory, ProductOrigin, ProductStatus, ProductTagName } from '@prisma/client';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'Unique slug for the product', example: 'premium-coffee-beans-updated' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Name of the product', example: 'Premium Coffee Beans Updated' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Description of the product' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Price of the product', example: 160000 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price?: number;

  @ApiPropertyOptional({ description: 'Stock quantity of the product', example: 95 })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiPropertyOptional({ description: 'URL to the product image' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Category of the product', enum: ProductCategory })
  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @ApiPropertyOptional({ description: 'Status of the product', enum: ProductStatus })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional({ description: 'Origin of the product', enum: ProductOrigin })
  @IsOptional()
  @IsEnum(ProductOrigin)
  origin?: ProductOrigin;

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
