import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AccordionComponent from '../../Components/AccordionComponent'
import ServiceBox from '../../Components/ServiceBox'
import { CiSearch } from 'react-icons/ci'
import Review from '../../Components/SuperAdmin/Review'

const Profile = () => {
  const services = [
    {
      id: 1,
      title: "Plumbing Service",
      price: 50,
      description: "Fix your leaking pipes and taps.",
      tags: ["Plumbing", "Repair"],
      image: "",
      publish: 2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
    },
    {
      id: 2,
      title: "House Cleaning",
      price: 30,
      description: "Professional house cleaning services.",
      tags: ["Cleaning", "Home"],
      image: "",
      publish: 2,
    },
  ];
  const accordionData = [
    { title: 'Technician Photos', content: 'Content for Item #1 goes here.' },
    { title: 'Vehicle Photos', content: 'Content for Item #2 goes here.' },
    { title: 'Facility Photos', content: 'Content for Item #3 goes here.' },
    { title: 'Project Photos', content: 'Content for Item #3 goes here.' },
    { title: 'Licences', content: 'Content for Item #3 goes here.' },
    { title: 'Awards', content: 'Content for Item #3 goes here.' },
    { title: 'Insurance', content: 'Content for Item #3 goes here.' },
    { title: 'Special Hours of Operation', content: 'Content for Item #3 goes here.' },
  ];
  return (
    <div>
      <div className="flex items-center">
        <Link to="#"><FaArrowLeft className="me-4 text-base" /></Link>
        <h2 className="text-2xl font-semibold">Profile Details</h2>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-medium myhead">About Me</h2>
        <p className="text-[#535862] mt-3">
          Donec pulvinar consequat metus eget cursus. Donec nec quam eu arcu
          elementum tempor eu pharetra mauris. Morbi et gravida purus, nec
          sagittis risus. Nulla placerat justo ut dui aliquam efficitur. Mauris
          aliquet mattis odio nec malesuada. Morbi at dui tristique, dignissim
          enim ac, varius nulla. Donec venenatis libero nec ligula laoreet
          laoreet. Sed quis lorem in mi suscipit dictum id nec diam. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam at vehicula neque. Proin molestie venenatis sem, ut imperdiet
          leo efficitur vel. Vestibulum nec elementum lacus.
        </p>
      </div>
      <div className="mt-5">
          <h4 className='font-medium text-[#181D27] text-lg'>Secondary Business Categories</h4>
          <div className='flex flex-wrap gap-2 items-center mt-3'>
            <p className='text-sm font-medium bg-[#3434341A] px-3 py-1 text-center w-[max-content] rounded-full'>Category 01</p>
            <p className='text-sm font-medium bg-[#3434341A] px-3 py-1 text-center w-[max-content] rounded-full'>Category 02</p>
            <p className='text-sm font-medium bg-[#3434341A] px-3 py-1 text-center w-[max-content] rounded-full'>Category 03</p>
          </div>
      </div>
      <div className='mt-5'>
        <div className='flex sm:flex-row flex-col sm:items-center justify-between gap-2'>
          <div>
            <h2 className="text-xl font-semibold">My Deals</h2>
          </div>
          <div>
            <div className='flex items-center p-2 border rounded-lg w-full sm:max-w-[400px]'>
              <label><CiSearch className='text-[#717680] text-xl' /></label>
              <input type='search' placeholder='Search' className='w-full px-2' />
            </div>
          </div>
        </div>
        <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {services.map((service) => (
            <ServiceBox
              key={service.id}
              title={service.title}
              price={service.price}
              description={service.description}
              tags={service.tags}
              image={service.image}
              publish={service.publish}
            />
          ))}
        </div>
      </div>
      <div className='mt-5'>
        <h3 className='font-medium text-2xl'>Additional Photos</h3>
        <div className='mt-3'>
          <AccordionComponent items={accordionData} />
        </div>
      </div>
      <div className='mt-5'>
        <Review/>
      </div>
    </div>
  )
}

export default Profile