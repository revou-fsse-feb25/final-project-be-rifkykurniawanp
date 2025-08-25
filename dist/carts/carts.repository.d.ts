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
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    } | null>;
    findById(id: number, options?: {
        where?: any;
        include?: any;
    }): Promise<({
        [x: string]: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[] | ({
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        } | {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        })[] | ({
            id: number;
            deletedAt: Date | null;
            price: Prisma.Decimal;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
        } | {
            id: number;
            deletedAt: Date | null;
            price: Prisma.Decimal;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
        })[] | {
            id: number;
            deletedAt: Date | null;
            price: Prisma.Decimal;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
        }[];
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    }) | null>;
    findAll(skip?: number, take?: number, options?: {
        where?: any;
        include?: any;
    }): Promise<({
        [x: string]: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[] | ({
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        } | {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        })[] | ({
            id: number;
            deletedAt: Date | null;
            price: Prisma.Decimal;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
        } | {
            id: number;
            deletedAt: Date | null;
            price: Prisma.Decimal;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
        })[] | {
            id: number;
            deletedAt: Date | null;
            price: Prisma.Decimal;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
        }[];
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    })[]>;
    findDeleted(skip?: number, take?: number): Promise<({
        user: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
        };
        items: ({
            product: {
                description: string | null;
                id: number;
                createdAt: Date;
                deletedAt: Date | null;
                name: string;
                tags: import(".prisma/client").$Enums.ProductTagName[];
                status: import(".prisma/client").$Enums.ProductStatus;
                slug: string;
                price: Prisma.Decimal;
                stock: number;
                image: string | null;
                category: import(".prisma/client").$Enums.ProductCategory;
                supplierId: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                rating: Prisma.Decimal;
                reviewCount: number;
            } | null;
            course: {
                certificate: boolean;
                description: string | null;
                title: string;
                id: number;
                createdAt: Date;
                deletedAt: Date | null;
                slug: string;
                price: Prisma.Decimal;
                category: import(".prisma/client").$Enums.CourseCategory;
                rating: Prisma.Decimal;
                syllabus: string | null;
                instructorId: number;
                duration: string | null;
                level: import(".prisma/client").$Enums.CourseLevel;
                language: string;
                students: number;
            } | null;
        } & {
            id: number;
            deletedAt: Date | null;
            price: Prisma.Decimal;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
        })[];
        payments: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    })[]>;
    findByIdIncludingDeleted(id: number): Promise<({
        user: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
        };
        items: ({
            product: {
                description: string | null;
                id: number;
                createdAt: Date;
                deletedAt: Date | null;
                name: string;
                tags: import(".prisma/client").$Enums.ProductTagName[];
                status: import(".prisma/client").$Enums.ProductStatus;
                slug: string;
                price: Prisma.Decimal;
                stock: number;
                image: string | null;
                category: import(".prisma/client").$Enums.ProductCategory;
                supplierId: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                rating: Prisma.Decimal;
                reviewCount: number;
            } | null;
            course: {
                certificate: boolean;
                description: string | null;
                title: string;
                id: number;
                createdAt: Date;
                deletedAt: Date | null;
                slug: string;
                price: Prisma.Decimal;
                category: import(".prisma/client").$Enums.CourseCategory;
                rating: Prisma.Decimal;
                syllabus: string | null;
                instructorId: number;
                duration: string | null;
                level: import(".prisma/client").$Enums.CourseLevel;
                language: string;
                students: number;
            } | null;
        } & {
            id: number;
            deletedAt: Date | null;
            price: Prisma.Decimal;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
        })[];
        payments: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    }) | null>;
    update(id: number, data: UpdateCartData): Promise<{
        user: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
        };
        items: ({
            product: {
                description: string | null;
                id: number;
                createdAt: Date;
                deletedAt: Date | null;
                name: string;
                tags: import(".prisma/client").$Enums.ProductTagName[];
                status: import(".prisma/client").$Enums.ProductStatus;
                slug: string;
                price: Prisma.Decimal;
                stock: number;
                image: string | null;
                category: import(".prisma/client").$Enums.ProductCategory;
                supplierId: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                rating: Prisma.Decimal;
                reviewCount: number;
            } | null;
            course: {
                certificate: boolean;
                description: string | null;
                title: string;
                id: number;
                createdAt: Date;
                deletedAt: Date | null;
                slug: string;
                price: Prisma.Decimal;
                category: import(".prisma/client").$Enums.CourseCategory;
                rating: Prisma.Decimal;
                syllabus: string | null;
                instructorId: number;
                duration: string | null;
                level: import(".prisma/client").$Enums.CourseLevel;
                language: string;
                students: number;
            } | null;
        } & {
            id: number;
            deletedAt: Date | null;
            price: Prisma.Decimal;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
        })[];
        payments: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    }>;
    softDelete(id: number): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    }>;
    restore(id: number): Promise<{
        user: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
        };
        items: ({
            product: {
                description: string | null;
                id: number;
                createdAt: Date;
                deletedAt: Date | null;
                name: string;
                tags: import(".prisma/client").$Enums.ProductTagName[];
                status: import(".prisma/client").$Enums.ProductStatus;
                slug: string;
                price: Prisma.Decimal;
                stock: number;
                image: string | null;
                category: import(".prisma/client").$Enums.ProductCategory;
                supplierId: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                rating: Prisma.Decimal;
                reviewCount: number;
            } | null;
            course: {
                certificate: boolean;
                description: string | null;
                title: string;
                id: number;
                createdAt: Date;
                deletedAt: Date | null;
                slug: string;
                price: Prisma.Decimal;
                category: import(".prisma/client").$Enums.CourseCategory;
                rating: Prisma.Decimal;
                syllabus: string | null;
                instructorId: number;
                duration: string | null;
                level: import(".prisma/client").$Enums.CourseLevel;
                language: string;
                students: number;
            } | null;
        } & {
            id: number;
            deletedAt: Date | null;
            price: Prisma.Decimal;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
        })[];
        payments: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
            cartId: number;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    }>;
    hardDelete(id: number): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    }>;
    createItem(data: CreateCartItemData): Promise<{
        product: {
            description: string | null;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            name: string;
            tags: import(".prisma/client").$Enums.ProductTagName[];
            status: import(".prisma/client").$Enums.ProductStatus;
            slug: string;
            price: Prisma.Decimal;
            stock: number;
            image: string | null;
            category: import(".prisma/client").$Enums.ProductCategory;
            supplierId: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            rating: Prisma.Decimal;
            reviewCount: number;
        } | null;
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            slug: string;
            price: Prisma.Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: Prisma.Decimal;
            syllabus: string | null;
            instructorId: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        } | null;
    } & {
        id: number;
        deletedAt: Date | null;
        price: Prisma.Decimal;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
    }>;
    findItemByCartAndItem(cartId: number, itemType: CartItemType, itemId: number): Promise<({
        product: {
            description: string | null;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            name: string;
            tags: import(".prisma/client").$Enums.ProductTagName[];
            status: import(".prisma/client").$Enums.ProductStatus;
            slug: string;
            price: Prisma.Decimal;
            stock: number;
            image: string | null;
            category: import(".prisma/client").$Enums.ProductCategory;
            supplierId: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            rating: Prisma.Decimal;
            reviewCount: number;
        } | null;
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            slug: string;
            price: Prisma.Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: Prisma.Decimal;
            syllabus: string | null;
            instructorId: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        } | null;
    } & {
        id: number;
        deletedAt: Date | null;
        price: Prisma.Decimal;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
    }) | null>;
    findItemById(id: number): Promise<({
        product: {
            description: string | null;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            name: string;
            tags: import(".prisma/client").$Enums.ProductTagName[];
            status: import(".prisma/client").$Enums.ProductStatus;
            slug: string;
            price: Prisma.Decimal;
            stock: number;
            image: string | null;
            category: import(".prisma/client").$Enums.ProductCategory;
            supplierId: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            rating: Prisma.Decimal;
            reviewCount: number;
        } | null;
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            slug: string;
            price: Prisma.Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: Prisma.Decimal;
            syllabus: string | null;
            instructorId: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        } | null;
    } & {
        id: number;
        deletedAt: Date | null;
        price: Prisma.Decimal;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
    }) | null>;
    findItemsByCart(cartId: number): Promise<({
        product: {
            description: string | null;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            name: string;
            tags: import(".prisma/client").$Enums.ProductTagName[];
            status: import(".prisma/client").$Enums.ProductStatus;
            slug: string;
            price: Prisma.Decimal;
            stock: number;
            image: string | null;
            category: import(".prisma/client").$Enums.ProductCategory;
            supplierId: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            rating: Prisma.Decimal;
            reviewCount: number;
        } | null;
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            slug: string;
            price: Prisma.Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: Prisma.Decimal;
            syllabus: string | null;
            instructorId: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        } | null;
    } & {
        id: number;
        deletedAt: Date | null;
        price: Prisma.Decimal;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
    })[]>;
    updateItem(id: number, data: UpdateCartItemData): Promise<{
        product: {
            description: string | null;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            name: string;
            tags: import(".prisma/client").$Enums.ProductTagName[];
            status: import(".prisma/client").$Enums.ProductStatus;
            slug: string;
            price: Prisma.Decimal;
            stock: number;
            image: string | null;
            category: import(".prisma/client").$Enums.ProductCategory;
            supplierId: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            rating: Prisma.Decimal;
            reviewCount: number;
        } | null;
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            slug: string;
            price: Prisma.Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: Prisma.Decimal;
            syllabus: string | null;
            instructorId: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        } | null;
    } & {
        id: number;
        deletedAt: Date | null;
        price: Prisma.Decimal;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
    }>;
    deleteItem(id: number): Promise<{
        id: number;
        deletedAt: Date | null;
        price: Prisma.Decimal;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
    }>;
    deleteItemsByCart(cartId: number): Promise<Prisma.BatchPayload>;
}
export {};
