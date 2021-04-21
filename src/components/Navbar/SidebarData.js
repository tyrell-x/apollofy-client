import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'navText'
    },
    {
        title: 'Search',
        path: '/search',
        icon: <FaIcons.FaSearch />,
        cName: 'navText'
    },
    {
        title: 'Library',
        path: '/library',
        icon: <FaIcons.FaMusic/>,
        cName: 'navText'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <FaIcons.FaUserAlt />,
        cName: 'navText'
    }
]