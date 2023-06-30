import create from 'zustand'
import { createProductSlice, ProductSlice } from './slices/createProductSlice'
import { persist } from 'zustand/middleware'

type StoreState = ProductSlice 

export const useAppStore = create<StoreState>()(persist((...a) => ({
    ...createProductSlice(...a),
}), {name: 'global-store'}))