import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/Product/components/ProductList'
// import Pagination from '../features/Pagination/Pagination'

export default function Home() {
  return (
    <div>
    <Navbar>
        <ProductList></ProductList>
    </Navbar>
    </div>
  )
}
