import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/request/create-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { ProductResponseDto } from './dto/response/product.response.dto';
import { ProductFilter } from './interfaces/products.repository.interface';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const existingProduct = await this.productsRepository.findBySlug(createProductDto.slug);
    if (existingProduct) {
      throw new BadRequestException('Product slug already exists');
    }

    const product = await this.productsRepository.create(createProductDto);
    return this.toResponseDto(product);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter?: ProductFilter,
  ): Promise<ProductResponseDto[]> {
    const skip = (page - 1) * limit;
    const products = await this.productsRepository.findAll(skip, limit, filter);
    return products.map(product => this.toResponseDto(product));
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.toResponseDto(product);
  }

  async findBySlug(slug: string): Promise<ProductResponseDto> {
    const product = await this.productsRepository.findBySlug(slug);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.toResponseDto(product);
  }

  async findBySupplierId(supplierId: number): Promise<ProductResponseDto[]> {
    const products = await this.productsRepository.findBySupplierId(supplierId);
    return products.map(product => this.toResponseDto(product));
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    const existingProduct = await this.productsRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    if (updateProductDto.slug && updateProductDto.slug !== existingProduct.slug) {
      const slugExists = await this.productsRepository.findBySlug(updateProductDto.slug);
      if (slugExists) {
        throw new BadRequestException('Product slug already exists');
      }
    }

    const product = await this.productsRepository.update(id, updateProductDto);
    return this.toResponseDto(product);
  }

  async remove(id: number): Promise<void> {
    const existingProduct = await this.productsRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    await this.productsRepository.delete(id);
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
