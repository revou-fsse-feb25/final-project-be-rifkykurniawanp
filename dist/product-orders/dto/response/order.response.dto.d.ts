import { OrderStatus } from '@prisma/client';
export declare class OrderResponseDto {
    id: number;
    buyerId: number;
    paymentId: number;
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;
    items: OrderOrderItemResponseDto[];
}
export declare class OrderOrderItemResponseDto {
    id: number;
    productId: number;
    quantity: number;
    priceEach: number;
}
