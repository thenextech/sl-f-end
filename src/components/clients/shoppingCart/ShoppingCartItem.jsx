import React from 'react'
import cocaImg from '../../../assets/images/products/coca.png';
import { IoMdClose } from "react-icons/io";

export default function ShoppingCartItem() {
  return (
    <div className="flex w-[95%] mx-auto h-[100px] items-center border-b-2 border-gray-100 mb-2">
      <div className="w-[25px] h-[20px] bg-gray-200 rounded-[100%] text-center font-bold text-[12px]">1</div>
      <div className="relative flex w-full ml-1">
        <div className="w-[90px] h-[90px] ">
          <img src={cocaImg} alt="logo coca"/>
        </div>
        <div className="ml-1">
          <p className="text-[13px]">Coca Cola 1L</p>
          <p className="text-[10px] opacity-[0.5]">REF-76H34G</p>
          <p className="text-[10px] opacity-[0.5]">Epicierie du coin, Lille</p>
        </div>
        <p className="absolute bottom-0 right-0 font-bold">3€50</p>
        <IoMdClose className="absolute top-0 right-0 text-[20px] hover:cursor-pointer"/>
      </div>      
    </div>
  )
}
