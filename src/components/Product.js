import React from 'react'
import PropTypes from 'prop-types'
import { server } from '../config'

const Products = ({ name, picture, price, description, user = 'Unknown' }) => {
  return (
    <div className='card bg-light mb-3'>
      <h4 className='card-header'>{name}</h4>
      <img className='card-img' src={server.host + picture} alt='' />
      <p className='card-text'>
        <strong>Price: </strong>
        {price}
      </p>
      <p className='card-text'>{description}</p>
      <div className='card-footer'>
        <small className='text-muted'>Owner: {user}</small>
      </div>
    </div>
  )
}

Products.propTypes = {}

export default Products
