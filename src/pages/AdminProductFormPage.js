import React from 'react'
import AdminProductForm from '../features/admin/components/AdminProductForm'
import Navbar from '../features/navbar/Navbar'

export default function AdminProductFormPage() {
  return (
    <div>
        <Navbar>
      <AdminProductForm/>
        </Navbar>
    </div>
  )
}
