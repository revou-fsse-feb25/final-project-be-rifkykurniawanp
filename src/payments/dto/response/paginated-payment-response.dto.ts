// dto/response/paginated-payment-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { PaymentResponseDto } from './payment-response.dto';

export class PaginatedPaymentResponseDto {
  @ApiProperty({
    description: 'Array of payment data',
    type: [PaymentResponseDto]
  })
  data: PaymentResponseDto[];

  @ApiProperty({
    description: 'Total number of payments',
    example: 50
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 5
  })
  totalPages: number;

  @ApiProperty({
    description: 'Whether there is a next page',
    example: true
  })
  hasNext: boolean;

  @ApiProperty({
    description: 'Whether there is a previous page',
    example: false
  })
  hasPrev: boolean;

  constructor(
    data: PaymentResponseDto[],
    total: number,
    page: number,
    limit: number
  ) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
    this.hasNext = page < this.totalPages;
    this.hasPrev = page > 1;
  }
}