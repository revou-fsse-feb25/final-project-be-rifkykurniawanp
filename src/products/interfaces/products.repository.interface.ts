import { CreateProductDto } from '../dto/request/create-product.dto';
import { UpdateProductDto } from '../dto/request/update-product.dto';
import { ProductCategory, ProductOrigin, ProductStatus } from '@prisma/client';

export interface ProductFilter {
  category?: ProductCategory;
  origin?: ProductOrigin;
  status?: ProductStatus;
  supplierId?: number;
  minPrice?: number;
  maxPrice?: number;
  deletedAt?: null | Date; // untuk soft delete filter
}

export interface IProductsRepository {
  create(data: CreateProductDto & { supplierId: number }): Promise<any>;
  findAll(skip: number, take: number, filter?: ProductFilter): Promise<any[]>;
  findById(id: number, filter?: ProductFilter): Promise<any | null>;
  findBySlug(slug: string, filter?: ProductFilter): Promise<any | null>;
  findBySlugIncludingDeleted(slug: string): Promise<any | null>;
  findBySupplierId(supplierId: number, filter?: ProductFilter): Promise<any[]>;
  findByIdIncludingDeleted(id: number): Promise<any | null>;
  update(id: number, data: UpdateProductDto): Promise<any>;
  updateRating(id: number, rating: number, reviewCount: number): Promise<any>;
  softDelete(id: number): Promise<void>;
  hardDelete(id: number): Promise<void>;
  restore(id: number): Promise<any>;
}
