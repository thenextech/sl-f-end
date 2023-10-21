import React from 'react'

export default function HowItWorks() {
  return (
    <>
        <div className='w-full h-fit md:h-[300px] lg:h-[320px] bg-white pt-8 pb-12'>
            <div className="lg:w-[55%] w-[75%] h-full mx-auto flex flex-col justify-center items-center">
                <div className="lg:w-[60%] w-[75%] sm:w-[87%] sm:h-[90px] lg:h-[35%] h-[120px] mx-auto">
                    <h1 className="font-bold text-[40px] text-center leading-[45px]">Comment ça marche ?</h1>
                </div>
                
                <ol type="1" className="font-black text-center text-[23px] font-normal">
                    <li>
                        1. Explorez les commerçants locaux.
                    </li>
                    <li>
                        2. Passez votre commande en ligne.
                    </li>
                    <li>
                        3. Récupérez vos achats en suivant l'itinéraire le plus pratique.
                    </li>
                </ol>
            </div>
        </div>
    </>
  )
}
