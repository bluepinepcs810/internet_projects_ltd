import { Avatar, Button, IconButton, Typography } from '@material-tailwind/react';
import React, { useCallback, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { XMarkIcon, Squares2X2Icon, UsersIcon } from "@heroicons/react/24/outline";

const SideNav = () => {
    const [openNav, setOpenNav] = useState(true);
    const location = useLocation();
    const checkActive = useCallback((prefix) => location.pathname.startsWith(prefix), [location.pathname]);

    return (
        <aside
            className={`bg-white shadow-lg fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0
                ${openNav ? "translate-x-0" : "-translate-x-80"}`
            }
        >
            <Link to="/teams" className='flex items-center gap-4 py-4 px-6'>
                <Avatar src='/img/logo.png' size="sm" />
                <Typography
                    variant="h6"
                    color="blue-gray"
                >
                    Football Club
                </Typography>
                <IconButton
                    variant="text"
                    color="white"
                    size="sm"
                    ripple={false}
                    className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                    onClick={() => setOpenNav((old => !old))}
                    >
                    <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
                </IconButton>
            </Link>
            <div className='m-4'>
                <ul className='mb-4 flex flex-col gap-1'>
                    <li className='mx-3.5 mt-4 mb-2'>
                        <NavLink to="/teams">
                            <Button
                                variant={checkActive('/teams') ? 'gradient' : 'text'}
                                color={checkActive('/teams') ? "blue" : "blue-gray"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                            >
                                <Squares2X2Icon className='w-5 h-5 text-inherit'/>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-black uppercase opacity-75"
                                >
                                    Teams
                                </Typography>
                            </Button>
                        </NavLink>
                        <NavLink to="/players">
                            <Button
                                variant={checkActive('/players') ? 'gradient' : 'text'}
                                color={checkActive('/players') ? "blue" : "blue-gray"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                            >
                                <UsersIcon className='w-5 h-5 text-inherit'/>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-black uppercase opacity-75"
                                >
                                    Players
                                </Typography>
                            </Button>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SideNav;
