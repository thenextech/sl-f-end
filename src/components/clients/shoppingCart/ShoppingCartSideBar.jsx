import React, { useState } from 'react'
import ShoppingCartItem from './ShoppingCartItem'
import PaymentBtn from '../../buttons/PaymentBtn'
import ClearCart from '../../buttons/ClearCart';
import { useShoppingCart } from './ShoppingCartContext';


export default function ShoppingCartSideBar({elementClicked, handleElementClick, numItems, items }) {

    const formatPrice = (price) => {
        const formattedPrice = parseFloat(price).toFixed(2);
        const [euros, cents] = formattedPrice.split('.');
        return `${euros}€${cents !== '00' ? cents : ''}`;
    };

    const computeTotalPrice = () => {
        let result = 0;
        items.map( item => result += parseFloat(item.props.price*item.props.quantity));
        return formatPrice(result.toString());
    }

    return (
        <>
        <div className={elementClicked ? "w-[250px] sm:w-[350px]  md:w-[450px] h-[100%] bg-white fixed top-0 right-0 shadow-xl flex flex-col items-center z-40" : "fixed right-[150%]"}>
            {numItems === 0 ? 
                <div className="w-[75%] h-full flex flex-col justify-center items-center">
                    <p className="font-semibold opacity-[0.5]">Votre panier est vide</p>
                </div>  : 
                <>  
                    <div className="w-full h-[98%] flex flex-col justify-between">
                        <div className="h-full overflow-auto">
                            <div className="h-full ">
                                {items.map( item => <ShoppingCartItem
                                    productId={item.props.productId}
                                    nom={item.props.nom}
                                    quantity={item.props.quantity}
                                    reference={item.props.reference}
                                    price={item.props.price} 
                                    businessName={item.props.businessName}/>)}
                            </div>          
                        </div>
                        <div className="w-full h-[40px] bg-white flex items-center justify-between border-b-2 border-gray-100">
                                <h1 className="ml-3 font-bold text-[20px] sm:text-[30px]">TOTAL</h1>
                                <p className="mr-3 font-bold text-[20px] ">{computeTotalPrice()}</p>
                        </div>
                        <div className="w-[90%] mx-auto">
                            <ClearCart />
                            <PaymentBtn />
                        </div>
                    </div>
                    
                    
                </>
                }
        </div>
        </>
        
    )
}
