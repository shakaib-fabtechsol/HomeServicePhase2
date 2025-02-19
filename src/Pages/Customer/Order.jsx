import React from 'react';
import { BsSliders } from 'react-icons/bs';
import { CiLocationOn, CiSearch } from 'react-icons/ci';
import { FiDownload } from 'react-icons/fi';
import { LuPhone } from 'react-icons/lu';
import { MdOutlineMailOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ServiceDet from '../../assets/img/service-det.png';

const orders = [
    {
        id: 1,
        serviceName: 'Service Name',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '$200',
        provider: 'Tatiana Dorwart',
        date: 'Dec 21, 2024 7:59 pm',
    },
    {
        id: 2,
        serviceName: 'Another Service',
        description: 'Praesent tincidunt consectetur justo, at fermentum metus.',
        price: '$150',
        provider: 'John Doe',
        date: 'Jan 10, 2025 3:45 pm',
    },
];

const Order = () => {
    return (
        <div>
            <div className='flex sm:flex-row flex-col sm:items-center justify-between gap-2'>
                <div className='flex items-center p-2 border rounded-lg w-full sm:max-w-[400px]'>
                    <label><CiSearch className='text-[#717680] text-xl' /></label>
                    <input type='search' placeholder='Search' className='w-full px-2' />
                </div>
                <div className='flex items-center justify-end gap-2'>
                    <button className='border bg-white px-4 py-3 rounded-lg flex text-sm items-center gap-2'><BsSliders />Filter</button>
                    <button className='border border-[#0F91D2] bg-white text-[#0F91D2] px-4 py-3 rounded-lg flex text-sm items-center gap-2'><FiDownload />Export</button>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full mt-4 shadow-lg'>
                    <thead>
                        <tr className='border rounded-t-xl'>
                            <th className='text-start p-3 font-normal'>Service</th>
                            <th className='text-start p-3 font-normal'>Service Provider</th>
                            <th className='text-start p-3 font-normal'>Contact Pro</th>
                            <th className='text-start p-3 font-normal'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id} className={index % 2 === 0 ? "bg-[#FAFAFA] border-b" : "bg-white border-b" }>
                                <td className='p-3'>
                                    <div className='flex gap-2'>
                                        <img src={ServiceDet} alt='' className='size-24 max-w-24 rounded-lg object-cover' />
                                        <div>
                                            <h6>{order.serviceName}</h6>
                                            <p className='text-xs text-[#535862]'>{order.description}</p>
                                            <div className='flex items-center gap-1 text-nowrap'>
                                                <p className='text-[10px] text-[#535862]'>Starting Price:</p>
                                                <p className='font-extrabold text-lg'>{order.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='p-3'>
                                    <div className='flex items-center gap-2'>
                                        <img src={ServiceDet} alt='' className='size-12 max-w-12 rounded-full object-cover' />
                                        <div>
                                            <h6>{order.provider}</h6>
                                            <div className='flex items-center gap-1'>
                                                <button className='bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm'><LuPhone /> Phone Call</button>
                                                <button className='bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm'><MdOutlineMailOutline /> Email</button>
                                                <button className='bg-white text-nowrap text-[10px] border flex gap-2 py-1 px-3 items-center rounded-md shadow-sm'><CiLocationOn /> Address</button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='p-3 text-nowrap'>{order.date}</td>
                                <td className='p-3'>
                                    <Link to='/customer/order-detail' className='bg-white text-base py-2 px-4 border text-nowrap rounded-lg inline-block'>View Details</Link>
                                    <div className='mt-3'>
                                        <Link to='#' className='bg-[#0F91D2] text-white text-base py-2 px-4 border text-nowrap rounded-lg block'>Mark as Complete</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;
