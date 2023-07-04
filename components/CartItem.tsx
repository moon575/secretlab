'use client'
import Image from "next/image"
import React from "react";
import { Product } from "./types"
import { useAppStore } from '../store/store'

import useStore from "../store/useStore";
import Link from "next/link";
import { Counter } from "./Counter";
export const CartItem = (props) => {
  const {productId} = props;
  const { removeFromCart, setCurrentProduct } = useAppStore();
  const cart = useStore(useAppStore, (state) => state.cart);
  
  const currentProduct = () => {
    return cart?.find(item => item.id === productId)!
  }
  const [product, setProduct] = React.useState<Product>();
  React.useEffect(() => {
    setProduct(currentProduct());
  }, [cart])

  
	return (
		product ?
			<div className="w-full flex p-4">
        <Link href={'/detail'} onClick={() => setCurrentProduct(product.id)}>
  				<Image src={product?.images[0]} width={70} height={70} alt={product?.title}/>
        </Link>
				<div className="flex flex-col  flex-auto items-baseline justify-between sm:flex-row font-bold mx-8 ">
          <Link href={'/detail'} onClick={() => setCurrentProduct(product.id)}>
            <h3 className="font-medium text-lg mb-1">{product?.title}</h3>
          </Link>
          <div className="flex">
            <div>S${product?.price}</div>
            <div className="text-center">
              <Counter product={product}/>
              <div className="underline cursor-pointer text-font-grey" onClick={() => removeFromCart(productId)}>
                REMOVE
              </div>
            </div>
            <div>S${product?.price * product.quantity!}</div>
          </div>
        </div>
        <div>

        </div>
			</div> : null
	)
}
