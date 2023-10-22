import React from 'react'
import logoFooter from '../assets/images/Logo-footer.png'

export default function Footer() {
  return (
    <>
       <div className="w-full h-fit bg-black sm:pt-3 pt-2">
        <div className="w-[93%] h-full mx-auto flex justify-between items-center">
            <div className="mt-2">
                <img src={logoFooter} alt="logo footer Shoploc" className="sm:w-[260px] lg:ml-3 lg:w-[320px]"/>
            </div>  
            <div className="flex flex-col items-end lg:w-[30%]">
                <div className="lg:flex lg:flex-row lg:items-center lg:justify-between lg:w-full">
                    <div className="mb-2 mt-1">
                        <h4 className="text-white font-bold text-[#8C8C8C] text-[15px] sm:text-[18px] lg:text-[15px] text-end">Clients Shoploc</h4>
                        <p className="text-white text-[11px] sm:text-[14px] text-end lg:text-[14px] font-semibold"><a href="#">Questions fréquentes</a></p>
                    </div>
                    <div className="mb-2">
                        <h4 className="text-white font-bold text-[#8C8C8C] text-[15px] sm:text-[18px] lg:text-[15px] text-end">PARTENAIRES ShopLoc</h4>
                        <p className="text-white text-[11px] sm:text-[14px] text-end lg:text-[14px] font-semibold"><a href="#">ShopLoc Partenaire</a></p>
                    </div>
                </div>
                <div className="mb-3">
                    <h4 className="text-white font-bold text-white text-[15px] sm:text-[18px] lg:text-[15px] text-end ">Contactez-nous</h4>
                    <p className="text-white text-[11px] sm:text-[14px] text-end lg:text-[14px] font-semibold"><a href="#">contact@shoploc.fr</a></p>
                </div>
            </div>
        </div>
        <div className="w-full h-[1px] bg-white"></div>
        <div className="w-[70%] mt-2 mx-auto pb-3">
            <p className="text-white text-[12px] font-bold text-center">© 2023 ShopLoc - Tous droits réservés</p>
            <div className="flex items-center justify-center text-center">
                <p className="mr-3 text-[#3C24D1] text-[10px] font-semibold"><a href="#">Politique de confidentialité</a></p>
                <p className="text-[#3C24D1] text-[10px] font-semibold"><a href="">Conditions d’utilisations</a></p>
            </div>
        </div>
        </div> 
    </>
  )
}
