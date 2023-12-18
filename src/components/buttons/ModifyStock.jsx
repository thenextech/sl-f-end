import React from 'react'

export default function ModifyStock( { modifyProduct }) {

  function handleClick() {
    modifyProduct();
  }
  return (
    <div className="flex flex-col items-center">
        <button className="text-white bg-[#3C24D1] py-[5px] px-[13px] rounded-[5px] font-semibold text-center text-[12px] sm:text-[14px] w-[95%] mt-2 sm:mt-4 md:mt-8 hover:cursor-pointer" onClick={handleClick}>Modifier le produit</button>
    </div>
  )
}
