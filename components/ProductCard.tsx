'use client'
import Image from "next/image"
import React from "react";
import { Product } from "./types"
import { useAppStore } from '../store/store'
import productImg from "../public/product.png";
export const ProductCard = (product: Product) => {
	const { addToCart } = useAppStore()
	return (
		<div>
			<div className="w-full h-80 relative ">
				<Image src={productImg} alt={product?.title} fill className='rounded-md shadow-lg' />
				<span className="rounded-full py-0.5 px-3 text-white text-xs absolute top-1 left-1 font-light">{product?.category}</span>
			</div>
			<div className="px-2 py-3 text-sm text-black-300">
				<h3 className="font-medium text-lg mb-1">{product?.title}</h3>
				<div className="text-font-grey truncate mb-3">{product?.description}</div>
				<div className="flex items-center justify-between">
					<div className="text-theme-red font-semibold">
						From S${product?.price} 
						<span className="text-font-grey line-through ml-4">
							S${product?.discountPercentage ? (product?.price / (1 - product?.discountPercentage / 100)).toFixed() : product?.price}
						</span>
					</div>
					<button 
						type="button" 
						className={`text-white font-[500] py-1.5 px-3 rounded-md ${product?.stock === 0 ? "bg-deep-grey cursor-not-allowed" : "bg-theme-red hover:ring-1 hover:ring-theme-red"}`}
						onClick={product?.stock === 0 ? undefined : () => addToCart(product)}
					>
						{product?.stock === 0 ? 'Sold Out' : 'Add To Cart'}
					</button>
				</div>
			</div>
		</div>
	)
}