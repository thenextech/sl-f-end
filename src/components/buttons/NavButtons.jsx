import React from 'react'
import {BiSolidUser} from 'react-icons/bi'
import { Link } from "react-router-dom";

export default function NavButtons() {
  return (
    <div className='flex items-center md:h-[60px]'>
        <Link to="/m/login"><div className="hidden md:block md:mr-[23px] border-2 py-[7px] px-[15px] border-black rounded-[30px] hover:cursor-pointer">
            <p className="text-[1px] sm:text-[16px] md:text-[16px] text-center">Commerçants</p>
        </div></Link>
        <Link to="/login"><div className="w-[35px] sm:w-[42px] md:w-[45px] bg-[#D9D9D9] rounded-[30px] h-[35px] sm:h-[42px] md:h-[45px] mr-[12px] sm:mr-[18px] md:mr-[23px] flex items-center justify-center hover:cursor-pointer">
            <BiSolidUser className="text-[18px] sm:text-[23px] md:text-[26px]"></BiSolidUser>
        </div></Link>
        <button className="text-white bg-[#3C24D1] py-[7px] px-[15px] rounded-[30px] font-bold text-center text-[13px] sm:text-[16px] md:text-[18px]"><Link to="/register">Inscription</Link></button>
    </div>
  )
}
