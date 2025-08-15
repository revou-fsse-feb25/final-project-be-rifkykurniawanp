import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { IProductsRepository, CreateProductData, UpdateProductData, ProductFilter } from './interfaces/products.repository.interface';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductData): Promise<Product> {
    return this.prisma.product.create({
      data,
      include: {
        supplier: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        supplier: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { slug },
      include: {
        supplier: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(skip: number = 0, take: number = 10, filter?: ProductFilter): Promise<Product[]> {
    const where: any = {};

    if (filter) {
      if (filter.category) where.category = filter.category;
      if (filter.origin) where.origin = filter.origin;
      if (filter.status) where.status = filter.status;
      if (filter.supplierId) where.supplierId = filter.supplierId;
      if (filter.tags && filter.tags.length > 0) {
        where.tags = {
          hasSome: filter.tags,
        };
      }
      if (filter.minPrice || filter.maxPrice) {
        where.price = {};
        if (filter.minPrice) where.price.gte = filter.minPrice;
        if (filter.maxPrice) where.price.lte = filter.maxPrice;
      }
    }

    return this.prisma.product.findMany({
      where,
      skip,
      take,
      include: {
        supplier: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, data: UpdateProductData): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        supplier: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async updateRating(id: number, rating: number, reviewCount: number): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: {
        rating,
        reviewCount,
      },
    });
  }

  async findBySupplierId(supplierId: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { supplierId },
      include: {
        supplier: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
