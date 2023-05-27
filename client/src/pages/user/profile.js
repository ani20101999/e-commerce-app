import React from 'react'
import UserMenu from './UserMenu'
const Profile = () => {
  return (
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
     <div className='col-md-3'>
       <UserMenu/>
     </div>
     <div className='col-md-9'>
      <div className='card w-75 p-3'>
       Profile
      </div>
     </div>
    </div>
   </div>
  )
}

export default Profile