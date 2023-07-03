'use client'
import Image from 'next/image'
import logo from "../../public/logo.png";
import { useAppStore } from '../../store/store'
import { ProductCard } from '../../components/ProductCard'
import React from 'react'

export default function Home() {
  const { products, fetchProducts, categories, fetchCategories, cart } = useAppStore();
  React.useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [])
  const toCartPage = () => {
    console.log('toggle cart');
  }
  return (
    <div>
      <div className="flex items-center justify-between font-semibold">
        <Image src={logo} alt=''/>
        <div className="relative">
          <button type='button' className='py-1.5 px-3 space-x-1 rounded-md text-sm bg-black text-white hover:ring-1 hover:ring-black' onClick={toCartPage}>
            My Cart
          </button>
          <span className="absolute -right-2 -top-2 bg-theme-red rounded-full text-xs text-white px-1.5 py-0.5">{cart?.reduce((total, product) => total + product.quantity!, 0)}</span>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <select className='' placeholder='Category'>
          <option></option>
        </select>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 bg-[#f3f3f5] p-8">
        {products?.map(product => <ProductCard key={product.id} {...product} />)}
      </div>
      {/* <div className={`absolute right-0 top-0 h-full w-1/4 bg-[#1b1c1f] p-5 ${true ? 'block' : 'hidden'}`}> */}
        {/* <div className="flex items-center justify-between text-gray-400">
          <h4 className='font-semibold text-xl xl:text-2xl'>My Cart</h4>
          <button type='button' onClick={toCartPage}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div> */}
        {/* cart items */}
        {/* {mCart?.map(cartItem => <CartItem key={cartItem.id} {...cartItem} />)}
        {mCart?.length > 0 &&
          <div className="mt-5 text-center">
            <p className="text-gray-500 uppercase">Total</p>
            <h4 className='font-semibold text-4xl text-white'>${calculateTotal()}</h4>
          </div>
        } */}
      {/* </div> */}
    </div>
  )
}
