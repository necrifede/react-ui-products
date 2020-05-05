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
        initialValues={{ email: '', password: '' }}
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
            const { data, status } = await Axios.post('http://localhost:3030/api/signin', values, {
              headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            })
            if (status >= 400) {
              throw Error(data)
            }
            // TODO: why bearer
            localStorage.setItem('token', `Bearer ${data.token}`)
            navigate('/')
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
              type='name'
              name='name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <input
              type='password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

CreateProduct.propTypes = {}

export default CreateProduct
