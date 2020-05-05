import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Router, Link } from '@reach/router'

import { isUserLogged, logOut, getUser } from '../utils'

const Navigation = (props) => {
  const userLogged = isUserLogged()
  const { name } = userLogged ? getUser() : {}
  const linkProps = {
    getProps: ({ isCurrent }) => (isCurrent ? { className: 'nav-link active' } : {}),
  }
  return (
    <nav className='navbar navbar-light bg- bg-light'>
      <ul className='nav nav-tabs'>
        <li className='nav-item'>
          <Link className='nav-link' {...linkProps} to='/'>
            Home
          </Link>
        </li>
        {userLogged ? (
          <Fragment>
            <li className='nav-item'>
              <Link className='nav-link' {...linkProps} to='/products'>
                My Products
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' {...linkProps} to='/create'>
                Create
              </Link>
            </li>
          </Fragment>
        ) : null}
      </ul>
      <div className='nav'>
        {userLogged ? (
          <Fragment>
            <span className='navbar-text'>{name}</span>
            <Link className='nav-link' to='/' onClick={logOut}>
              Log Out
            </Link>
          </Fragment>
        ) : (
          <Link className='nav-link' to='/login'>
            Log In
          </Link>
        )}
      </div>
    </nav>
  )
}

Navigation.propTypes = {}

export default Navigation
