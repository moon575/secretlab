'use client'
import { useAppStore } from '../../store/store'
import useStore from '../../store/useStore';
import React from 'react'
import { Header } from '../../components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { Counter } from '../../components/Counter';

export default function Home() {
  const { addToCart } = useAppStore();
  const product = useStore(useAppStore, (state) => state.currentProduct);
  console.log('current product', product);

  return (
    product && <div>
      <Header />
      <div className="flex flex-wrap w-full">
        <div className='p-10 w-full relative h-[400px] lg:w-[400px] lg:grow-0'>
          <Image className='object-contain' src={product?.images[0] || ''} alt='' fill />
        </div>
        <div className='p-10 w-full flex flex-col items-center lg:w-[400px] lg:grow lg:items-start'>
          <h3>{product.title}</h3>
          <div className="text-theme-red truncate mb-3">{product.description}</div>
          <div>Price <span>S${product.price}</span></div>
          <div className='p-3 flex flex-row'>
            <span>Quantity</span>
            <Counter product={product} />
          </div>
          <button
            type="button"
            className={`w-full text-white font-[500] py-1.5 px-3 rounded-md ${product.stock === 0 ? "bg-deep-grey cursor-not-allowed" : "bg-theme-red hover:ring-1 hover:ring-theme-red"}`}
            onClick={product.stock === 0 ? undefined : () => addToCart(product)}
          >
            {product.stock === 0 ? 'Sold Out' : 'Add To Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
