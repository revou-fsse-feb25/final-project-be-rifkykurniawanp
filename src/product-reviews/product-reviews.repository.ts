import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IProductReviewsRepository } from './interfaces/product-reviews.repository.interface';
import { CreateReviewDto } from './dto/request/create-review.dto';
import { ReviewResponseDto } from './dto/response/review-response.dto';

const reviewSelect = {
  id: true,
  productId: true,
  userId: true,
  rating: true,
  comment: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class ProductReviewsRepository implements IProductReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(userId: number, dto: CreateReviewDto): Promise<ReviewResponseDto> {
    return this.prisma.productReview.create({
      data: { ...dto, userId },
      select: reviewSelect,
    });
  }

  async findByProductId(productId: number): Promise<ReviewResponseDto[]> {
    return this.prisma.productReview.findMany({
      where: { productId },
      select: reviewSelect,
    });
  }

  async findByUserId(userId: number): Promise<ReviewResponseDto[]> {
    return this.prisma.productReview.findMany({
      where: { userId },
      select: reviewSelect,
    });
  }

  async getProductAverageRating(productId: number): Promise<number> {
    const result = await this.prisma.productReview.aggregate({
      where: { productId },
      _avg: { rating: true },
    });
    return result._avg.rating || 0;
  }

  async updateReview(reviewId: number, dto: CreateReviewDto): Promise<ReviewResponseDto> {
    return this.prisma.productReview.update({
      where: { id: reviewId },
      data: dto,
      select: reviewSelect,
    });
  }

  async deleteReview(reviewId: number): Promise<void> {
    await this.prisma.productReview.delete({ where: { id: reviewId } });
  }
}
