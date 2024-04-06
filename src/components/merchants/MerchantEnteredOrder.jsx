import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiPrinter } from "react-icons/fi";

export default function MerchantEnteredOrder( { orderId, clientName, orderContent, totalPrice } ) {


  return (
    <div className="h-[190px] rounded-[10px] shadow-my mt-4 sm:mt-6">
        <div className="w-[96%] md:w-[98%] mx-auto">
            <div className="flex items-center w-[200px] sm:w-[210px] justify-between pt-1">
                <p className="font-bold sm:text-[20px]">{orderId}</p>
            </div>
            <div className="h-[120px] flex items-center justify-between">
                <div>
                <p className="text-[12px] sm:text-[14px]"><span className="font-bold">Client :</span>  {clientName}</p>
                <p className="text-[12px] sm:text-[14px]"><span className="font-bold">Articles :</span> {orderContent}</p>
                <p className="text-[12px] sm:text-[14px]"><span className="font-bold">Prix total :</span> {totalPrice}</p>
                </div>
            </div>
            <div className="relative hover:cursor-pointer">
                <FiPrinter className="absolute right-[0px] text-[25px]"/>
            </div>
        </div>
        
    </div>
  )
}
