import React from 'react'
import Profile from '../features/User/Components/Profile'       
import Navbar from '../features/navbar/Navbar'
function ProfilePage() {
  return (
    <div>
      <Navbar>
        <Profile></Profile>
      </Navbar>
    </div>
  )
}

export default ProfilePage
