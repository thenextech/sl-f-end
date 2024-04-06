import React, { useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";

export default function ShoppingCartNav({ handleBoxClick, numItems }) {

  function handleClick(){
    handleBoxClick()
  }

  return (
    <>
      <div className="w-[75px] h-[40px] sm:w-[75px] bg-black rounded-[50px] hover:cursor-pointer" onClick={handleClick}>
          <div className="h-full w-[60%] sm:w-[65%] md:w-[55%] flex items-center mx-auto justify-between">
              <FaCartShopping className="text-white text-[15px] sm:text-[21px]"/>
              <p className="text-white text-[12px] sm:text-[15px] font-bold">{numItems}</p>
          </div>
      </div>
    </>
  )
}
