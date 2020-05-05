import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const ProductList = ({ products }) => {
  console.log('products: ', products)
  return (
    <div className='card-columns'>
      {products.map((product) => (
        <Product key={product._id} {...product} />
      ))}
    </div>
  )
}

ProductList.propTypes = {}

export default ProductList
