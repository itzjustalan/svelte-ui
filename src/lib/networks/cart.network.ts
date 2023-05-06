import type { CartData } from '$lib/models/data/cart.data';
import type { CartModel } from '$lib/models/db/cart.model';
import type { CartUpdateInput } from '$lib/models/input/cart';
import defaultApi from './apis';
class CartNetwork {
	getCart = async () => (await defaultApi.get<CartData[]>('v1/api/cart')).data;
	updateCart = async (data: CartUpdateInput) =>
		await defaultApi.post<CartModel>('v1/api/cart', data);
}
export const cartNetwork = new CartNetwork();
