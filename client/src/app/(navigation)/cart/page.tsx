import React from 'react'
import withAuth from '@/auth/withAuth'
import CartModal from '@/screens/nav/cart'
const Cart: React.FC = () => {
  return (
    <div><CartModal/></div>
  )
}

export default withAuth(Cart)