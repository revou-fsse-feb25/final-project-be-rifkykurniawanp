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
        deletedAt: Date | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: number, options?: {
        where?: any;
        include?: any;
    }): Promise<({
        [x: string]: ({
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
        } | {
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
        })[] | ({
            id: number;
            cartId: number;
            deletedAt: Date | null;
            userId: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        } | {
            id: number;
            cartId: number;
            deletedAt: Date | null;
            userId: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        })[] | {
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
        }[] | {
            id: number;
            cartId: number;
            deletedAt: Date | null;
            userId: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[];
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: number;
        deletedAt: Date | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    findAll(skip?: number, take?: number, options?: {
        where?: any;
        include?: any;
    }): Promise<({
        [x: string]: ({
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
        } | {
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
        })[] | ({
            id: number;
            cartId: number;
            deletedAt: Date | null;
            userId: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        } | {
            id: number;
            cartId: number;
            deletedAt: Date | null;
            userId: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        })[] | {
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
        }[] | {
            id: number;
            cartId: number;
            deletedAt: Date | null;
            userId: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[];
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: number;
        deletedAt: Date | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findDeleted(skip?: number, take?: number): Promise<({
        user: {
            id: number;
            deletedAt: Date | null;
            createdAt: Date;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
        };
        items: ({
            product: {
                id: number;
                price: Prisma.Decimal;
                deletedAt: Date | null;
                name: string;
                createdAt: Date;
                slug: string;
                description: string | null;
                stock: number;
                image: string | null;
                category: import(".prisma/client").$Enums.ProductCategory;
                status: import(".prisma/client").$Enums.ProductStatus;
                supplierId: number;
                rating: Prisma.Decimal;
                reviewCount: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                tags: import(".prisma/client").$Enums.ProductTagName[];
            } | null;
            course: {
                id: number;
                price: Prisma.Decimal;
                deletedAt: Date | null;
                createdAt: Date;
                slug: string;
                description: string | null;
                category: import(".prisma/client").$Enums.CourseCategory;
                rating: Prisma.Decimal;
                title: string;
                syllabus: string | null;
                instructorId: number;
                students: number;
                duration: string | null;
                level: import(".prisma/client").$Enums.CourseLevel;
                language: string;
                certificate: boolean;
            } | null;
        } & {
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
        })[];
        payments: {
            id: number;
            cartId: number;
            deletedAt: Date | null;
            userId: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        deletedAt: Date | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findByIdIncludingDeleted(id: number): Promise<({
        user: {
            id: number;
            deletedAt: Date | null;
            createdAt: Date;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
        };
        items: ({
            product: {
                id: number;
                price: Prisma.Decimal;
                deletedAt: Date | null;
                name: string;
                createdAt: Date;
                slug: string;
                description: string | null;
                stock: number;
                image: string | null;
                category: import(".prisma/client").$Enums.ProductCategory;
                status: import(".prisma/client").$Enums.ProductStatus;
                supplierId: number;
                rating: Prisma.Decimal;
                reviewCount: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                tags: import(".prisma/client").$Enums.ProductTagName[];
            } | null;
            course: {
                id: number;
                price: Prisma.Decimal;
                deletedAt: Date | null;
                createdAt: Date;
                slug: string;
                description: string | null;
                category: import(".prisma/client").$Enums.CourseCategory;
                rating: Prisma.Decimal;
                title: string;
                syllabus: string | null;
                instructorId: number;
                students: number;
                duration: string | null;
                level: import(".prisma/client").$Enums.CourseLevel;
                language: string;
                certificate: boolean;
            } | null;
        } & {
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
        })[];
        payments: {
            id: number;
            cartId: number;
            deletedAt: Date | null;
            userId: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        deletedAt: Date | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    update(id: number, data: UpdateCartData): Promise<{
        user: {
            id: number;
            deletedAt: Date | null;
            createdAt: Date;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
        };
        items: ({
            product: {
                id: number;
                price: Prisma.Decimal;
                deletedAt: Date | null;
                name: string;
                createdAt: Date;
                slug: string;
                description: string | null;
                stock: number;
                image: string | null;
                category: import(".prisma/client").$Enums.ProductCategory;
                status: import(".prisma/client").$Enums.ProductStatus;
                supplierId: number;
                rating: Prisma.Decimal;
                reviewCount: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                tags: import(".prisma/client").$Enums.ProductTagName[];
            } | null;
            course: {
                id: number;
                price: Prisma.Decimal;
                deletedAt: Date | null;
                createdAt: Date;
                slug: string;
                description: string | null;
                category: import(".prisma/client").$Enums.CourseCategory;
                rating: Prisma.Decimal;
                title: string;
                syllabus: string | null;
                instructorId: number;
                students: number;
                duration: string | null;
                level: import(".prisma/client").$Enums.CourseLevel;
                language: string;
                certificate: boolean;
            } | null;
        } & {
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
        })[];
        payments: {
            id: number;
            cartId: number;
            deletedAt: Date | null;
            userId: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        deletedAt: Date | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    softDelete(id: number): Promise<{
        id: number;
        deletedAt: Date | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    restore(id: number): Promise<{
        user: {
            id: number;
            deletedAt: Date | null;
            createdAt: Date;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
        };
        items: ({
            product: {
                id: number;
                price: Prisma.Decimal;
                deletedAt: Date | null;
                name: string;
                createdAt: Date;
                slug: string;
                description: string | null;
                stock: number;
                image: string | null;
                category: import(".prisma/client").$Enums.ProductCategory;
                status: import(".prisma/client").$Enums.ProductStatus;
                supplierId: number;
                rating: Prisma.Decimal;
                reviewCount: number;
                origin: import(".prisma/client").$Enums.ProductOrigin;
                weight: string | null;
                tags: import(".prisma/client").$Enums.ProductTagName[];
            } | null;
            course: {
                id: number;
                price: Prisma.Decimal;
                deletedAt: Date | null;
                createdAt: Date;
                slug: string;
                description: string | null;
                category: import(".prisma/client").$Enums.CourseCategory;
                rating: Prisma.Decimal;
                title: string;
                syllabus: string | null;
                instructorId: number;
                students: number;
                duration: string | null;
                level: import(".prisma/client").$Enums.CourseLevel;
                language: string;
                certificate: boolean;
            } | null;
        } & {
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
        })[];
        payments: {
            id: number;
            cartId: number;
            deletedAt: Date | null;
            userId: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            amount: Prisma.Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        }[];
    } & {
        id: number;
        deletedAt: Date | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    hardDelete(id: number): Promise<{
        id: number;
        deletedAt: Date | null;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createItem(data: CreateCartItemData): Promise<{
        product: {
            id: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
            name: string;
            createdAt: Date;
            slug: string;
            description: string | null;
            stock: number;
            image: string | null;
            category: import(".prisma/client").$Enums.ProductCategory;
            status: import(".prisma/client").$Enums.ProductStatus;
            supplierId: number;
            rating: Prisma.Decimal;
            reviewCount: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            tags: import(".prisma/client").$Enums.ProductTagName[];
        } | null;
        course: {
            id: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
            createdAt: Date;
            slug: string;
            description: string | null;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: Prisma.Decimal;
            title: string;
            syllabus: string | null;
            instructorId: number;
            students: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            certificate: boolean;
        } | null;
    } & {
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: Prisma.Decimal;
        deletedAt: Date | null;
    }>;
    findItemByCartAndItem(cartId: number, itemType: CartItemType, itemId: number): Promise<({
        product: {
            id: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
            name: string;
            createdAt: Date;
            slug: string;
            description: string | null;
            stock: number;
            image: string | null;
            category: import(".prisma/client").$Enums.ProductCategory;
            status: import(".prisma/client").$Enums.ProductStatus;
            supplierId: number;
            rating: Prisma.Decimal;
            reviewCount: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            tags: import(".prisma/client").$Enums.ProductTagName[];
        } | null;
        course: {
            id: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
            createdAt: Date;
            slug: string;
            description: string | null;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: Prisma.Decimal;
            title: string;
            syllabus: string | null;
            instructorId: number;
            students: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            certificate: boolean;
        } | null;
    } & {
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: Prisma.Decimal;
        deletedAt: Date | null;
    }) | null>;
    findItemById(id: number): Promise<({
        product: {
            id: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
            name: string;
            createdAt: Date;
            slug: string;
            description: string | null;
            stock: number;
            image: string | null;
            category: import(".prisma/client").$Enums.ProductCategory;
            status: import(".prisma/client").$Enums.ProductStatus;
            supplierId: number;
            rating: Prisma.Decimal;
            reviewCount: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            tags: import(".prisma/client").$Enums.ProductTagName[];
        } | null;
        course: {
            id: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
            createdAt: Date;
            slug: string;
            description: string | null;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: Prisma.Decimal;
            title: string;
            syllabus: string | null;
            instructorId: number;
            students: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            certificate: boolean;
        } | null;
    } & {
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: Prisma.Decimal;
        deletedAt: Date | null;
    }) | null>;
    findItemsByCart(cartId: number): Promise<({
        product: {
            id: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
            name: string;
            createdAt: Date;
            slug: string;
            description: string | null;
            stock: number;
            image: string | null;
            category: import(".prisma/client").$Enums.ProductCategory;
            status: import(".prisma/client").$Enums.ProductStatus;
            supplierId: number;
            rating: Prisma.Decimal;
            reviewCount: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            tags: import(".prisma/client").$Enums.ProductTagName[];
        } | null;
        course: {
            id: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
            createdAt: Date;
            slug: string;
            description: string | null;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: Prisma.Decimal;
            title: string;
            syllabus: string | null;
            instructorId: number;
            students: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            certificate: boolean;
        } | null;
    } & {
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: Prisma.Decimal;
        deletedAt: Date | null;
    })[]>;
    updateItem(id: number, data: UpdateCartItemData): Promise<{
        product: {
            id: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
            name: string;
            createdAt: Date;
            slug: string;
            description: string | null;
            stock: number;
            image: string | null;
            category: import(".prisma/client").$Enums.ProductCategory;
            status: import(".prisma/client").$Enums.ProductStatus;
            supplierId: number;
            rating: Prisma.Decimal;
            reviewCount: number;
            origin: import(".prisma/client").$Enums.ProductOrigin;
            weight: string | null;
            tags: import(".prisma/client").$Enums.ProductTagName[];
        } | null;
        course: {
            id: number;
            price: Prisma.Decimal;
            deletedAt: Date | null;
            createdAt: Date;
            slug: string;
            description: string | null;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: Prisma.Decimal;
            title: string;
            syllabus: string | null;
            instructorId: number;
            students: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            certificate: boolean;
        } | null;
    } & {
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: Prisma.Decimal;
        deletedAt: Date | null;
    }>;
    deleteItem(id: number): Promise<{
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: Prisma.Decimal;
        deletedAt: Date | null;
    }>;
    deleteItemsByCart(cartId: number): Promise<Prisma.BatchPayload>;
}
export {};
