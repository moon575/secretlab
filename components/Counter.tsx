import React from "react";
import Image from "next/image"
import minus from '../public/minus.png';
import plus from '../public/plus.png';
import { useAppStore } from "../store/store";
import useStore from "../store/useStore";

export const Counter = (props) => {
	const {product} = props;
  const { updateQuantity } = useAppStore();

	const changeNum = (type) => {
    updateQuantity(product.id, type);
  }
  return (<div className="flex items-center w-[160px] sm:w-[200px] md:w-[300px] justify-center">
	<Image src={minus} alt='' width={16} height={16} className="cursor-pointer" onClick={() => changeNum('decrease')}/>
	<span className="mx-3 font-normal">{product?.quantity}</span>
	<Image src={plus} alt='' width={16} height={16} className="cursor-pointer" onClick={() => changeNum('increase')}/>
</div>)
}