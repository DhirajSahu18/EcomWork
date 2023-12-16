import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

function Protected({children}) {
    const user = useSelector(selectUser)


    if(user){
        return children
    }
    else{
        return <Navigate to="/signup"></Navigate>
    }
  
}

export default Protected
