import { PrismaService } from '../prisma/prisma.service';
import { IProductReviewsRepository } from './interfaces/product-reviews.repository.interface';
import { CreateReviewDto } from './dto/request/create-review.dto';
import { ReviewResponseDto } from './dto/response/review-response.dto';
export declare class ProductReviewsRepository implements IProductReviewsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createReview(userId: number, dto: CreateReviewDto): Promise<ReviewResponseDto>;
    findByProductId(productId: number): Promise<ReviewResponseDto[]>;
    findByUserId(userId: number): Promise<ReviewResponseDto[]>;
    getProductAverageRating(productId: number): Promise<number>;
    updateReview(reviewId: number, dto: CreateReviewDto): Promise<ReviewResponseDto>;
    deleteReview(reviewId: number): Promise<void>;
}
