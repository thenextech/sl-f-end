import React from 'react'

export default function Card({ title, paragraph }) {
  return (
    <>
        <div className='w-full h-[200px] md:h-[300px] lg:h-[250px] bg-[#F2F2F2] lg:pt-0 pt-4'>
            <div className="lg:w-[85%] w-[85%] h-full mx-auto flex flex-col justify-center items-center">
              <div className="w-[90%]">
                <h1 className="font-bold text-[30px] text-center leading-10">{title}</h1>
              </div>
                <p className="text-center mt-3 text-[20px] lg:mt-6">{paragraph}</p>
            </div>
        </div>
    </>
  )
}
