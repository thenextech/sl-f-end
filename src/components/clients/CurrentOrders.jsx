import React from 'react'

export default function CurrentOrders({ numOrders }) {

  return (
    <>
      <div className="flex flex-col ">
                <p className="relative text-black w-fit">
                    <p className="font-bold sm:font-semibold text-[13px] sm:text-[16px] md:text-[18px] hover:cursor-pointer">Commandes en cours</p>
                    {!numOrders || numOrders === 0 ? null : <div className="absolute top-[-12px] md:top-[-15px] right-[-15px] md:right-[-20px] bg-red-500 md:w-[25px] md:h-[25px] w-[20px] h-[20px] rounded-[100%] flex items-center justify-center">
                        <p className="md:text-[15px] text-[12px]  font-semibold">{numOrders}</p>
                    </div>}
                </p>       
        </div>
      </>
  )
}