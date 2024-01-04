import React from 'react'
import AdminOrdersTable from '../features/admin/components/AdminOrdersTable'
import Navbar from "../features/navbar/Navbar"

export default function AdminOrdersTablePage() {
  return (
    <div>
        <Navbar>
      <AdminOrdersTable/>
        </Navbar>
    </div>
  )
}
