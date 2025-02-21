import React, {useEffect, useState} from 'react';
import { FaArrowLeft, FaPaperclip } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ServiceDet from '../../assets/img/service-det.png'
import ClientTwo from '../../assets/img/client2.png'
import DeliveryOne from '../../assets/img/delivery1.png'
import DeliveryFour from '../../assets/img/delivery4.png'
import DeliveryThree from '../../assets/img/delivery3.png'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdUpload } from 'react-icons/md'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    maxWidth: "600px",
};

const OrderDetail = () => {
    useEffect(() => {
        document.title = "OederDetails";
      }, []);

    const deliveryImages = [DeliveryOne, DeliveryOne, DeliveryThree, DeliveryFour];
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [images, setImages] = useState([]);

    // Handle image upload and convert file objects to URLs
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    // Remove an image from the preview list
    const handleRemoveImage = (imageUrl) => {
        setImages(images.filter((img) => img !== imageUrl));
    };
    return (
        <div>
            <div className='flex items-center sm:gap-4 gap-2 sm:mt-4'>
                <div>
                    <Link to="/customer/order"><FaArrowLeft className='md:text-xl text-sm' /></Link>
                </div>
                <div>
                    <p className='font-semibold 2xl:text-3xl sm:text-xl text-lg'>Order Details</p>
                    <p className='text-[#535862] md:text-base text-xs'>Track Your Orders, Every Step of the Way</p>
                </div>
            </div>
            <div className='bg-[#F4F4F4] rounded-2xl p-4 mt-4'>
                <div className="flex lg:flex-row flex-col gap-3">
                    <div>
                        <img src={ServiceDet} alt="" className='lg:size-52 w-full h-full object-cover rounded-2xl' />
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h4 className='text-[#181D27] sm:text-xl text-sm font-normal'>Service Name</h4>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='text-xs font-medium text-[#494A4B]'>Basic plan:</p>
                                <h3 className='text-2xl font-extrabold'>$200</h3>
                            </div>
                        </div>
                        <p className='text-[#535862] mt-4 lg:text-base text-xs'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tellus diam, dignissim tincidunt quam vel, rutrum egestas lacus. Phasellus accumsan fermentum dolor eu gravida. Vivamus dignissim augue sed orci interdum vehicula.</p>
                        <div className='flex sm:flex-row flex-col sm:items-center gap-3 sm:justify-between mt-4'>
                            <div className='flex items-center gap-3'>
                                <div>
                                    <img src={ClientTwo} alt="" className='sm:size-16 size-12 sm:max-w-16 max-w-12[] rounded-full' />
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-[#494A4B]'>Frances Swann</p>
                                    <h3 className='text-xs text-[#535862]'>1851 Lynch Street, New Berlin, WI 53151</h3>
                                </div>
                            </div>
                            <div className='text-end sm:text-start'>
                                <p className='text-sm font-medium text-[#494A4B]'>Scheduled</p>
                                <h3 className='text-xs text-[#535862]'>Dec 21, 2024 7:59 pm</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#F4F4F4] rounded-2xl p-4 mt-4'>
                <div className='w-full'>
                    <div>
                        <h4 className='text-[#181D27] sm:text-xl text-sm font-normal'>Service Name</h4>
                        <h4 className='mt-4 text-[#181D27] font-medium sm:text-xl'>Description and Deliverables </h4>
                        <p className='text-[#535862] mt-2 lg:text-sm text-xs'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tellus diam, dignissim tincidunt quam vel, rutrum egestas lacus. Phasellus accumsan fermentum dolor eu gravida. Vivamus dignissim augue sed orci interdum vehicula.</p>
                    </div>
                    <div className='flex items-center gap-3 mt-6'>
                        <div>
                            <img src={ClientTwo} alt="" className='sm:size-16 size-12 sm:max-w-16 max-w-12[] rounded-full' />
                        </div>
                        <div>
                            <p className='text-sm font-medium text-[#494A4B]'>Frances Swann</p>
                            <h3 className='text-xs text-[#535862]'>1851 Lynch Street, New Berlin, WI 53151</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 mt-4">
                <div className='bg-[#F4F4F4] p-4 rounded-2xl'>
                    <div className='flex lg:flex-row flex-col lg:items-center lg:justify-between gap-1'>
                        <div>
                            <h4 className='text-[#181D27] text-xl '>Before Delivery Photos:</h4>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='text-[#181D27] text-sm'>2/17/2025</p>
                            <p className='text-[#181D27] text-sm'>3:29 PM</p>
                        </div>
                    </div>
                    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 gap-4 mt-4">
                        {deliveryImages.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt="" className="w-full h-full object-cover rounded-2xl" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-[#F4F4F4] p-4 rounded-2xl'>
                    <div className='flex lg:flex-row flex-col lg:items-center lg:justify-between gap-1'>
                        <div>
                            <h4 className='text-[#181D27] text-xl '>After Delivery Photos:</h4>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='text-[#181D27] text-sm'>2/17/2025</p>
                            <p className='text-[#181D27] text-sm'>3:29 PM</p>
                        </div>
                    </div>
                    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 gap-4 mt-4">
                        {deliveryImages.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt="" className="w-full h-full object-cover rounded-2xl" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-[#F4F4F4] p-4 rounded-2xl sm:col-start-1 sm:col-end-3'>
                    <div className='flex lg:flex-row flex-col lg:items-center lg:justify-between gap-1'>
                        <div>
                            <h4 className='text-[#181D27] text-xl '>Before Photos:</h4>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p className='text-[#181D27] text-sm'>2/17/2025</p>
                            <p className='text-[#181D27] text-sm'>3:29 PM</p>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <p className='text-[#535862] text-xs'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tellus diam, dignissim tincidunt quam vel, rutrum egestas lacus. Phasellus accumsan fermentum dolor eu gravida. Vivamus dignissim augue sed orci interdum vehicula.</p>
                    </div>
                    <div className="grid 2xl:grid-cols-8 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 mt-4">
                        {deliveryImages.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt="" className="w-full h-full object-cover rounded-2xl" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex xl:flex-row flex-col justify-between gap-3 xl:items-center border rounded-xl p-4 mt-5'>
                <div>
                    <p className='text-sm'>If you are satisfied, Mark it as complete and leave your review</p>
                </div>
                <div className='flex flex-wrap items-center justify-end gap-2'>
                    <div>
                        <button className='bg-[#0F91D2] text-white sm:text-sm text-xs py-3 2xl:px-6 px-3 shadow-lg rounded-md'>Mark as complete</button>
                    </div>
                    <div>
                        <button onClick={handleOpen} className='bg-[#535862] text-white sm:text-sm text-xs py-3 2xl:px-6 px-3 shadow-lg rounded-md'>Ask Revision</button>
                    </div>
                    <div>
                        <button className='bg-[#A70000] text-white sm:text-sm text-xs py-3 2xl:px-6 px-3 shadow-lg rounded-md'>Request RefundCancel Project</button>
                    </div>
                </div>
            </div>
            <div className='border rounded-xl p-4 mt-5'>
                <div className='h-[400px] overflow-y-auto px-3'>
                    <div className='flex gap-3 mb-3'>
                        <div>
                            <img src={ClientTwo} alt="" className='rounded-full sm:size-9 sm:max-w-9 size-6 max-w-[6] object-cover' />
                        </div>
                        <div className='max-w-[600px] w-full'>
                            <div className='flex justify-between'>
                                <h6 className='font-medium text-[#414651] sm:text-sm text-xs'>Phoenix Baker</h6>
                                <p className='text-[#535862] text-xs'>Friday 2:20pm</p>
                            </div>
                            <div className='bg-[#F5F5F5] p-4 rounded-xl mt-2'>
                                <p className='text-[#181D27] sm:text-base text-xs'>Mauris vel metus ac.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 justify-end mb-3'>
                        <div className='max-w-[600px] w-full'>
                            <div className='flex justify-between'>
                                <h6 className='font-medium text-[#414651] text-sm'>You</h6>
                                <p className='text-[#535862] text-xs'>Friday 2:20pm</p>
                            </div>
                            <div className='bg-[#0F91D2] p-4 rounded-xl mt-2'>
                                <p className='text-[#fff] sm:text-base text-xs'>Mauris vel metus ac.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 mb-3'>
                        <div>
                            <img src={ClientTwo} alt="" className='rounded-full sm:size-9 sm:max-w-9 size-6 max-w-[6] object-cover' />
                        </div>
                        <div className='max-w-[600px] w-full'>
                            <div className='flex justify-between'>
                                <h6 className='font-medium text-[#414651] sm:text-sm text-xs'>Phoenix Baker</h6>
                                <p className='text-[#535862] text-xs'>Friday 2:20pm</p>
                            </div>
                            <div className='bg-[#F5F5F5] p-4 rounded-xl mt-2'>
                                <p className='text-[#181D27] sm:text-base text-xs'>Mauris vel metus ac.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 justify-end mb-3'>
                        <div className='max-w-[600px] w-full'>
                            <div className='flex justify-between'>
                                <h6 className='font-medium text-[#414651] text-sm'>You</h6>
                                <p className='text-[#535862] text-xs'>Friday 2:20pm</p>
                            </div>
                            <div className='bg-[#0F91D2] p-4 rounded-xl mt-2'>
                                <p className='text-[#fff] sm:text-base text-xs'>Mauris vel metus ac.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 mb-3'>
                        <div>
                            <img src={ClientTwo} alt="" className='rounded-full sm:size-9 sm:max-w-9 size-6 max-w-[6] object-cover' />
                        </div>
                        <div className='max-w-[600px] w-full'>
                            <div className='flex justify-between'>
                                <h6 className='font-medium text-[#414651] sm:text-sm text-xs'>Phoenix Baker</h6>
                                <p className='text-[#535862] text-xs'>Friday 2:20pm</p>
                            </div>
                            <div className='bg-[#F5F5F5] p-4 rounded-xl mt-2'>
                                <p className='text-[#181D27] sm:text-base text-xs'>Mauris vel metus ac.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 justify-end mb-3'>
                        <div className='max-w-[600px] w-full'>
                            <div className='flex justify-between'>
                                <h6 className='font-medium text-[#414651] text-sm'>You</h6>
                                <p className='text-[#535862] text-xs'>Friday 2:20pm</p>
                            </div>
                            <div className='bg-[#0F91D2] p-4 rounded-xl mt-2'>
                                <p className='text-[#fff] sm:text-base text-xs'>Mauris vel metus ac.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2 py-2'>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{m:2, zIndex: "9999"}}
            >
                <Box sx={style}>
                    <Typography sx={{ fontFamily: "inter", p: 2 }} id="modal-modal-title" variant="h6" component="h2">
                        Ask for Revision
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ p: 2, fontFamily: "inter" }}>
                        <form action="">
                            <div>
                                <label htmlFor="" className='text-[#343434] font-medium text-sm'>Revision Request</label>
                                <textarea name="" id="" rows={4} placeholder='Write here...' className='w-full border rounded-2xl p-2 mt-3'></textarea>
                            </div>
                            <div className="mt-3">
                                <label className="text-[#343434] font-medium text-sm">Upload</label>
                                <div className="mt-2">
                                    <label
                                        htmlFor="imageUp"
                                        className="text-[#343434] text-xs bg-[#6E6E6E1F] flex p-3 w-full border rounded-xl justify-center gap-2 cursor-pointer"
                                    >
                                        <MdUpload className="text-xl text-black" />
                                        Upload Images
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUp"
                                        className="hidden"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                    />
                                </div>

                                {images.length > 0 && (
                                    <div className="mt-3 grid sm:grid-cols-3 grid-cols-2 gap-4">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={image}
                                                    alt={`Upload Preview ${index}`}
                                                    className="w-full h-40 object-cover rounded-lg border"
                                                />
                                                <button type='button'
                                                    onClick={() => handleRemoveImage(image)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs w-[25px] h-[25px] shadow-lg max-w-[25px] rounded-full p-1"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className='flex gap-2 mt-4'>
                                <div className='w-full'>
                                    <button className='bg-white border shadow-lg p-2 w-full rounded-lg'>Cancel</button>
                                </div>
                                <div className='w-full'>
                                    <button className='bg-[#0F91D2] border shadow-lg text-white p-2 w-full rounded-lg'>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default OrderDetail