import React, { Fragment } from 'react'
import Navigation from './Navigation'
import { Formik } from 'formik'
import Axios from 'axios'
import { navigate } from '@reach/router'
import { getUserId } from '../utils'

// import PropTypes from 'prop-types'

const ProductDetails = ({ productId, location }) => {
  console.log('location: ', location)
  const { name = '', picture = '', price = 0, description = '', user = {} } = location.state
  console.log('user._id: ', user._id)
  console.log('getUserId(): ', getUserId())
  const canEdit = user._id === getUserId()
  console.log('canEdit: ', canEdit)
  const deleteProduct = async (event) => {
    event.preventDefault()
    const { data, status } = await Axios.delete(`api/products/${productId}`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })

    navigate('/products')
  }
  return (
    <div>
      <h1 className='pt-3 pb-1'>Product: {name}</h1>
      <Navigation />
      <Formik
        initialValues={{ name, price, description }}
        validate={(values) => {
          const errors = {}
          // if (!values.email) {
          //   errors.email = 'Required'
          // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          //   errors.email = 'Invalid email address'
          // }
          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // data,
            const { data, status } = await Axios.put(`api/products/${productId}`, values, {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                authorization: localStorage.getItem('token'),
              },
            })
            if (status >= 400) {
              throw Error(`status '${status}': Error when creating product`)
            }
            console.log('data: ', data)
            console.log('status: ', status)
            // navigate('/products')
          } catch (err) {
            console.log('error: ', err)
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='productInputName'>Product Name</label>
              <input
                id='productInputName'
                className='form-control'
                type='text'
                name='name'
                placeholder='Name'
                readOnly={!canEdit}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
            </div>
            <div className='form-group'>
              <label htmlFor='productInputPrice'>Price</label>
              <input
                id='productInputPrice'
                className='form-control'
                type='number'
                name='price'
                placeholder='Price'
                readOnly={!canEdit}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
              {errors.price && touched.price && errors.price}
            </div>
            <div className='form-group'>
              <label htmlFor='productInputDescription'>Description</label>
              <textarea
                id='productInputDescription'
                className='form-control'
                type='text'
                name='description'
                placeholder='Description'
                readOnly={!canEdit}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              {errors.description && touched.description && errors.description}
            </div>
            {canEdit ? (
              <Fragment>
                <button type='submit' className='btn btn-success mr-2' disabled={isSubmitting}>
                  Save
                </button>
                <button className='btn btn-danger' onClick={deleteProduct}>
                  Delete
                </button>
              </Fragment>
            ) : null}
          </form>
        )}
      </Formik>
    </div>
  )
}

ProductDetails.propTypes = {}

export default ProductDetails
