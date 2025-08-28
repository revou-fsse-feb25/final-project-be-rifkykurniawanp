// src/carts/interfaces/cart.interface.ts
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

// Updated interfaces tanpa direct relations
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

// CartItem dengan manual relations
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
  // Cart CRUD
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
  
  // Cart Item CRUD - Updated methods
  createItem(data: CreateCartItemData): Promise<CartItem>;
  findItemById(id: number): Promise<CartItem | null>;
  findItemByCartAndItem(cartId: number, itemType: CartItemType, itemId: number): Promise<CartItem | null>;
  findItemsByCart(cartId: number): Promise<CartItem[]>;
  findItemsWithDetails(cartId: number): Promise<CartItemWithRelations[]>; // New method
  updateItem(id: number, data: UpdateCartItemData): Promise<CartItem>;
  deleteItem(id: number): Promise<CartItem>;
  deleteItemsByCart(cartId: number): Promise<Prisma.BatchPayload>;
}