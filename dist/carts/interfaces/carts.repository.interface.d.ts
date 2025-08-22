import { Cart, CartItem, CartItemType, Prisma } from '@prisma/client';
export interface CreateCartData {
    userId: number;
}
export interface UpdateCartData {
    updatedAt?: Date;
}
export interface CreateCartItemData {
    cartId: number;
    itemType: CartItemType;
    itemId: number;
    quantity: number;
    price: number;
}
export interface UpdateCartItemData {
    quantity?: number;
    price?: number;
}
export interface CartWithRelations extends Cart {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    payments: {
        id: number;
        status: string;
        amount: number;
    }[];
    items: CartItemWithRelations[];
}
export interface CartItemWithRelations extends CartItem {
    product?: {
        id: number;
        name: string;
        slug: string;
        image?: string;
        price: number;
        stock: number;
    } | null;
    course?: {
        id: number;
        title: string;
        slug: string;
        price: number;
        level?: string;
        category?: string;
    } | null;
}
export interface ICartsRepository {
    create(data: CreateCartData): Promise<CartWithRelations>;
    findById(id: number): Promise<CartWithRelations | null>;
    findByIdIncludingDeleted(id: number): Promise<CartWithRelations | null>;
    findByUserId(userId: number): Promise<CartWithRelations | null>;
    findAll(skip?: number, take?: number): Promise<CartWithRelations[]>;
    findDeleted(skip?: number, take?: number): Promise<CartWithRelations[]>;
    update(id: number, data: UpdateCartData): Promise<CartWithRelations>;
    softDelete(id: number): Promise<Cart>;
    hardDelete(id: number): Promise<Cart>;
    restore(id: number): Promise<CartWithRelations>;
    countByUser(userId: number): Promise<number>;
    createItem(data: CreateCartItemData): Promise<CartItemWithRelations>;
    findItemById(id: number): Promise<CartItemWithRelations | null>;
    findItemByCartAndItem(cartId: number, itemType: string, itemId: number): Promise<CartItemWithRelations | null>;
    findItemsByCart(cartId: number): Promise<CartItemWithRelations[]>;
    updateItem(id: number, data: UpdateCartItemData): Promise<CartItemWithRelations>;
    deleteItem(id: number): Promise<CartItem>;
    deleteItemsByCart(cartId: number): Promise<Prisma.BatchPayload>;
    countItemsByCart(cartId: number): Promise<number>;
}
