import { CreateReviewDto } from '../dto/request/create-review.dto';
import { ReviewResponseDto } from '../dto/response/review-response.dto';
export interface IProductReviewsRepository {
    createReview(userId: number, dto: CreateReviewDto): Promise<ReviewResponseDto>;
    findByProductId(productId: number): Promise<ReviewResponseDto[]>;
    findByUserId(userId: number): Promise<ReviewResponseDto[]>;
    getProductAverageRating(productId: number): Promise<number>;
    updateReview(reviewId: number, dto: CreateReviewDto): Promise<ReviewResponseDto>;
    deleteReview(reviewId: number): Promise<void>;
}
