import React from 'react'
import ModifyStock from './buttons/ModifyStock'

export default function ProductCard({ name, description, category, status, stock, price}) {
  return (
    <div className="h-[280px] sm:h-[300px] md:h-[315px] w-[170px] sm:w-[180px] md:w-[220px]  rounded-[5px] shadow-my">
        <div className="bg-gray-200 w-full h-[120px] rounded-t-[5px] flex justify-center items-center">
            <p className="text-[20px] font-semibold text-gray-500">{name}</p>
        </div>
        <div className="w-[95%] mx-auto">
            <p className="text-[18px] font-semibold">{name}</p>
            <p className="text-[12px] opacity-[0.5]">{description}</p>
            <p className="text-[12px] opacity-[0.5]">{category}</p>
            <p className="text-[12px] opacity-[0.5]">{status}</p>
            <p className="text-[12px] opacity-[0.5]">Stock restant : {stock}</p>
            <p className="text-[13px] font-semibold md:text-[15px]">{price}</p>
            <ModifyStock />
        </div>
    </div>
  )
}
