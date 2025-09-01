import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/request/create-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { ProductResponseDto } from './dto/response/product.response.dto';
import { ProductFilter } from './interfaces/products.repository.interface';
import { RoleName } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto, currentUserId: number, currentUserRole: RoleName): Promise<ProductResponseDto> {
    // Check for existing product with same slug (including soft deleted)
    const existingProduct = await this.productsRepository.findBySlugIncludingDeleted(createProductDto.slug);
    if (existingProduct && !existingProduct.deletedAt) {
      throw new BadRequestException('Product slug already exists');
    }

    // Set supplierId based on role
    let supplierId = createProductDto.supplierId;
    if (currentUserRole === 'SUPPLIER') {
      supplierId = currentUserId; // Suppliers can only create products for themselves
    } else if (currentUserRole !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN and SUPPLIER can create products');
    }

    const product = await this.productsRepository.create({
      ...createProductDto,
      supplierId,
    });
    return this.toResponseDto(product);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter?: ProductFilter,
  ): Promise<ProductResponseDto[]> {
    const skip = (page - 1) * limit;
    // Add deletedAt: null filter to exclude soft deleted products
    const products = await this.productsRepository.findAll(skip, limit, {
      ...filter,
      deletedAt: null
    });
    return products.map(product => this.toResponseDto(product));
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.productsRepository.findById(id, { deletedAt: null });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.toResponseDto(product);
  }

  async findBySlug(slug: string): Promise<ProductResponseDto> {
    const product = await this.productsRepository.findBySlug(slug, { deletedAt: null });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.toResponseDto(product);
  }

  async findBySupplierId(supplierId: number): Promise<ProductResponseDto[]> {
    const products = await this.productsRepository.findBySupplierId(supplierId, { deletedAt: null });
    return products.map(product => this.toResponseDto(product));
  }

  async update(
    id: number, 
    updateProductDto: UpdateProductDto, 
    currentUserId: number, 
    currentUserRole: RoleName
  ): Promise<ProductResponseDto> {
    const existingProduct = await this.productsRepository.findById(id, { deletedAt: null });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    // Check ownership permissions
    if (currentUserRole === 'SUPPLIER' && existingProduct.supplierId !== currentUserId) {
      throw new ForbiddenException('You can only update your own products');
    } else if (currentUserRole !== 'ADMIN' && currentUserRole !== 'SUPPLIER') {
      throw new ForbiddenException('Only ADMIN and SUPPLIER can update products');
    }

    if (updateProductDto.slug && updateProductDto.slug !== existingProduct.slug) {
      const slugExists = await this.productsRepository.findBySlug(updateProductDto.slug, { deletedAt: null });
      if (slugExists) {
        throw new BadRequestException('Product slug already exists');
      }
    }

    const product = await this.productsRepository.update(id, updateProductDto);
    return this.toResponseDto(product);
  }

  // Soft delete implementation
  async remove(id: number, currentUserId: number, currentUserRole: RoleName): Promise<void> {
    const existingProduct = await this.productsRepository.findById(id, { deletedAt: null });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    // Check ownership permissions
    if (currentUserRole === 'SUPPLIER' && existingProduct.supplierId !== currentUserId) {
      throw new ForbiddenException('You can only delete your own products');
    } else if (currentUserRole !== 'ADMIN' && currentUserRole !== 'SUPPLIER') {
      throw new ForbiddenException('Only ADMIN and SUPPLIER can delete products');
    }

    // Perform soft delete by setting deletedAt timestamp
    await this.productsRepository.softDelete(id);
  }

  // Hard delete for admin purposes (optional)
  async forceDelete(id: number, currentUserRole: RoleName): Promise<void> {
    if (currentUserRole !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN can permanently delete products');
    }

    const existingProduct = await this.productsRepository.findByIdIncludingDeleted(id);
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    await this.productsRepository.hardDelete(id);
  }

  // Restore soft deleted product
  async restore(id: number, currentUserRole: RoleName): Promise<ProductResponseDto> {
    if (currentUserRole !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN can restore products');
    }

    const product = await this.productsRepository.findByIdIncludingDeleted(id);
    if (!product || !product.deletedAt) {
      throw new NotFoundException('Deleted product not found');
    }

    const restoredProduct = await this.productsRepository.restore(id);
    return this.toResponseDto(restoredProduct);
  }

  async updateRating(id: number, rating: number, reviewCount: number): Promise<ProductResponseDto> {
    const product = await this.productsRepository.updateRating(id, rating, reviewCount);
    return this.toResponseDto(product);
  }

  private toResponseDto(product: any): ProductResponseDto {
    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      stock: product.stock,
      image: product.image,
      category: product.category,
      status: product.status,
      rating: Number(product.rating),
      reviewCount: product.reviewCount,
      origin: product.origin,
      weight: product.weight,
      tags: product.tags,
      createdAt: product.createdAt,
      supplier: product.supplier,
      reviews: product.reviews,
    };
  }
}