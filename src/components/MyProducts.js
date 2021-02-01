import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import ProductList from './ProductList'
import Axios from 'axios'
import { getUserId, isUserLogged } from '../utils'
import { navigate } from '@reach/router'
import Navigation from './Navigation'

const MyProducts = (props) => {
  const [products, setProducts] = useState([])
  if (!isUserLogged()) navigate('/login')
  // let products = []
  useEffect(() => {
    async function getMyProducts() {
      // TODO: control error when request
      const { data } = await Axios.get('api/products')
      setProducts(
        data.products.filter(({ user }) => {
          if (!user) {
            return false
          }
          return user._id === getUserId()
        })
      )
    }
    getMyProducts()
  }, [])
  console.log('products: ', products)
  return (
    <div>
      <h1 className='pt-3 pb-1'>My Products</h1>
      <Navigation />
      <ProductList products={products} />
    </div>
  )
}

MyProducts.propTypes = {}

export default MyProducts
