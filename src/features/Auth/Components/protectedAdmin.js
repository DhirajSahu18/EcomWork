import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

function ProtectedAdmin({children}) {
    const user = useSelector(selectUser)

    if(user){
    if(user.role === 'admin'){
        return children
    }
    else if(user.role === 'user'){
        return <Navigate to="/"></Navigate>
    }}
    else{
        return <Navigate to="/signup"></Navigate>
    }
  
}

export default ProtectedAdmin
