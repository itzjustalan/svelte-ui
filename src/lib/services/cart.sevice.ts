import { cartModelSchema, type CartModel } from "$lib/models/db/cart.model";
import { BaseService } from "./base.service";

class CartService extends BaseService<CartModel>{
    constructor() {
        super("carts", cartModelSchema);
    }   
}

export const cartService = new CartService();