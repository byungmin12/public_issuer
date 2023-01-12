import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Issuer from './Issuer'
import Login from './Login'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Issuer />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router