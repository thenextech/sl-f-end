import React from 'react'
import { BsTicketDetailed } from 'react-icons/bs'

export default function FidelityPointBox({ points }) {
  return (
    <div className="w-[100px] h-[40px] bg-black rounded-[50px] mr-1">
        <div className="h-full w-[70%] sm:w-[65%] flex items-center mx-auto justify-between">
            <BsTicketDetailed className="text-[#ffda05] text-[18px] sm:text-[21px]"/>
            <p className="text-white text-[12px] sm:text-[15px] font-bold">{points > 0 ? points : 0}</p>
        </div>
    </div>
  )
}
