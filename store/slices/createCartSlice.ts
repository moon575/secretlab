import { StateCreator } from "zustand";
import { Product } from "../../components/types";

export interface CartSlice {
	cart: Product[];
	addToCart: (product: Product) => void;
	removeFromCart: (productId: number) => void;
	updateQuantity: (productId: number, action: 'increase' | 'decrease') => void;
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
	updateQuantity: (productId: number, action: 'increase' | 'decrease') => {
		const cart = get().cart;
		const findProduct = cart.find(p => p.id === productId);
		if (findProduct) {
			if (action === 'decrease') {
				findProduct.quantity = findProduct.quantity! > 1 ? findProduct.quantity! - 1 : findProduct.quantity!;
			} else {
				findProduct.quantity! += 1;
			}
		}
		const newCart = cart?.map(p => {
			if (p.id === productId) {
				return findProduct!;
			} else {
				return p
			}
		})
		set({ cart: newCart });
	},
	removeFromCart: (productId: number) => {
		set({ cart: get().cart.filter(product => product.id !== productId) })
	},
})