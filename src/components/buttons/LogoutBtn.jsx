import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function LogoutBtn({ handleBtnClick }) {
  const location = useLocation();

  // Vérifie si l'URL contient 'merchant'
  const isMerchant = location.pathname.includes('merchant');

  return (
    <div className="flex flex-col items-center space-y-5">
      {/* Affiche les boutons seulement si l'utilisateur n'est pas dans la section marchand */}
      {!isMerchant && (
        <>
          <Link to="/client/dashboard" className="text-black py-[7px] px-[15px] font-semibold text-center text-[16px] sm:text-[16px] md:text-[18px] w-full mt-5 hover:cursor-pointer">
            Accueil
          </Link>
          <Link to="/client/orders" className="text-black py-[7px] px-[15px] font-semibold text-center text-[16px] sm:text-[16px] md:text-[18px] w-full mt-5 hover:cursor-pointer">
            Commandes
          </Link>
        </>
      )}
      {/* Bouton Se déconnecter */}
      <button onClick={handleBtnClick} className="text-white bg-[#3C24D1] py-[7px] px-[15px] rounded-[10px] font-semibold text-center text-[16px] sm:text-[16px] md:text-[18px] w-full hover:cursor-pointer">
        Se déconnecter
      </button>
    </div>
  );
}
