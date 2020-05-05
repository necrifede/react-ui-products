import React, { useState } from 'react'
import logo from './logo.svg'
import { Router, Link } from '@reach/router'
import './App.css'
import axios from 'axios'
import { server } from './config'

import MyProducts from './components/MyProducts'
import Login from './components/Login'
import Home from './components/Home'
import CreateProduct from './components/CreateProduct'

// TODO: why import bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// import ProductContext from './context/products'
// const Home = () => <div>Home</div>
const NotFound = () => <h1>Page no found</h1>
axios.defaults.baseURL = server.host

function App() {
  return (
    <Router>
      <Home path='/' />
      <Login path='login' />
      <MyProducts path='products' />
      <CreateProduct path='create' />
      <NotFound default />
    </Router>
  )
}

export default App

// TODO: control browser when token is invalid
