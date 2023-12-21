import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SignOutAsync, selectUser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

function Logout() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    useEffect(()=>{
        dispatch(SignOutAsync())
    },[dispatch])

  return (
    <div>{!user &&
      <Navigate to="/signup"></Navigate>}
    </div>
  )
}

export default Logout
