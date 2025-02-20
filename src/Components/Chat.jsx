import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaPaperclip } from 'react-icons/fa'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import ClientTwo from '../assets/img/client2.png'

const Chat = () => {
    return (
        <div className='flex'>
            <div className='w-full max-w-[250px] border h-[calc(100dvh-240px)]'>
                <div className='p-2'>
                    <div className='flex items-center p-2 border rounded-lg w-full'>
                        <label><CiSearch className='text-[#717680] text-xl' /></label>
                        <input type='search' placeholder='Search' className='w-full px-2' />
                    </div>
                </div>
                <div>
                    <div className='p-2 border-b'>
                        <div>
                            <img src={ClientTwo} alt="" className='size-8 rounded-full object-cover max-w-8'/>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[calc(100%-250px)] border h-[calc(100dvh-240px)] flex flex-col justify-between'>
                <div>

                </div>
                <div className='flex items-center gap-2 p-2 border-t'>
                    <div className='border rounded-xl flex justify-between gap-2 px-3 items-center w-full'>
                        <input type="text" className='w-full rounded-xl bg-transparent p-2' placeholder='Message' />
                        <label htmlFor="fil"><FaPaperclip className='cursor-pointer' /></label>
                        <input type="file" name="" id="fil" className='hidden' />
                    </div>
                    <div>
                        <button className='bg-[#0F91D2] text-white text-xl py-3 2xl:px-6 px-3 shadow-lg rounded-md'><IoPaperPlaneOutline /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat