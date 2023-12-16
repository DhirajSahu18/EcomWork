import React from 'react'
import Orders from '../features/Orders/Orders'
import Navbar from '../features/navbar/Navbar'
function OrderPage() {
  return (
    <div>
        <Navbar>
            <Orders></Orders>
        </Navbar>
    </div>
  )
}

export default OrderPage
