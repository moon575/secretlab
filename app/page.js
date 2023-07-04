'use client'
import { useAppStore } from '../store/store'
import useStore from '../store/useStore';
import { ProductCard } from '../components/ProductCard'
import { Header } from '../components/Header';
import React from 'react'

export default function Home() {
  const { fetchProducts, fetchCategories, fetchProductsByCategory, products } = useAppStore();
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [ratingRange, setRatingRange] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState([]);
  const categories = useStore(useAppStore, (state) => state.categories);
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
  const changeCategory = (e) => {
    fetchProductsByCategory(e.target.value);
  }

  return (
    <div className='bg-[#f3f3f5] h-[100vh]'>
      <Header />
      <div className='flex flex-col w-full sm:flex-row sm:items-center sm:justify-between px-8 h-20 bg-white'>
        <select className='focus:outline-none' onChange={changeCategory}>
          <option>
            Category
          </option>
          {
            categories?.map(category => <option key={category}>
              {category}
            </option>)
          }
        </select>
        <select className='focus:outline-none' onChange={e => setRatingRange(e.target.value.split('-'))}>
          <option>
            Rating
          </option>
          {
            ratingRanges.map(rating => (<option key={rating[0]}>
              {`${rating[0]} - ${rating[1]}`}
            </option>))
          }
        </select>
        <select className='focus:outline-none' onChange={e => setPriceRange(e.target.value.split('-'))}>
          <option>
            Price
          </option>
          {
            priceRanges.map(price => (<option key={price[0]}>
              {`${price[0]} - ${price[1]}`}
            </option>))
          }
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-8">
        {filteredProducts.length ? filteredProducts.map(product => <ProductCard key={product.id} {...product} />) : 'No products under current filters!'}
      </div>
    </div>
  )
}
