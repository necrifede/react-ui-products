import React from 'react'
// import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { server } from '../config'

const Products = ({
  _id,
  name,
  picture,
  price,
  description,
  user = { displayName: 'Unknown' },
}) => {
  const state = { name, picture, price, description, user }
  console.log('state; ', state)
  return (
    <div className='card bg-light mb-3'>
      <h4 className='card-header'>{name}</h4>
      <img className='card-img' src={server.host + picture} alt='' />
      <p className='card-text'>
        <strong>Price: </strong>
        {price}
      </p>
      <p className='card-text'>{description}</p>
      <small className='text-muted'>Owner: {user ? user.displayName : 'Unknown'}</small>
      <div className='card-footer'>
        <div className='text-center pb-1'>
          <button
            className='btn btn-info btn-sm'
            onClick={() => navigate(`/products/${_id}`, { state })}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  )
}

Products.propTypes = {}

export default Products
