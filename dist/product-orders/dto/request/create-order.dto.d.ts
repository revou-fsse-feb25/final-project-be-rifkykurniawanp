import { OrderStatus } from '@prisma/client';
export declare class CreateOrderDto {
    buyerId: number;
    paymentId: number;
    totalPrice: number;
    status: OrderStatus;
}
