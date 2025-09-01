import { UserResponseDto } from './user.response.dto';
export declare class ProductReviewResponseDto {
    id: number;
    rating: number;
    comment: string | null;
    createdAt: Date;
    user: UserResponseDto;
}
