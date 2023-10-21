import React from 'react'
import {AiOutlineArrowRight} from 'react-icons/ai'

export default function VFPHome() {
  return (
    <>
        <div className='w-full h-fit md:h-[300px] lg:h-[320px] bg-[#170876] pt-8 text-white'>
            <div className="lg:w-[55%] w-[80%] h-full mx-auto flex flex-col items-center">
                <div className="w-[70%] sm:w-[80%] h-[30%] lg:h-[23%]">
                    <h1 className="font-bold text-[40px] text-center leading-[47px]"><span className="text-[#F9B300]">VFP</span> : Votre quotidien privilégié</h1>
                </div>
                <div className="lg:w-[60%]">
                <p className="text-center sm:mt-4 mt-8 lg:mt-0 text-[25px]">Des titres de transport gratuits et des places de parking offertes pour un quotidien plus facile et économique !</p>
                </div>
                <div className="flex p-5 items-center sm:w-[40%] w-[80%] lg:w-[25%] justify-center border-2 sm:mt-8 mt-12 hover:cursor-pointer">
                    <p className="font-bold">EN SAVOIR PLUS</p>
                </div>
            </div>
        </div>
    </>
  )
}
