import React, {useEffect, useState} from 'react';
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ProfileComponent from '../../Components/ProfileComponent'

const Profile = () => {
  return (
    <div>
      <div className="flex items-center">
        <Link to="#"><FaArrowLeft className="me-4 text-base" /></Link>
        <h2 className="text-2xl font-semibold">Profile Details</h2>
      </div>
      <div>
        <ProfileComponent/>
      </div>
    </div>
  )
}

export default Profile