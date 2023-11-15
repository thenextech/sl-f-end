import React from 'react'
import { Link } from "react-router-dom";

export default function LogoutBtn() {
  return (
    <div className="flex flex-col items-center">
        <button className="text-white bg-[#3C24D1] py-[7px] px-[15px] rounded-[10px] font-semibold text-center text-[16px] sm:text-[16px] md:text-[18px] w-[100%] mt-5 hover:cursor-pointer"><Link to="#">Se déconnecter</Link></button>
    </div>
  )
}
