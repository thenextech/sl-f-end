import React from 'react'
import { Link } from "react-router-dom";
import CurrentOrders from '../clients/CurrentOrders';

export default function MerchantDashSideLinks({ numOrders }) {
    return (
      <div className="mt-4">
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]"><Link to="/merchant/dashboard">Tableau de bord</Link></p>
        </div> 
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]"><Link to="#">Caisse</Link></p>
        </div>
            <Link to="/merchant/orders">
                <div className="py-3">
                    <CurrentOrders numOrders={numOrders} />
                </div>
            </Link>    
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]"><Link to="/merchant/category">Produits</Link></p>
        </div>   
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]"><Link to="/merchant/vfp">Offres VFP</Link></p>
        </div>   
      </div>
    )
}
