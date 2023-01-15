import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Issuer from './Issuer'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Issuer />,
  },
])

export default router