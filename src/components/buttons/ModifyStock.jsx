import React from 'react'

export default function ModifyStock( { modifyProduct, addToVfp }) {

  function handleClick() {
    modifyProduct();
  }

  function handleVFPClick() {
    addToVfp();
  }
  return (
    <div className="flex flex-col items-center">
      <button className="text-white bg-[#3C24D1] py-[5px] px-[13px] rounded-[5px] font-semibold text-center text-[12px] sm:text-[14px] w-[95%] mt-4 sm:mt-4 md:mt-8 hover:cursor-pointer" onClick={handleClick}>Modifier le produit</button>
      <button className="text-white bg-black py-[5px] px-[13px] rounded-[5px] font-semibold text-center text-[11px] sm:text-[14px] w-[95%] mt-2 hover:cursor-pointer" onClick={handleVFPClick}>Ajouter au catalogue VFP</button>
    </div>
  )
}
