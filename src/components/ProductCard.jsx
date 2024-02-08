import React, { useState} from 'react'
import ModifyStock from './buttons/ModifyStock'
import AddToCart from './buttons/AddToCart'
import { MdDelete } from "react-icons/md";
import { useShoppingCart } from './clients/shoppingCart/ShoppingCartContext';
import ShoppingCartItem from './clients/shoppingCart/ShoppingCartItem';

export default function ProductCard({ name, description, productId, category, status, stock, price, handleDeleteProduct, commercant, showDeleteIcon = true, businessName, handleModifyProduct}) {
  
  const { addToCart } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    const [euros, cents] = formattedPrice.split('.');
    return `${euros}€${cents !== '00' ? cents : ''}`;
  };

  const modifyProduct = () => {
    handleModifyProduct(productId);
  }

  const handleAddToCart = () => {
    addToCart(<ShoppingCartItem
      productId={productId}
      nom={name}
      reference={description}
      businessName={businessName}
      quantity={quantity}
      price={price} />);
  };

  const onDeleteClick = () => {
    handleDeleteProduct(productId);
  };
  return (
    <div className="h-[280px] sm:h-[300px] md:h-[315px] w-[170px] sm:w-[180px] md:w-[220px]  rounded-[5px] shadow-my">
        <div className="bg-gray-200 w-full h-[120px] rounded-t-[5px] flex justify-center items-center">
            <p className="text-[20px] font-semibold text-gray-500">{name}</p>
        </div>
        <div className="relative w-[95%] mx-auto h-[190px]">
          {showDeleteIcon ? <MdDelete className="absolute top-1 right-0 text-[20px] hover:cursor-pointer" onClick={onDeleteClick}/> : null}
          <p className="text-[18px] font-semibold">{name}</p>
          <p className="text-[12px] opacity-[0.5]">{description}</p>
          {commercant ? <p className="text-[12px] opacity-[0.5]">{category}</p> : null}
          {commercant ? <p className="text-[12px] opacity-[0.5]">{status}</p> : null}
          {commercant ? <p className="text-[12px] opacity-[0.5]">Stock restant : {stock}</p> : null}
          <p className="text-[13px] font-semibold md:text-[15px]">{formatPrice(price)}</p>
          {!commercant && <div className="items-center">
            <p className="text-[12px]">Quantité</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:border-blue-500 mr-2 w-[100px]"
            /></div>}
          {commercant ? <ModifyStock modifyProduct={modifyProduct}/>: <AddToCart handleAddToCart={handleAddToCart}/>}
        </div>
    </div>
  )
}
