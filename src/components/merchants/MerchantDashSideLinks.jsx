import React from 'react'
import { Link } from "react-router-dom";

export default function MerchantDashSideLinks() {
    return (
      <div className="mt-4">
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]"><Link to="#">Caisse</Link></p>
        </div>
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]"><Link to="/merchant/orders">Commandes</Link></p>
        </div>  
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]"><Link to="/merchant/category">Produits</Link></p>
        </div>   
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]">Offres</p>
        </div>  
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]">Stats</p>
        </div>  
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]">Profil</p>
        </div>  
      </div>
    )
}
