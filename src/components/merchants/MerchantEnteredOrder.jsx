import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiPrinter } from "react-icons/fi";

export default function MerchantEnteredOrder() {
  return (
    <div className="h-[190px] rounded-[10px] shadow-my mt-6">
        <div className="w-[96%] md:w-[98%] mx-auto">
            <div className="flex items-center w-[200px] sm:w-[210px] justify-between pt-1">
                <p className="font-bold sm:text-[20px]">#1734</p>
                <p className="text-[11px]">Programmé pour : Auj. 12:15</p>
            </div>
            <div className="h-[120px] flex items-center justify-between">
                <div>
                <p className="text-[12px] sm:text-[14px]"><span className="font-bold">Client :</span>  Thais Be.</p>
                <p className="text-[12px] sm:text-[14px]"><span className="font-bold">Articles :</span> 1L Jus d'orange, Haribo mix, 1 pack Cristaline 1L</p>
                <p className="text-[12px] sm:text-[14px]"><span className="font-bold">Note :</span> Pas de noté associée à cette commande</p>
                <p className="text-[12px] sm:text-[14px]"><span className="font-bold">Status :</span> En préparation</p>
                </div>
                <div className="flex items-center justify-center hover:cursor-pointer ">
                    <AiOutlineCheckCircle className="text-[40px] sm:text-[60px] text-green-500"/>
                    <AiOutlineCloseCircle className="text-[40px]  sm:text-[60px] text-[#f51505]"/>
                </div>
            </div>
            <div className="relative hover:cursor-pointer">
                <FiPrinter className="absolute right-[0px] text-[25px]"/>
            </div>
        </div>
        
    </div>
  )
}
