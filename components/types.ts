export interface Product {
	description: string;
	id: number;
	images: string[];
	price: number;
	title: string;
	discountPercentage: number;
	rating: number;
	stock: number;
	category: number;
	thumbnail: string;
	brand: string;
	// Indicates the quantity of items added to the cart
	quantity?: number;
}