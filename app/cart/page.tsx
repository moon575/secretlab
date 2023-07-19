'use client'
import { useAppStore } from '../../store/store'
import useStore from '../../store/useStore';
import { EmptyCart } from '../../components/EmptyCart'
import { CartItem } from '../../components/CartItem'
import React from 'react'
import { Header } from '../../components/Header';
import Link from 'next/link';

export default function Home() {
  const cart = useStore(useAppStore, (state) => state.cart);

  return (
    <div>
      <Header />
      <div className='text-center text-4xl font-semibold my-8'>
        Shopping Cart
      </div>
      {
        !cart?.length ?
          <EmptyCart /> :
          <div className='flex flex-col md:flex-row relative' >
            <div className='rounded-md shadow-lg mx-auto mb-8 w-11/12 md:w-9/12'>
              {cart?.map(item => <CartItem key={item.id} productId={item.id} />)}
            </div>
            <div className='w-11/12 md:w-2/12 m-auto bg-[#f2f2f2] rounded-md p-8 md:sticky md:top-0 md:h-[200px] md:m-0'>
              {/* <div className='w-11/12 md:w-2/12 bg-[#f2f2f2] rounded-md p-8 sticky top-0 h-[200px]'> */}
              <h3 className='font-semibold text-center'>Cart Summary</h3>
              <div className='font-bold flex justify-between mt-4'><span>Total</span><span>S${cart.reduce((summary, product) => summary + product.price * product.quantity!, 0)}</span></div>
            </div>
          </div>
      }
      <div className='flex justify-center'>
        <Link href='/' className="mt-6">
          <button
            type="button"
            className={'text-white font-[500] py-1.5 px-10 rounded-full bg-theme-red hover:ring-1 hover:ring-theme-red'}
          >
            CONTINUE SHOPPING
          </button>
        </Link>
      </div>
    </div>
  )
}
