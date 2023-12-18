import React from 'react'

export default function PaymentBtn({ handleBtnClick }) {
  return (
    <div className="flex flex-col items-center" onClick={handleBtnClick}>
        <button className="text-white bg-[#3C24D1] py-[7px] px-[15px] rounded-[5px] font-semibold text-center text-[16px] sm:text-[16px] md:text-[18px] w-[100%] mt-4 hover:cursor-pointer">Procéder au paiement</button>
    </div>
  )
}
