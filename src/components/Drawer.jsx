import React from 'react'
import {IoMdMenu} from 'react-icons/io'
import HomeLogo from './HomeLogo';

export default function Drawer({ handleDrawerClick, numOrders }) {

    function handleClick() {
        handleDrawerClick();
    }
    return (
        <>  
            <div className="relative">
                <IoMdMenu className="text-[30px] sm:text-[38px] md:text-[50px] hover:cursor-pointer" onClick={handleClick}></IoMdMenu>
                {!numOrders || numOrders == 0 ? null : <div className="absolute top-[-10px] md:top-[-6px] right-[-10px] md:right-[-15px] bg-red-500 md:w-[25px] md:h-[25px] w-[20px] h-[20px] rounded-[100%] flex items-center justify-center">
                        <p className="md:text-[15px] text-[12px]  font-semibold">{numOrders}</p>
                </div>}
            </div>
        </>
    )
}
