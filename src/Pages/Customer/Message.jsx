import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Chat from '../../Components/Chat'

const Message = () => {
    return (
        <div>
            <div className='flex items-center sm:gap-4 gap-2 sm:mt-4'>
                <div>
                    <Link to="#"><FaArrowLeft className='md:text-xl text-sm' /></Link>
                </div>
                <div>
                    <p className='font-semibold 2xl:text-3xl sm:text-xl text-lg'>Messages</p>
                    <p className='text-[#535862] md:text-base text-xs'>Manage and Respond to Messages Seamlessly</p>
                </div>
            </div>
            <div className='mt-2'>
                <Chat/>
            </div>
        </div>
    )
}

export default Message