import React from 'react'
import LoginForm from './LoginForm'
import ShopImg from '../assets/images/shoprender-1.png'


export default function LoginHero() {
  return (
    <>  
        <div className="w-[95%] font-bold mx-auto">
            <div className="w-[98%] mx-auto mt-2">
              <h2 className="text-center text-black text-[14px] sm:text-[24px] md:text-[27px] lg:text-[34px]">COMMERÇANTS ? DEVENEZ PARTENAIRE SHOPLOC ET PROPOSEZ VOS PRODUITS EN <span className="text-[#3C24D1]">CLICK&COLLECT</span> À VOS CLIENTS !</h2>
            </div>
            <div className="relative flex mt-4 md:justify-between justify-center items-center lg:w-[90%] mb-4 h-[300px] md:h-[400px]">
                <div className="w-[70%] md:w-[70%] lg:w-[30%] lg:ml-32">
                    <LoginForm />
                </div>
                <img src={ShopImg} alt="Shop logo" className="hidden sm:hidden md:block max-[375px]:left-[235px] max-[375px]:top-[-10px] max-[450px]:left-[245px] max-[450px]:top-[-10px] max-[500px]:left-[270px] max-[500px]:top-[-30px] max-[530px]:w-[400px] max-[530px]:left-[290px] max-[530px]:top-[-30px] max-[560px]:w-[400px] max-[560px]:left-[320px] max-[560px]:top-[-30px] max-[600px]:left-[350px] max-[600px]:w-[400px] max-[600px]:top-[-30px] min-[600px]:w-[400px] min-[600px]:left-[410px] min-[600px]:top-[-40px] md:left-[550px] md:top-[-50px] md:w-[350px] min-[800px]:w-[450px]  min-[820px]:left-[500px] min-[820px]:top-[-70px] min-[1000px]:left-[700px] min-[1000px]:top-[-70px] min-[1300px]:left-[1000px] min-[1300px]:top-[-70px] min-[1700px]:left-[1200px] min-[1700px]:top-[-70px]" />
            </div>
        </div>
        
    </>
  )
}
