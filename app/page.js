'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useAppStore } from '../store/store'
import { ProductCard } from '../common/ProductCard'
import React from 'react'

export default function Home() {
  const { products, fetchProducts } = useAppStore()
  React.useEffect(() => {
    fetchProducts();
  }, [])
  console.log('products', products);
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-8">
        {products?.map(product => <ProductCard key={product.id} {...product} />)}
      </div>
    </div>
  )
}
