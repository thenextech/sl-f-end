import React from 'react'
import { Link } from "react-router-dom";
import CurrentOrders from '../clients/CurrentOrders';

export default function ClientDashSideLinks({ numOrders }) {
    return (
      <div className="mt-4">
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]"><Link to="/client/dashboard">Accueil</Link></p>
        </div> 
        <Link to="/client/orders">
            <div className="py-3">
                <CurrentOrders numOrders={numOrders} />
            </div>
        </Link> 
        <div className="py-3 hover:cursor-pointer">
            <p className="font-semibold sm:text-[16px] md:text-[18px]"><Link to="/client/benefits">Avantages récupérés</Link></p>
        </div> 
      </div>
    )
}
