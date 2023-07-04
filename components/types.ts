export interface Product {
	description: string;
	id: number;
	images: string[];
	price: number;
	title: string;
	discountPercentage: number;
	rating: number;
	stock: number;
	category: string;
	thumbnail: string;
	brand: string;
	// Indicates the quantity of items added to the cart
	quantity?: number;
}