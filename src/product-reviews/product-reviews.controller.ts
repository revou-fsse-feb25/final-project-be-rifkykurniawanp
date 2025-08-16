import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductReviewsService } from './product-reviews.service';
import { CreateReviewDto } from './dto/request/create-review.dto';
import { ReviewResponseDto } from './dto/response/review-response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('Product Reviews')
@Controller('product-reviews')
export class ProductReviewsController {
  constructor(private readonly service: ProductReviewsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createReview(
    @Query('userId') userId: number,
    @Body() dto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    return this.service.createReview(userId, dto);
  }

  @Get('product/:productId')
  async getByProduct(@Param('productId') productId: number): Promise<ReviewResponseDto[]> {
    return this.service.findByProductId(productId);
  }

  @Get('user/:userId')
  async getByUser(@Param('userId') userId: number): Promise<ReviewResponseDto[]> {
    return this.service.findByUserId(userId);
  }

  @Get('product/:productId/average-rating')
  async getAverage(@Param('productId') productId: number): Promise<number> {
    return this.service.getProductAverageRating(productId);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Patch(':reviewId')
  async updateReview(
    @Param('reviewId') reviewId: number,
    @Body() dto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    return this.service.updateReview(reviewId, dto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Delete(':reviewId')
  async deleteReview(@Param('reviewId') reviewId: number): Promise<void> {
    return this.service.deleteReview(reviewId);
  }
}
