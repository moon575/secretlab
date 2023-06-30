import { StateCreator } from "zustand";
import { Product } from '../../common/types'
export interface ProductSlice {
    products: Product[];
    fetchProducts: () => void;
    pageSize: number;
    pageNo: number;
    total: number;
}

export const createProductSlice: StateCreator<ProductSlice> = (set, get) => ({
    products: [],
    pageNo: 0,
    pageSize: 20,
    total: 0,
    fetchProducts: async () => {
        const res = await fetch(`https://dummyjson.com/products?limit=${get().pageSize}&skip=${get().pageNo * get().pageSize}`)
        const data = await res.json();
        set({ products: data.products, total: data.total })
    },
})