import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'

// import ProductContext from '../context/products'
import axios from 'axios'
import ProductList from './ProductList'
import Navigation from './Navigation'

const Home = () => {
  const [products, setProducts] = useState([])
  // let products = []
  useEffect(() => {
    async function getProducts() {
      // TODO: control error when request
      const { data } = await axios.get('api/products')
      // return data.products
      setProducts(data.products)
    }
    getProducts()
  }, [])
  console.log('products: ', products)
  return (
    <div>
      <h1 className='pt-3 pb-1'>Home</h1>
      <Navigation />
      <ProductList products={products} />
    </div>
  )
}

Home.propTypes = {}

export default Home
