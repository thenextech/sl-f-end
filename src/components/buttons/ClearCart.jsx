import React from 'react'
import { useShoppingCart } from '../clients/shoppingCart/ShoppingCartContext';

export default function ClearCart({ handleBtnClick }) {
  
  const { clearCart } = useShoppingCart();

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="flex flex-col items-center" onClick={handleBtnClick}>
        <button className="text-white bg-red-700 py-[7px] px-[15px] rounded-[5px] font-semibold text-center text-[16px] sm:text-[16px] md:text-[18px] w-[100%] mt-4 hover:cursor-pointer" onClick={handleClearCart}>Vider le panier</button>
    </div>
  )
}
