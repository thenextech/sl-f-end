import React, { useEffect, useState} from 'react'
import ModifyStock from './buttons/ModifyStock'
import AddToCart from './buttons/AddToCart'
import { MdDelete } from "react-icons/md";
import { AiFillGift } from "react-icons/ai";
import { useShoppingCart } from './clients/shoppingCart/ShoppingCartContext';
import ShoppingCartItem from './clients/shoppingCart/ShoppingCartItem';

export default function ProductCard({ name, description, productId, category, status, stock, price, handleDeleteProduct, commercant, showDeleteIcon = true, businessName, handleModifyProduct, businessAdress, idMerchant, addToVfp}) {
  
  const { addToCart } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);
  const lowStockThreshold = 5; 
  // Permet de désactiver le bouton ajouter au panier en fonction de la disponibilité du produit en stock
  /*useEffect(() => {
    if (quantity < stock) {
      setNoStock(true);
    } else {
      setNoStock(false);
    }
  });*/

  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    const [euros, cents] = formattedPrice.split('.');
    return `${euros}€${cents !== '00' ? cents : ''}`;
  };

  const modifyProduct = () => {
    handleModifyProduct(productId);
  }

  const addProductToVfp = () => {
    addToVfp(productId);
  }

  const handleAddToCart = () => {
    addToCart(<ShoppingCartItem
      productId={productId}
      nom={name}
      reference={description}
      businessName={businessName}
      businessAddress={businessAdress}
      quantity={quantity}
      price={price}
      merchantId={idMerchant}
      />);
  };
  

  const onDeleteClick = () => {
    handleDeleteProduct(productId);
  };
  return (
    <div className="h-[310px] sm:h-[340px] md:h-[355px] w-[170px] sm:w-[180px] md:w-[220px]  rounded-[5px] shadow-my">
        <div className="bg-gray-200 w-full h-[120px] rounded-t-[5px] flex justify-center items-center">
            <p className="sm:text-[20px] font-semibold text-gray-500">{name}</p>
        </div>
        <div className="relative w-[95%] mx-auto h-[190px]">
        {showDeleteIcon ?
          <MdDelete className="absolute top-1 right-0 text-[20px] hover:cursor-pointer" onClick={onDeleteClick} /> : null}
          <p className="text-[14px] sm:text-[18px] font-semibold">{name}</p>
          <p className="text-[10px] sm:text-[12px] opacity-[0.5]">{description}</p>
          {commercant ? <p className="text-[10px] sm:text-[12px] opacity-[0.5]">{category}</p> : null}
          {commercant ? <p className="text-[10px] sm:text-[12px] opacity-[0.5]">{status}</p> : null}
          {commercant ? <p className="text-[10px] sm:text-[12px] opacity-[0.5]">Stock restant : {stock}</p> : null}
          <p className="text-[11px] sm:text-[13px] font-semibold md:text-[15px]">{formatPrice(price)}</p>
          {!commercant && <div className="items-center">
            <p className="text-[12px]">Quantité</p>
            <input
              type="number"
              value={quantity}
              min="1"
              max={stock.toString()}
              onChange={(e) => setQuantity(Math.max(1, Math.min(stock, parseInt(e.target.value))))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:border-blue-500 mr-2 w-[100px]"
          /></div>}
          {stock <= lowStockThreshold && stock > 0 && (
            <p className="text-red-500 text-sm">Il ne reste plus que {stock} produit(s) en stock !</p>
          )}
          {stock === 0 && <p className="text-red-500 text-sm">Produit indisponible</p>}
        {commercant ? <ModifyStock modifyProduct={modifyProduct} addToVfp={addProductToVfp} /> : <AddToCart handleAddToCart={handleAddToCart} stock={stock} quantity={quantity} />}
        </div>
    </div>
  )
}
