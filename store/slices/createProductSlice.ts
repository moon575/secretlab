import { StateCreator } from "zustand";
import { Product } from '../../components/types'
export interface ProductSlice {
    products: Product[];
		categories: string[];
    fetchProducts: () => void;
    fetchCategories: () => void;
    fetchProductsByCategory: (category: string) => void;
}

export const createProductSlice: StateCreator<ProductSlice> = (set, get) => ({
    products: [],
		categories: [],
    currentProduct: undefined,
    fetchProducts: async () => {
			const res = await fetch('https://dummyjson.com/products?limit=100&skip=0')
			const data = await res.json();
			set({ products: data.products })
    },
    fetchCategories:async () => {
      fetch('https://dummyjson.com/products/categories')
			.then(res => res.json())
			.then((data) => set({ categories: data}));
    },
    fetchProductsByCategory:async (category) => {
      if (category === 'Category') {
        fetch('https://dummyjson.com/products?limit=100&skip=0')
        .then(res => res.json())
			  .then((data) => set({ products: data.products}));
      } else {
        fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then((data) => set({ products: data.products}));
      }
    }
})