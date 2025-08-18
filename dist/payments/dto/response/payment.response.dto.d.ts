import { PaymentStatus, PayableType } from '@prisma/client';
export declare class PaymentResponseDto {
    id: number;
    userId: number;
    cartId: number;
    amount: number;
    paymentMethod: string;
    status: PaymentStatus;
    payableType: PayableType;
    payableId: number;
    paidAt: string | null;
    createdAt: string;
    user?: UserSummaryDto;
    cart?: CartSummaryDto;
    product?: ProductSummaryDto;
    course?: CourseSummaryDto;
}
export declare class UserSummaryDto {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
}
export declare class CartSummaryDto {
    id: number;
    createdAt: string;
    updatedAt: string;
    totalItems?: number;
}
export declare class ProductSummaryDto {
    id: number;
    slug: string;
    name: string;
    price: number;
    category: string;
    status: string;
}
export declare class CourseSummaryDto {
    id: number;
    slug: string;
    title: string;
    price: number;
    category: string;
    level: string;
}
export declare class PaymentQueryDto {
    userId?: number;
    status?: PaymentStatus;
    payableType?: PayableType;
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
}
export declare class PaginatedPaymentResponseDto {
    data: PaymentResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export declare class PaymentStatsDto {
    totalAmount: number;
    totalPayments: number;
    completedPayments: number;
    pendingPayments: number;
    processingPayments: number;
    failedPayments: number;
    cancelledPayments: number;
    successRate: number;
    averageAmount: number;
}
export declare class PaymentSummaryDto {
    id: number;
    amount: number;
    status: PaymentStatus;
    paymentMethod: string;
    createdAt: string;
    paidAt: string | null;
}
