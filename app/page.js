'use client'
import Image from 'next/image'
import logo from "../public/logo.png";
import { useAppStore } from '../store/store'
import useStore from '../store/useStore';
import { ProductCard } from '../components/ProductCard'
import React from 'react'

export default function Home() {
  const { fetchProducts, fetchCategories, fetchProductsByCategory, products } = useAppStore();
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [ratingRange, setRatingRange] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState([]);
  const categories = useStore(useAppStore, (state) => state.categories);
  const cart = useStore(useAppStore, (state) => state.cart);
  React.useEffect(() => {
    let newProducts = products;
    if (ratingRange.length === 2) {
      newProducts = newProducts.filter(item => item.rating >= ratingRange[0] && item.rating <= ratingRange[1]);
    }
    if (priceRange.length === 2) {
      newProducts = newProducts.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);
    }
    setFilteredProducts(newProducts);
  }, [products, ratingRange, priceRange])
  const priceRanges = [[0, 500], [500, 1000], [1000, 1500], [1500, 2000]];
  const ratingRanges = [[3, 3.5], [3.5, 4], [4, 4.5], [4.5, 5]]
  React.useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [])
  const toCartPage = () => {
    console.log('toggle cart');
  }
  const changeCategory = (e) => {
    fetchProductsByCategory(e.target.value);
  }

  return (
    <div className='bg-[#f3f3f5] h-[100vh]'>
      <div className="flex items-center justify-between font-semibold px-4 bg-white">
        <Image src={logo} alt=''/>
        <div className="relative">
          <button type='button' className='py-1.5 px-3 space-x-1 rounded-md text-sm bg-black text-white hover:ring-1 hover:ring-black' onClick={toCartPage}>
            My Cart
          </button>
          <span className="absolute -right-2 -top-2 bg-theme-red rounded-full text-xs text-white px-1.5 py-0.5">{cart?.reduce((total, product) => total + product.quantity, 0)}</span>
        </div>
      </div>
      <div className='flex flex-col w-[256px] sm:w-full sm:flex-row sm:items-center sm:justify-between px-8 h-20 bg-white'>
        <select className='focus:outline-none' onChange={changeCategory}>
          <option>
            Category
          </option>
          {
            categories?.map(category => <option>
              {category}
            </option>)
          }
        </select>
        <select className='focus:outline-none' onChange={e => setRatingRange(e.target.value.split('-'))}>
          <option>
            Rating
          </option>
          {
            ratingRanges.map(rating => (<option>
              {`${rating[0]} - ${rating[1]}`}
            </option>))
          }
        </select>
        <select className='focus:outline-none' onChange={e => setPriceRange(e.target.value.split('-'))}>
          <option>
            Price
          </option>
          {
            priceRanges.map(price => (<option>
              {`${price[0]} - ${price[1]}`}
            </option>))
          }
        </select>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-8">
        {filteredProducts.length ? filteredProducts.map(product => <ProductCard key={product.id} {...product} />) : 'No products under current filters!'}
      </div>
    </div>
  )
}
