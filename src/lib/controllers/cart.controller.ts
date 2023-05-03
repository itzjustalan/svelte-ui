import { AppError, InternalServerError } from "$lib/errors";
import { log } from "$lib/logger";
import { cartDataSchema, type CartData } from "$lib/models/data/cart.data";
import type { CartModel } from "$lib/models/db/cart.model";
import type { CartUpdateInput } from "$lib/models/input/cart";
import { cartService } from "$lib/services/cart.sevice";

class CartController {
    getMyCartId = (userId: string): string | undefined => userId.split(":")[1] === undefined ? undefined : `${cartService.tablename + ':' + userId.split(":")[1]}`;

    // getMyCartId = (userId: string): string | undefined => {
    //     const id = userId.split(":")[1];
    //     if (!id) return;
    //     else return `${cartService.tablename}:${id}`;
    // };

    async createCartForUser(userId: string): Promise<CartModel | undefined> {
        const cartId = this.getMyCartId(userId);
        if (!cartId) return;
        try {
            const ndate = new Date();
            return await cartService.overwrite({
                id: cartId,
                items: [],
                createdAt: ndate,
                updatedAt: ndate,
            });
        } catch (error) {
            log.error(error);
        }
    }

    async getUserCart(userId: string): Promise<AppError | CartData> {
        const cartId = this.getMyCartId(userId);
        if (!cartId) return new InternalServerError('error fetching cart');
        return await cartService.findOneById<CartData>(cartId, ['items', 'items.menuItem', 'items.menuItem.menuItemTypes'], cartDataSchema) ?? new InternalServerError('error fetching cart');
    }

    async updateCart(userId: string, data: CartUpdateInput): Promise<AppError | CartModel> {
        const cartId = this.getMyCartId(userId);
        if (!cartId) return new InternalServerError("error fetching cart");
        const cart = await cartService.findOneById<CartModel>(cartId);
        if (!cart) return new InternalServerError("error fetching cart");
        if (data.add) {
            const index = cart.items.findIndex(e => e.menuItem === data.add);
            if (index < 0) cart.items.push({ menuItem: data.add, quantity: 1 });
            else cart.items[index].quantity++;
        } else if (data.remove) {
            log.warn('rm');
            const index = cart.items.findIndex(e => e.menuItem === data.remove);
            log.warn(index);
            if (index > -1) {
                if (cart.items[index].quantity > 1) cart.items[index].quantity--;
                else cart.items.splice(index, 1);
            }
        } else {
            return new InternalServerError('error updating cart');
        }
        const ncart = await cartService.updateById(cartId, { items: cart.items });
        if (!ncart) return new InternalServerError('error updating cart');
        else return ncart;
    }
}

export const cartController = new CartController();
