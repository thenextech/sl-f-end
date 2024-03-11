import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import qrCode from '../assets/images/qrCode.png'

import ClientNavbar from '../components/clients/ClientNavbar';
import { useShoppingCart } from '../components/clients/shoppingCart/ShoppingCartContext';
import NavigationMap from '../components/clients/NavigationMap';

function ClientOrderOK() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [order, setOrder] = useState({});
    const { clearCart } = useShoppingCart();

    const { orderId } = useParams();
    const orderIdAfterHash = orderId.length === 101 ? orderId[50] :orderId[50] + orderId[51];

    const API_URL = process.env.REACT_APP_API_URL;

    const fetchOrder = async () => {

        try {
            const response = await fetch(`${API_URL}/orders/${orderIdAfterHash}`, {
                credentials: 'include',
                method: 'GET',
            });

            if (response.ok) {
                console.log('order successfully fetched');
                const data = await response.json();
                console.log(data);
                setOrder(data);
            } else {
                setOrder(null);
            }
        } catch (error) {
            console.log('Fetching order error: ', error);
        }
    }

    const [openQRCode, setOpenQRCode] = useState(false);

    function showQRCode() {
        setOpenQRCode(!openQRCode);
    }

    const isThereAnActiveSession = async () => {
        try {
            const response = await fetch(`${API_URL}/client/dashboard`, {
                credentials: 'include',
                method: 'GET'
            });
    
            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(true);
                await fetchOrder();
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsAuthenticated(false); 
        }
    }
    
    useEffect(() => {
        const checkSession = async () => {
            await isThereAnActiveSession();
        };
    
        checkSession();
        clearCart();
    }, []);
    
    if (!isAuthenticated) {
        return null; 
    }


    if (isAuthenticated) {
        return (
            <>  
                { order.status === 'PAID' ? 
                <>
                <div className={openQRCode ? "fixed top-0 z-30 bg-black opacity-80 h-[550px] md:h-[700px] w-full" : "hidden"} onClick={showQRCode}></div>
                <ClientNavbar />
                <div className="relative h-screen">
                    <div className={openQRCode ? "z-40 w-full h-[400px] bg-white absolute bottom-0 rounded-t-xl shadow-my2 flex justify-center items-center" : "hidden"}>
                        <img src={qrCode} alt="QR CODE" className="w-[300px] h-[300px]"></img>
                    </div>
                    <div className="px-4 mt-2 z-20">
                        <h1 className="lg:text-[30px]">🎉 Votre paiement a été accepté.</h1>
                        <p className="text-[14px] mt-1 lg:text-[20px]">
                            Vous trouverez ci-dessous l’itinéraire à suivre afin de récupérer votre commande. N’oubliez pas de passer votre <span className="font-bold">QR code</span> à chaque fois.
                        </p>
                        <NavigationMap />
                        <button 
                            className="text-white bg-[#3C24D1] py-[7px] px-[15px] rounded-[10px] font-regular text-center text-[14px] sm:text-[16px] md:text-[18px] w-[100%] mt-5 hover:cursor-pointer shadow-my2 "
                            onClick={showQRCode}
                        >
                            AFFICHER MON QR CODE
                        </button>
                    </div>
                    <div className="absolute bottom-2 w-full">
                        <p className="text-center text-[10px]">© 2023 ShopLoc - Tous droits réservés</p>
                    </div>
                </div>
                </> : null}
            </>
        );
    }

    if (!order) {
        return <Navigate to="/client/dashboard" replace={true} />;
    }

    return <Navigate to="/client/login" replace={true} />;
}

export default ClientOrderOK;