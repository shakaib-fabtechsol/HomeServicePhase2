import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AccordionComponent from '../../Components/AccordionComponent'

const Profile = () => {
  const accordionData = [
    { title: 'Item #1', content: 'Content for Item #1 goes here.' },
    { title: 'Item #2', content: 'Content for Item #2 goes here.' },
    { title: 'Item #3', content: 'Content for Item #3 goes here.' },
  ];
  return (
    <div>
        <div className="flex items-center">
          <Link to="#"><FaArrowLeft className="me-4 text-base" /></Link>
          <h2 className="text-2xl font-semibold">Profile Details</h2>
        </div>
        <AccordionComponent items={accordionData} />
    </div>
  )
}

export default Profile