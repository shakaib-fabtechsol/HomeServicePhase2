import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import FilterNav from './FilterNav';
import MainNav from './MainNav';

const CustomerLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="mainpage">
            <MainNav toggleSidebar={toggleSidebar} />
            <FilterNav />
            <div className="main flex">
                <Sidebar isSidebarOpen={isSidebarOpen} />
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