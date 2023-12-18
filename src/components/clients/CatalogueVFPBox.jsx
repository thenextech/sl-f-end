import React from 'react'
import {GiLockedChest} from 'react-icons/gi'

export default function CatalogueVFPBox() {
  return (
    <div className="w-[175px] h-[40px] bg-gray-200 rounded-[50px] hidden lg:block mr-4">
        <div className="h-full w-[75%] flex items-center mx-auto justify-between">
            <GiLockedChest className="text-[18px] sm:text-[21px] opacity-[0.5]"/>
            <p className="text-black text-[12px] sm:text-[15px] font-bold opacity-[0.5]">Catalogue VFP</p>
        </div>
    </div>
  )
}
