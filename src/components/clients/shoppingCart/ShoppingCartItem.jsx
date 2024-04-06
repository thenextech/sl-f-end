import React from 'react'
import cocaImg from '../../../assets/images/products/coca.png';
import { IoMdClose } from "react-icons/io";
import { useShoppingCart } from './ShoppingCartContext';

export default function ShoppingCartItem({ productId, nom, reference, businessName, businessAddress, quantity, price, merchantId}) {
  const { removeItemFromCart } = useShoppingCart();

  const handleRemoveItem = () => {
    removeItemFromCart(productId);
  };

  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    const [euros, cents] = formattedPrice.split('.');
    return `${euros}€${cents !== '00' ? cents : ''}`;
};

const computeTotalPrice = () => {
    const total = quantity * price;
    return formatPrice(total.toString());
}
  
  return (
    <div className="flex w-[95%] mx-auto h-[100px] items-center border-b-[0.5px] border-gray-100 mb-2 pb-2">
      <div className="w-[25px] h-[20px] bg-gray-200 rounded-[100%] text-center font-bold text-[12px]">{quantity}</div>
      <div className="relative flex w-full ml-1">
        <div className="w-[90px] h-[90px] bg-gray-200 flex items-center justify-center rounded-md">
          <p className="font-semibold text-gray-700 text-center">{nom}</p>
        </div>
        <div className="ml-3">
          <p className="text-[13px]">{nom}</p>
          <p className="text-[10px] opacity-[0.5]">{reference}</p>
          <p className="text-[10px] opacity-[0.5]">{businessName}</p>
        </div>
        <p className="absolute bottom-0 right-0 font-bold">{computeTotalPrice()}</p>
        <IoMdClose className="absolute top-0 right-0 text-[20px] hover:cursor-pointer" onClick={handleRemoveItem}/>
      </div>      
    </div>
  )
}
