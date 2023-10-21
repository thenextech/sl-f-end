import React from 'react'

export default function Card({ title, paragraph }) {
  return (
    <>
        <div className='w-full h-[200px] md:h-[300px] lg:h-[320px] bg-[#F2F2F2] lg:pt-0 pt-4'>
            <div className="lg:w-[55%] w-[75%] h-full mx-auto flex flex-col justify-center items-center">
                <h1 className="font-bold text-[35px] text-center leading-10">{title}</h1>
                <p className="text-center mt-3 text-[20px]">{paragraph}</p>
            </div>
        </div>
    </>
  )
}
