import React from 'react'
import RegisterForm from './RegisterForm'
import ShopImg from '../assets/images/shoprender-1.png'

export default function RegisterHero() {
  return (
    <>  
        <div className="w-[95%] font-bold mx-auto">
            <div className="w-[98%] mx-auto mt-2">
            <h2 className="text-black text-[14px] ">COMMERÇANTS ? DEVENEZ PARTENAIRE SHOPLOC ET PROPOSEZ VOS PRODUITS EN <span className="text-[#3C24D1]">CLICK&COLLECT</span> À VOS CLIENTS !</h2>
            </div>
            <div className="relative flex mt-4 justify-center items-center">
                <div className="w-[90%] md:w-[60%]">
                    <RegisterForm />
                </div>
                <div className="w-[10%] md:w-[40%]  h-full">
                  <img src={ShopImg} alt="Shop logo" className="absolute md:w-[500px] max-[375px]:left-[235px] max-[375px]:top-[-10px] max-[450px]:left-[245px] max-[450px]:top-[-30px] max-[500px]:left-[270px] max-[500px]:top-[-50px] max-[530px]:w-[400px] max-[530px]:left-[290px] max-[530px]:top-[-30px] max-[560px]:w-[400px] max-[560px]:left-[320px] max-[560px]:top-[-30px] max-[600px]:left-[350px] max-[600px]:w-[400px] max-[600px]:top-[-30px] min-[600px]:w-[400px] min-[600px]:left-[390px] min-[600px]top-[-20px] md:static" />
                </div>
            </div>
        </div>
        
    </>
  )
}
