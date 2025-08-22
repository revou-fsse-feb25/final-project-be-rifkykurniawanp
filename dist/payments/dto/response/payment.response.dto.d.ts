import { PaymentStatus, PayableType } from '@prisma/client';
export declare class UserBasicDto {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
}
export declare class CartBasicDto {
    id: number;
    totalItems: number;
    totalAmount: number;
}
export declare class ProductOrderDto {
    id: number;
    totalPrice: number;
    status: string;
    itemCount: number;
}
export declare class CourseEnrollmentDto {
    id: number;
    courseId: number;
    courseName?: string;
    pricePaid: number;
    progress: number;
}
export declare class PaymentResponseDto {
    id: number;
    userId: number;
    cartId: number;
    amount: number;
    paymentMethod: string;
    status: PaymentStatus;
    payableType: PayableType;
    payableId: number;
    paidAt?: Date;
    createdAt: Date;
    user?: UserBasicDto;
    cart?: CartBasicDto;
    productOrders: ProductOrderDto[];
    courseEnrollments: CourseEnrollmentDto[];
}
