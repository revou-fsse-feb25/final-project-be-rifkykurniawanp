import { ApiProperty } from '@nestjs/swagger';

export class PaymentStatsDto {
  @ApiProperty({ example: 150, description: 'Total number of payments' })
  totalPayments: number;

  @ApiProperty({ example: 25, description: 'Number of pending payments' })
  pendingPayments: number;

  @ApiProperty({ example: 100, description: 'Number of completed payments' })
  completedPayments: number;

  @ApiProperty({ example: 25, description: 'Number of failed payments' })
  failedPayments: number;

  @ApiProperty({ example: 2500000, description: 'Total revenue from completed payments' })
  totalRevenue: number;

  @ApiProperty({ example: 500000, description: 'Total amount in pending payments' })
  pendingAmount: number;

  @ApiProperty({ example: 2500000, description: 'Total amount from completed payments' })
  completedAmount: number;

  @ApiProperty({ example: 80.5, description: 'Success rate percentage' })
  successRate: number;
}