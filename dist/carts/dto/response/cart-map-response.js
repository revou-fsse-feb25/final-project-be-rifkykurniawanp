"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartMapper = void 0;
class CartMapper {
    static toCartItemDto(item) {
        const subtotal = Number(item.price) * item.quantity;
        let productDto;
        let courseDto;
        if (item.itemType === 'PRODUCT' && item.product) {
            const p = item.product;
            productDto = {
                id: p.id,
                name: p.name,
                slug: p.slug,
                image: p.image ?? undefined,
                price: Number(p.price),
                stock: p.stock,
            };
        }
        if (item.itemType === 'COURSE' && item.course) {
            const c = item.course;
            courseDto = {
                id: c.id,
                title: c.title,
                slug: c.slug,
                price: Number(c.price),
                level: c.level ?? undefined,
                category: c.category ?? undefined,
            };
        }
        return {
            id: item.id,
            cartId: item.cartId,
            itemType: item.itemType,
            itemId: item.itemId,
            quantity: item.quantity,
            price: Number(item.price),
            subtotal,
            product: productDto,
            course: courseDto,
        };
    }
    static toCartDto(cart) {
        const itemsDto = cart.items.map(item => this.toCartItemDto(item));
        const totalItems = itemsDto.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = itemsDto.reduce((sum, item) => sum + item.subtotal, 0);
        return {
            id: cart.id,
            userId: cart.userId,
            user: cart.user
                ? {
                    id: cart.user.id,
                    email: cart.user.email,
                    firstName: cart.user.firstName ?? undefined,
                    lastName: cart.user.lastName ?? undefined,
                }
                : undefined,
            items: itemsDto,
            totalItems,
            totalAmount,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
        };
    }
}
exports.CartMapper = CartMapper;
//# sourceMappingURL=cart-map-response.js.map