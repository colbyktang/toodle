import React from 'react'
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as FiIcons from 'react-icons/fi';
export const SideBarData = [
    {
        title: 'Home',
        path: '/studentLandingPage',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Account',
        path: '/studentAccountPage',
        icon: <AiIcons.AiOutlineUser />,
        cName: 'nav-text'
    },
    {
        title: 'Reports',
        path: '/StudentReports',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    // {
    //     title: 'Products',
    //     path: '/products',
    //     icon: <FaIcons.FaCartPlus />,
    //     cName: 'nav-text'
    // },
    {
        title: 'Tutors',
        path: '/team',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },

    {
        title: 'Log out',
        path: '/logout',
        icon: <FiIcons.FiLogOut />,
        cName: 'nav-text'
    }

]

