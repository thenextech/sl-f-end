import React from 'react'

export default function AddToCart({handleAddToCart}) {

  function handleClick(){
    handleAddToCart();
  }

  return (
    <div className="flex flex-col items-center justify-end h-[70px]">
        <button className="text-white bg-[#3C24D1] py-[5px] px-[13px] rounded-[5px] font-semibold text-center text-[12px] sm:text-[14px] w-[95%] mt-2 sm:mt-4 md:mt-8 hover:cursor-pointer" onClick={handleClick}>Ajouter au panier</button>
    </div>
  )
}
