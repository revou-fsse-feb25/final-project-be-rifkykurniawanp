import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IProductsRepository, ProductFilter } from './interfaces/products.repository.interface';
import { CreateProductDto } from './dto/request/create-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto & { supplierId: number }) {
    return this.prisma.product.create({ data });
  }

  async findAll(skip: number, take: number, filter: ProductFilter = {}) {
    return this.prisma.product.findMany({
      skip,
      take,
      where: {
        category: filter.category,
        origin: filter.origin,
        status: filter.status,
        supplierId: filter.supplierId,
        price: {
          gte: filter.minPrice,
          lte: filter.maxPrice,
        },
        deletedAt: filter.deletedAt ?? null,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        supplier: true,
        reviews: true,
      },
    });
  }

  async findById(id: number, filter: ProductFilter = {}) {
    return this.prisma.product.findFirst({
      where: { id, deletedAt: filter.deletedAt ?? null },
      include: { supplier: true, reviews: true },
    });
  }

  async findBySlug(slug: string, filter: ProductFilter = {}) {
    return this.prisma.product.findFirst({
      where: { slug, deletedAt: filter.deletedAt ?? null },
      include: { supplier: true, reviews: true },
    });
  }

  async findBySlugIncludingDeleted(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: { supplier: true, reviews: true },
    });
  }

  async findBySupplierId(supplierId: number, filter: ProductFilter = {}) {
    return this.prisma.product.findMany({
      where: { supplierId, deletedAt: filter.deletedAt ?? null },
      include: { supplier: true, reviews: true },
    });
  }

  async findByIdIncludingDeleted(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { supplier: true, reviews: true },
    });
  }

  async update(id: number, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data,
      include: { supplier: true, reviews: true },
    });
  }

  async updateRating(id: number, rating: number, reviewCount: number) {
    return this.prisma.product.update({
      where: { id },
      data: { rating, reviewCount },
      include: { supplier: true, reviews: true },
    });
  }

  async softDelete(id: number) {
    await this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(id: number) {
    await this.prisma.product.delete({ where: { id } });
  }

  async restore(id: number) {
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: null },
      include: { supplier: true, reviews: true },
    });
  }
}
