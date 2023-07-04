'use client'
import Image from "next/image"
import React from "react";
import { Product } from "./types"
import { useAppStore } from '../store/store'
import minus from '../public/minus.png';
import plus from '../public/plus.png';
import useStore from "../store/useStore";
export const CartItem = (props) => {
  const {productId} = props;
  const { updateQuantity, removeFromCart } = useAppStore();
  const cart = useStore(useAppStore, (state) => state.cart);
  
  const currentProduct = () => {
    return cart?.find(item => item.id === productId)!
  }
  const [product, setProduct] = React.useState<Product>();
  React.useEffect(() => {
    setProduct(currentProduct());
  }, [cart])
  const changeNum = (type) => {
    updateQuantity(productId, type);
    setProduct(currentProduct())
  }
  
	return (
		product ?
			<div className="w-full flex p-4">
				<Image src={product?.images[0]} width={70} height={70} alt={product?.title}/>
				<div className="flex flex-col  flex-auto items-baseline justify-between sm:flex-row font-bold mx-8 ">
          <h3 className="font-medium text-lg mb-1">{product?.title}</h3>
          <div className="flex">
            <div>S${product?.price}</div>
            <div className="text-center">
              <div className="flex items-center w-[160px] sm:w-[200px] md:w-[300px] justify-center">
                <Image src={minus} alt='' width={16} height={16} className="cursor-pointer" onClick={() => changeNum('decrease')}/>
                <span className="mx-3 font-normal">{product?.quantity}</span>
                <Image src={plus} alt='' width={16} height={16} className="cursor-pointer" onClick={() => changeNum('increase')}/>
              </div>
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
