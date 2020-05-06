import React from 'react'
import PropTypes from 'prop-types'
import Navigation from './Navigation'
import { navigate } from '@reach/router'
import { Formik } from 'formik'
import Axios from 'axios'

/**
 * name
 * picture
 * price
 * description
 * owner
 * @param {*} props
 */
const CreateProduct = (props) => {
  return (
    <div>
      <h1>Create Product</h1>
      <Navigation />
      <Formik
        initialValues={{ name: '', price: 0, description: '' }}
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
            const { data, status } = await Axios.post('api/products', values, {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                authorization: localStorage.getItem('token'),
              },
            })
            if (status >= 400) {
              throw Error(data)
            }
            // TODO: why bearer
            // localStorage.setItem('token', `Bearer ${data.token}`)
            navigate('/products')
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
            <input
              type='text'
              name='name'
              placeholder='Name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <input
              type='number'
              name='price'
              placeholder='Price'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
            />
            {errors.price && touched.price && errors.price}
            <textarea
              type='text'
              name='description'
              placeholder='Description'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            {errors.description && touched.description && errors.description}
            <button type='submit' disabled={isSubmitting}>
              Create Product
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

CreateProduct.propTypes = {}

export default CreateProduct
