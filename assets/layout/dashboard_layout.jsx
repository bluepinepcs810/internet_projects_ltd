import React from 'react';
import { Outlet } from "react-router";
import SideNav from './widgets/sidenav';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <SideNav />
            <div className='p-4 xl:ml-80'>
                <div className='h-16 w-full'></div>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout;
