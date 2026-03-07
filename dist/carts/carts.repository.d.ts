import { PrismaService } from '../prisma/prisma.service';
import { Cart, CartItemType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';
interface CreateCartData {
    userId: number;
}
interface UpdateCartData {
    updatedAt?: Date;
}
interface CreateCartItemData {
    cartId: number;
    itemType: CartItemType;
    itemId: number;
    quantity: number;
    price: Decimal;
}
interface UpdateCartItemData {
    quantity?: number;
    price?: Decimal;
}
export declare class CartsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCartData): Promise<Cart & {
        items: any[];
        user: any;
        payments: any[];
    }>;
    findByUserId(userId: number, args?: Prisma.CartFindFirstArgs): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    } | null>;
    findById(id: number, options?: {
        where?: any;
        include?: any;
    }): Promise<({
        [x: string]: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            transactionId: string | null;
            paidAt: Date | null;
        }[] | ({
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            transactionId: string | null;
            paidAt: Date | null;
        } | {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            transactionId: string | null;
            paidAt: Date | null;
        })[] | ({
            id: number;
            deletedAt: Date | null;
            productId: number | null;
            courseId: number | null;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            quantity: number;
            priceSnapshot: Prisma.Decimal;
            addedAt: Date;
        } | {
            id: number;
            deletedAt: Date | null;
            productId: number | null;
            courseId: number | null;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            quantity: number;
            priceSnapshot: Prisma.Decimal;
            addedAt: Date;
        })[] | {
            id: number;
            deletedAt: Date | null;
            productId: number | null;
            courseId: number | null;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            quantity: number;
            priceSnapshot: Prisma.Decimal;
            addedAt: Date;
        }[];
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    }) | null>;
    findAll(skip?: number, take?: number, options?: {
        where?: any;
        include?: any;
    }): Promise<({
        [x: string]: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            transactionId: string | null;
            paidAt: Date | null;
        }[] | ({
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            transactionId: string | null;
            paidAt: Date | null;
        } | {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            transactionId: string | null;
            paidAt: Date | null;
        })[] | ({
            id: number;
            deletedAt: Date | null;
            productId: number | null;
            courseId: number | null;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            quantity: number;
            priceSnapshot: Prisma.Decimal;
            addedAt: Date;
        } | {
            id: number;
            deletedAt: Date | null;
            productId: number | null;
            courseId: number | null;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            quantity: number;
            priceSnapshot: Prisma.Decimal;
            addedAt: Date;
        })[] | {
            id: number;
            deletedAt: Date | null;
            productId: number | null;
            courseId: number | null;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            quantity: number;
            priceSnapshot: Prisma.Decimal;
            addedAt: Date;
        }[];
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    })[]>;
    findDeleted(skip?: number, take?: number): Promise<({
        user: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            avatar: string | null;
            dynamicRoleId: number | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        items: ({
            product: {
                description: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                name: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                slug: string;
                price: Prisma.Decimal;
                stock: number;
                supplierId: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                images: string[];
                categoryId: number | null;
                rating: Prisma.Decimal;
                reviewCount: number;
            } | null;
            course: {
                certificate: boolean;
                description: string | null;
                title: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.CourseStatus;
                slug: string;
                price: Prisma.Decimal;
                categoryId: number | null;
                rating: Prisma.Decimal;
                reviewCount: number;
                level: import(".prisma/client").$Enums.CourseLevel;
                syllabus: string | null;
                instructorId: number;
                language: string;
                shortDescription: string | null;
                students: number;
                subtitles: string[];
                thumbnail: string | null;
                previewVideo: string | null;
                whatYouWillLearn: string[];
                requirements: string[];
                targetAudience: string[];
                totalDuration: number | null;
                totalLessons: number | null;
                isPublished: boolean;
                maxStudents: number | null;
            } | null;
        } & {
            id: number;
            deletedAt: Date | null;
            productId: number | null;
            courseId: number | null;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            quantity: number;
            priceSnapshot: Prisma.Decimal;
            addedAt: Date;
        })[];
        payments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            transactionId: string | null;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    })[]>;
    findByIdIncludingDeleted(id: number): Promise<({
        user: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            avatar: string | null;
            dynamicRoleId: number | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        items: ({
            product: {
                description: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                name: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                slug: string;
                price: Prisma.Decimal;
                stock: number;
                supplierId: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                images: string[];
                categoryId: number | null;
                rating: Prisma.Decimal;
                reviewCount: number;
            } | null;
            course: {
                certificate: boolean;
                description: string | null;
                title: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.CourseStatus;
                slug: string;
                price: Prisma.Decimal;
                categoryId: number | null;
                rating: Prisma.Decimal;
                reviewCount: number;
                level: import(".prisma/client").$Enums.CourseLevel;
                syllabus: string | null;
                instructorId: number;
                language: string;
                shortDescription: string | null;
                students: number;
                subtitles: string[];
                thumbnail: string | null;
                previewVideo: string | null;
                whatYouWillLearn: string[];
                requirements: string[];
                targetAudience: string[];
                totalDuration: number | null;
                totalLessons: number | null;
                isPublished: boolean;
                maxStudents: number | null;
            } | null;
        } & {
            id: number;
            deletedAt: Date | null;
            productId: number | null;
            courseId: number | null;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            quantity: number;
            priceSnapshot: Prisma.Decimal;
            addedAt: Date;
        })[];
        payments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            transactionId: string | null;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    }) | null>;
    update(id: number, data: UpdateCartData): Promise<{
        user: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            avatar: string | null;
            dynamicRoleId: number | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        items: ({
            product: {
                description: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                name: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                slug: string;
                price: Prisma.Decimal;
                stock: number;
                supplierId: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                images: string[];
                categoryId: number | null;
                rating: Prisma.Decimal;
                reviewCount: number;
            } | null;
            course: {
                certificate: boolean;
                description: string | null;
                title: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.CourseStatus;
                slug: string;
                price: Prisma.Decimal;
                categoryId: number | null;
                rating: Prisma.Decimal;
                reviewCount: number;
                level: import(".prisma/client").$Enums.CourseLevel;
                syllabus: string | null;
                instructorId: number;
                language: string;
                shortDescription: string | null;
                students: number;
                subtitles: string[];
                thumbnail: string | null;
                previewVideo: string | null;
                whatYouWillLearn: string[];
                requirements: string[];
                targetAudience: string[];
                totalDuration: number | null;
                totalLessons: number | null;
                isPublished: boolean;
                maxStudents: number | null;
            } | null;
        } & {
            id: number;
            deletedAt: Date | null;
            productId: number | null;
            courseId: number | null;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            quantity: number;
            priceSnapshot: Prisma.Decimal;
            addedAt: Date;
        })[];
        payments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            transactionId: string | null;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    }>;
    softDelete(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    }>;
    restore(id: number): Promise<{
        user: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            avatar: string | null;
            dynamicRoleId: number | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        items: ({
            product: {
                description: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                name: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                slug: string;
                price: Prisma.Decimal;
                stock: number;
                supplierId: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                images: string[];
                categoryId: number | null;
                rating: Prisma.Decimal;
                reviewCount: number;
            } | null;
            course: {
                certificate: boolean;
                description: string | null;
                title: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                status: import(".prisma/client").$Enums.CourseStatus;
                slug: string;
                price: Prisma.Decimal;
                categoryId: number | null;
                rating: Prisma.Decimal;
                reviewCount: number;
                level: import(".prisma/client").$Enums.CourseLevel;
                syllabus: string | null;
                instructorId: number;
                language: string;
                shortDescription: string | null;
                students: number;
                subtitles: string[];
                thumbnail: string | null;
                previewVideo: string | null;
                whatYouWillLearn: string[];
                requirements: string[];
                targetAudience: string[];
                totalDuration: number | null;
                totalLessons: number | null;
                isPublished: boolean;
                maxStudents: number | null;
            } | null;
        } & {
            id: number;
            deletedAt: Date | null;
            productId: number | null;
            courseId: number | null;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            quantity: number;
            priceSnapshot: Prisma.Decimal;
            addedAt: Date;
        })[];
        payments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            transactionId: string | null;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    }>;
    hardDelete(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    }>;
    createItem(data: CreateCartItemData): Promise<{
        id: number;
        deletedAt: Date | null;
        productId: number | null;
        courseId: number | null;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        quantity: number;
        priceSnapshot: Prisma.Decimal;
        addedAt: Date;
    }>;
    findItemByCartAndItem(cartId: number, itemType: CartItemType, itemId: number): Promise<{
        id: number;
        deletedAt: Date | null;
        productId: number | null;
        courseId: number | null;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        quantity: number;
        priceSnapshot: Prisma.Decimal;
        addedAt: Date;
    } | null>;
    findItemById(id: number): Promise<({
        product: {
            description: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            slug: string;
            price: Prisma.Decimal;
            stock: number;
            supplierId: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            images: string[];
            categoryId: number | null;
            rating: Prisma.Decimal;
            reviewCount: number;
        } | null;
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.CourseStatus;
            slug: string;
            price: Prisma.Decimal;
            categoryId: number | null;
            rating: Prisma.Decimal;
            reviewCount: number;
            level: import(".prisma/client").$Enums.CourseLevel;
            syllabus: string | null;
            instructorId: number;
            language: string;
            shortDescription: string | null;
            students: number;
            subtitles: string[];
            thumbnail: string | null;
            previewVideo: string | null;
            whatYouWillLearn: string[];
            requirements: string[];
            targetAudience: string[];
            totalDuration: number | null;
            totalLessons: number | null;
            isPublished: boolean;
            maxStudents: number | null;
        } | null;
    } & {
        id: number;
        deletedAt: Date | null;
        productId: number | null;
        courseId: number | null;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        quantity: number;
        priceSnapshot: Prisma.Decimal;
        addedAt: Date;
    }) | null>;
    findItemsByCart(cartId: number): Promise<({
        product: {
            description: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            slug: string;
            price: Prisma.Decimal;
            stock: number;
            supplierId: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            images: string[];
            categoryId: number | null;
            rating: Prisma.Decimal;
            reviewCount: number;
        } | null;
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.CourseStatus;
            slug: string;
            price: Prisma.Decimal;
            categoryId: number | null;
            rating: Prisma.Decimal;
            reviewCount: number;
            level: import(".prisma/client").$Enums.CourseLevel;
            syllabus: string | null;
            instructorId: number;
            language: string;
            shortDescription: string | null;
            students: number;
            subtitles: string[];
            thumbnail: string | null;
            previewVideo: string | null;
            whatYouWillLearn: string[];
            requirements: string[];
            targetAudience: string[];
            totalDuration: number | null;
            totalLessons: number | null;
            isPublished: boolean;
            maxStudents: number | null;
        } | null;
    } & {
        id: number;
        deletedAt: Date | null;
        productId: number | null;
        courseId: number | null;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        quantity: number;
        priceSnapshot: Prisma.Decimal;
        addedAt: Date;
    })[]>;
    updateItem(id: number, data: UpdateCartItemData): Promise<{
        id: number;
        deletedAt: Date | null;
        productId: number | null;
        courseId: number | null;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        quantity: number;
        priceSnapshot: Prisma.Decimal;
        addedAt: Date;
    }>;
    deleteItem(id: number): Promise<{
        id: number;
        deletedAt: Date | null;
        productId: number | null;
        courseId: number | null;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        quantity: number;
        priceSnapshot: Prisma.Decimal;
        addedAt: Date;
    }>;
    deleteItemsByCart(cartId: number): Promise<Prisma.BatchPayload>;
}
export {};
