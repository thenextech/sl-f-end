import React, { useState } from 'react'
import ShoppingCartItem from './ShoppingCartItem'
import PaymentBtn from '../../buttons/PaymentBtn'


export default function ShoppingCartSideBar({elementClicked, handleElementClick, numItems }) {

    function handleClick() {
        handleElementClick()
    }

    return (
        <>
        <div className={elementClicked ? "w-[250px] sm:w-[350px]  md:w-[450px] h-[100%] bg-white fixed top-0 right-0 shadow-xl flex flex-col items-center z-40" : "fixed right-[150%]"} onClick={handleClick}>
            {numItems === 0 ? 
                <div className="w-[75%] h-full flex flex-col justify-center items-center">
                    <p className="font-semibold opacity-[0.5]">Votre panier est vide</p>
                </div>  : 
                <>  
                    <div className="w-full h-[98%] flex flex-col justify-between">
                        <div className="relative h-full">
                            <ShoppingCartItem />
                            <div className="w-full h-[40px] absolute bottom-0 flex items-center justify-between border-b-2 border-gray-100">
                                <h1 className="ml-3 font-bold text-[20px] sm:text-[30px]">TOTAL</h1>
                                <p className="mr-3 font-bold text-[20px] ">14€50</p>
                            </div>            
                        </div>
                        <div className="w-[90%] mx-auto">
                            <PaymentBtn />
                        </div>
                    </div>
                    
                    
                </>
                }
        </div>
        </>
        
    )
}
