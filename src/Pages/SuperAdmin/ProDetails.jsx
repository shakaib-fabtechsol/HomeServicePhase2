import React from 'react'
import ProfileComponent from '../../Components/ProfileComponent'

export default function ProDetails() {
  return (
    <div>
      <ProfileComponent userRole="superadmin" serviceDetailTo="/superadmin/dealDetails"/>
    </div>
  )
}
