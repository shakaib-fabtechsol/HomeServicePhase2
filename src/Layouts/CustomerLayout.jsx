import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import FilterNav from './FilterNav';
import MainNav from './MainNav';
import { IoChatboxEllipsesOutline, IoHomeOutline } from 'react-icons/io5';
import { AiOutlineDollar, AiOutlineSetting } from 'react-icons/ai';
import { RiBarChartHorizontalLine } from 'react-icons/ri';
import { CiCreditCard1 } from 'react-icons/ci';
import { FaRegHeart } from 'react-icons/fa';
import { PiFiles } from 'react-icons/pi';
import { GrNotification } from 'react-icons/gr';
import { CgSupport } from 'react-icons/cg';

const CustomerLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const sidebarData = [
        {
            items: [
                { to: "/customer/dashboard", icon: IoHomeOutline, label: "Home" },
                { to: "/customer/bucks", icon: AiOutlineDollar, label: "Pro Bucks" },
                { to: "/customer/order", icon: RiBarChartHorizontalLine, label: "Orders",},
                { to: "/provider/payments", icon: CiCreditCard1, label: "Payments/Payout",},
                { to: "/provider/favourites", icon: FaRegHeart, label: "Favorites" },
                { to: "/provider/reports", icon: PiFiles, label: "Reports" },
            ],
        },
        {
            items: [
                { to: "/provider/conversations",  icon: IoChatboxEllipsesOutline, label: "Conversations",},
                { to: "/provider/notification", icon: GrNotification, label: "Notifications",},
                { to: "/customer/setting", icon: AiOutlineSetting, label: "Settings" },
                { to: "/provider/support", icon: CgSupport, label: "Support" },
            ],
        },
    ];

    const userInfo = {
        name: "Mike Bird",
        email: "mikebird@untitledui.com",
    };
    return (
        <div className="mainpage">
            <MainNav toggleSidebar={toggleSidebar} />
            <FilterNav />
            <div className="main flex">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    sidebarData={sidebarData}
                    userInfo={userInfo} />
                <div className="right">
                    <div className="right-bottom px-2">
                        <div className="container-fluid">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerLayout