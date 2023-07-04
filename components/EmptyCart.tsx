'use client'
import Image from "next/image"
import React from "react";
import cartImg from "../public/cart.png";
export const EmptyCart = () => {
	return (
		<div>
			<div className="h-80 flex flex-col items-center justify-center">
				<Image src={cartImg} alt={''} width={80} />
				<span className="rounded-full py-0.5 px-3">{`You don't have any items in your cart yet.`}</span>
			</div>
		</div>
	)
}
