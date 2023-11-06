import React from 'react'
import {IoMdMenu} from 'react-icons/io'
import HomeLogo from './HomeLogo';

export default function Drawer({ handleDrawerClick }) {

    function handleClick() {
        handleDrawerClick();
    }
    return (
        <IoMdMenu className="text-[30px] sm:text-[38px] md:text-[50px] hover:cursor-pointer" onClick={handleClick}></IoMdMenu>
    )
}
