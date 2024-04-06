import React from 'react'
import {GiLockedChest} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

export default function CatalogueVFPBox({ isVfp }) {

  const navigate = useNavigate();
  
  function goToCatalog() {
    if (isVfp) {
      navigate('/client/vfp');
    }
  }
  return (
    <div className={isVfp ? "w-[175px] h-[40px] bg-gray-200 rounded-[50px] lg:block mr-4 hover:cursor-pointer border-b-4 border-[#3C24D1]" : "w-[175px] h-[40px] bg-gray-200 rounded-[50px] lg:block mr-4"}>
        <div className="h-full w-[75%] flex items-center mx-auto justify-between" onClick={goToCatalog}>
        <GiLockedChest className={isVfp ? "text-[18px] sm:text-[21px] opacity-[1]" : "text-[18px] sm:text-[21px] opacity-[0.5]"} />
        <p className={isVfp ? "text-black text-[10px] sm:text-[14px] font-bold opacity-[1]" : "text-black text-[11px] sm:text-[14px] font-bold opacity-[0.5]"}>Catalogue VFP</p>
        </div>
    </div>
  )
}
