'use client'
import Image from "next/image"
import React from "react";
import logo from '../public/logo.png';
import useStore from '../store/useStore';
import { useAppStore } from '../store/store'
import Link from "next/link";
export const Header = () => {
  const cart = useStore(useAppStore, (state) => state.cart);
  return (
    <div className="flex items-center justify-between font-semibold px-4 bg-white">
      <Link href={'/'}>
        <Image src={logo} alt='' />
      </Link>
      <Link
        href="/cart"
      >
        <div className="relative">
          <button type='button' className='py-1.5 px-3 space-x-1 rounded-md text-sm bg-black text-white hover:ring-1 hover:ring-black'>
            My Cart
          </button>
          <span className="cart-icon absolute -right-2 -top-2 bg-theme-red rounded-full text-xs text-white px-1.5 py-0.5">{cart?.reduce((num, product) => num + product.quantity!, 0)}</span>
        </div>
      </Link>
    </div>
  )
}
