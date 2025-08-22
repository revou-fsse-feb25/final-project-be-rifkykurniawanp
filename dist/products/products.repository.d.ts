import { PrismaService } from '../prisma/prisma.service';
import { IProductsRepository, ProductFilter } from './interfaces/products.repository.interface';
import { CreateProductDto } from './dto/request/create-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
export declare class ProductsRepository implements IProductsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateProductDto & {
        supplierId: number;
    }): Promise<{
        name: string;
        id: number;
        slug: string;
        description: string | null;
        createdAt: Date;
        deletedAt: Date | null;
        tags: import(".prisma/client").$Enums.ProductTagName[];
        status: import(".prisma/client").$Enums.ProductStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        image: string | null;
        category: import(".prisma/client").$Enums.ProductCategory;
        supplierId: number;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        weight: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        reviewCount: number;
    }>;
    findAll(skip: number, take: number, filter?: ProductFilter): Promise<({
        supplier: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
        reviews: {
            id: number;
            createdAt: Date;
            rating: number;
            productId: number;
            userId: number;
            comment: string | null;
        }[];
    } & {
        name: string;
        id: number;
        slug: string;
        description: string | null;
        createdAt: Date;
        deletedAt: Date | null;
        tags: import(".prisma/client").$Enums.ProductTagName[];
        status: import(".prisma/client").$Enums.ProductStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        image: string | null;
        category: import(".prisma/client").$Enums.ProductCategory;
        supplierId: number;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        weight: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        reviewCount: number;
    })[]>;
    findById(id: number, filter?: ProductFilter): Promise<({
        supplier: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
        reviews: {
            id: number;
            createdAt: Date;
            rating: number;
            productId: number;
            userId: number;
            comment: string | null;
        }[];
    } & {
        name: string;
        id: number;
        slug: string;
        description: string | null;
        createdAt: Date;
        deletedAt: Date | null;
        tags: import(".prisma/client").$Enums.ProductTagName[];
        status: import(".prisma/client").$Enums.ProductStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        image: string | null;
        category: import(".prisma/client").$Enums.ProductCategory;
        supplierId: number;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        weight: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        reviewCount: number;
    }) | null>;
    findBySlug(slug: string, filter?: ProductFilter): Promise<({
        supplier: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
        reviews: {
            id: number;
            createdAt: Date;
            rating: number;
            productId: number;
            userId: number;
            comment: string | null;
        }[];
    } & {
        name: string;
        id: number;
        slug: string;
        description: string | null;
        createdAt: Date;
        deletedAt: Date | null;
        tags: import(".prisma/client").$Enums.ProductTagName[];
        status: import(".prisma/client").$Enums.ProductStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        image: string | null;
        category: import(".prisma/client").$Enums.ProductCategory;
        supplierId: number;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        weight: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        reviewCount: number;
    }) | null>;
    findBySlugIncludingDeleted(slug: string): Promise<({
        supplier: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
        reviews: {
            id: number;
            createdAt: Date;
            rating: number;
            productId: number;
            userId: number;
            comment: string | null;
        }[];
    } & {
        name: string;
        id: number;
        slug: string;
        description: string | null;
        createdAt: Date;
        deletedAt: Date | null;
        tags: import(".prisma/client").$Enums.ProductTagName[];
        status: import(".prisma/client").$Enums.ProductStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        image: string | null;
        category: import(".prisma/client").$Enums.ProductCategory;
        supplierId: number;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        weight: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        reviewCount: number;
    }) | null>;
    findBySupplierId(supplierId: number, filter?: ProductFilter): Promise<({
        supplier: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
        reviews: {
            id: number;
            createdAt: Date;
            rating: number;
            productId: number;
            userId: number;
            comment: string | null;
        }[];
    } & {
        name: string;
        id: number;
        slug: string;
        description: string | null;
        createdAt: Date;
        deletedAt: Date | null;
        tags: import(".prisma/client").$Enums.ProductTagName[];
        status: import(".prisma/client").$Enums.ProductStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        image: string | null;
        category: import(".prisma/client").$Enums.ProductCategory;
        supplierId: number;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        weight: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        reviewCount: number;
    })[]>;
    findByIdIncludingDeleted(id: number): Promise<({
        supplier: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
        reviews: {
            id: number;
            createdAt: Date;
            rating: number;
            productId: number;
            userId: number;
            comment: string | null;
        }[];
    } & {
        name: string;
        id: number;
        slug: string;
        description: string | null;
        createdAt: Date;
        deletedAt: Date | null;
        tags: import(".prisma/client").$Enums.ProductTagName[];
        status: import(".prisma/client").$Enums.ProductStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        image: string | null;
        category: import(".prisma/client").$Enums.ProductCategory;
        supplierId: number;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        weight: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        reviewCount: number;
    }) | null>;
    update(id: number, data: UpdateProductDto): Promise<{
        supplier: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
        reviews: {
            id: number;
            createdAt: Date;
            rating: number;
            productId: number;
            userId: number;
            comment: string | null;
        }[];
    } & {
        name: string;
        id: number;
        slug: string;
        description: string | null;
        createdAt: Date;
        deletedAt: Date | null;
        tags: import(".prisma/client").$Enums.ProductTagName[];
        status: import(".prisma/client").$Enums.ProductStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        image: string | null;
        category: import(".prisma/client").$Enums.ProductCategory;
        supplierId: number;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        weight: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        reviewCount: number;
    }>;
    updateRating(id: number, rating: number, reviewCount: number): Promise<{
        supplier: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
        reviews: {
            id: number;
            createdAt: Date;
            rating: number;
            productId: number;
            userId: number;
            comment: string | null;
        }[];
    } & {
        name: string;
        id: number;
        slug: string;
        description: string | null;
        createdAt: Date;
        deletedAt: Date | null;
        tags: import(".prisma/client").$Enums.ProductTagName[];
        status: import(".prisma/client").$Enums.ProductStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        image: string | null;
        category: import(".prisma/client").$Enums.ProductCategory;
        supplierId: number;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        weight: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        reviewCount: number;
    }>;
    softDelete(id: number): Promise<void>;
    hardDelete(id: number): Promise<void>;
    restore(id: number): Promise<{
        supplier: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
        reviews: {
            id: number;
            createdAt: Date;
            rating: number;
            productId: number;
            userId: number;
            comment: string | null;
        }[];
    } & {
        name: string;
        id: number;
        slug: string;
        description: string | null;
        createdAt: Date;
        deletedAt: Date | null;
        tags: import(".prisma/client").$Enums.ProductTagName[];
        status: import(".prisma/client").$Enums.ProductStatus;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number;
        image: string | null;
        category: import(".prisma/client").$Enums.ProductCategory;
        supplierId: number;
        origin: import(".prisma/client").$Enums.ProductOrigin;
        weight: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        reviewCount: number;
    }>;
}
