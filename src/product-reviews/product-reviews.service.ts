import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductReviewsRepository } from './interfaces/product-reviews.repository.interface';
import { CreateReviewDto } from './dto/request/create-review.dto';
import { ReviewResponseDto } from './dto/response/review-response.dto';

@Injectable()
export class ProductReviewsService {
  constructor(private readonly repository: IProductReviewsRepository) {}

  async createReview(userId: number, dto: CreateReviewDto): Promise<ReviewResponseDto> {
    return this.repository.createReview(userId, dto);
  }

  async findByProductId(productId: number): Promise<ReviewResponseDto[]> {
    return this.repository.findByProductId(productId);
  }

  async findByUserId(userId: number): Promise<ReviewResponseDto[]> {
    return this.repository.findByUserId(userId);
  }

  async getProductAverageRating(productId: number): Promise<number> {
    return this.repository.getProductAverageRating(productId);
  }

  async updateReview(reviewId: number, dto: CreateReviewDto): Promise<ReviewResponseDto> {
    const review = await this.repository.updateReview(reviewId, dto);
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async deleteReview(reviewId: number): Promise<void> {
    return this.repository.deleteReview(reviewId);
  }
}
