import { ProductReviewsService } from './product-reviews.service';
import { CreateReviewDto } from './dto/request/create-review.dto';
import { ReviewResponseDto } from './dto/response/review-response.dto';
export declare class ProductReviewsController {
    private readonly service;
    constructor(service: ProductReviewsService);
    createReview(userId: number, dto: CreateReviewDto): Promise<ReviewResponseDto>;
    getByProduct(productId: number): Promise<ReviewResponseDto[]>;
    getByUser(userId: number): Promise<ReviewResponseDto[]>;
    getAverage(productId: number): Promise<number>;
    updateReview(reviewId: number, dto: CreateReviewDto): Promise<ReviewResponseDto>;
    deleteReview(reviewId: number): Promise<void>;
}
