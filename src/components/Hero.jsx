import React from 'react'

export default function Hero() {
  return (
    <>  
        <div className="h-[700px] bg-indigo-950 flex flex-col justify-center">
            <div className="h-[80%] w-[70%] mx-auto flex flex-col justify-between items center text-center">
                <div>
                    <h1 className="text-white text-[45px] font-bold leading-none">Bienvenue sur ShopLoc</h1>
                    <p className='text-white mt-4'>Votre plateforme de shopping local</p>
                </div>
                <button className="bg-black text-white px-5 py-2 rounded-[50px] font-bold lg:w-[30%] md:w-[50%] w-[70%] text-[25px] hover:cursor-pointer place-self-center">Démarrer</button>
            </div>
        </div>
    </>
  )
}
