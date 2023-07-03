import { StateCreator } from "zustand";
import { Product } from "../../components/types";

export interface CartSlice {
	cart: Product[];
	addToCart: (product: Product) => void;
	removeFromCart: (productId: number) => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
	cart: [],
	addToCart: (product: Product) => {
		const cart = get().cart;
		const findProduct = cart.find(p => p.id === product.id);
		if (findProduct) {
			findProduct.quantity! += 1;
		} else {
			cart.push({ ...product, quantity: 1 });
		}
		set({ cart });
	},
	removeFromCart: (productId: number) => {
		const cart = get().cart;
		const findProduct = cart.find(p => p.id === productId);
		if (findProduct) {
			findProduct.quantity! -= 1;
			set({ cart: cart.filter(product => product.quantity) })
		}
	},
})