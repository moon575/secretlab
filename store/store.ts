import create from 'zustand'
import { createProductSlice, ProductSlice } from './slices/createProductSlice'
import { createCartSlice, CartSlice } from './slices/createCartSlice'
import { persist } from 'zustand/middleware'

type StoreState = ProductSlice & CartSlice

export const useAppStore = create<StoreState>()(persist((...a) => ({
    ...createProductSlice(...a),
    ...createCartSlice(...a)
}), {name: 'global-store'}))