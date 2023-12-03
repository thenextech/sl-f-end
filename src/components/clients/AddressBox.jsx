import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'

export default function AddressBox() {
  return (
    <div className="bg-gray-200 w-[170px] h-[40px] ml-4 sm:ml-8 sm:w-[240px] md:w-[350px] rounded-[50px]">
      <div className="flex items-center w-[90%] h-full mx-auto">
        <FaLocationDot className="sm:text-[20px]"/>
        <p className="text-[12px] sm:text-[15px] ml-1 md:ml-2">25 Rue de la paix, 59000</p> 
      </div>
    </div>
  )
}
