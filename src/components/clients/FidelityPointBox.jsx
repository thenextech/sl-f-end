import React from 'react'
import { BsTicketDetailed } from 'react-icons/bs'

export default function FidelityPointBox() {
  return (
    <div className="w-[60px] h-[40px] sm:w-[100px] bg-black rounded-[50px]">
        <div className="h-full w-[70%] sm:w-[65%] md:w-[55%] flex items-center mx-auto justify-between">
            <BsTicketDetailed className="text-[#ffda05] text-[15px] sm:text-[21px]"/>
            <p className="text-white text-[12px] sm:text-[15px] font-bold">129</p>
        </div>
    </div>
  )
}
