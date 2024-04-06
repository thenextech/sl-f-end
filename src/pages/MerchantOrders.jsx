import React, { useState, useEffect } from 'react'
import MerchantDashNavbar from '../components/merchants/MerchantDashNavbar';
import MerchantEnteredOrder from '../components/merchants/MerchantEnteredOrder';
import { IoMdSearch } from "react-icons/io";

export default function MerchantOrders() {

    const [entrantesClicked, setEntrantesClicked] = useState(true);
    const [approuveesClicked, setApprouveesClicked] = useState(false);
    const [annuleesClicked, setAnnuleesClicked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [merchantOrdersLines, setMerchantOrdersLines] = useState({});
    const [merchantData, setMerchantData] = useState({});
    const [searchValue, setSearchValue] = useState("");
    const [products, setProducts] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;

    const isThereAnActiveSession = async () => {
        try {
            const response = await fetch(`${API_URL}/merchant/dashboard`, {
                credentials: 'include',
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                const fetchedMerchantId = data.object.userId;

                if (fetchedMerchantId) {
                    setIsAuthenticated(true);
                    setMerchantData(data.object);
                } else {
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsAuthenticated(false);
        }
    };

    const fetchAllCurrentOrders = async (userId) => {
        try {
            const response = await fetch(`${API_URL}/orderlines/m/${userId}`, {
                credentials: 'include',
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                // Transformation des données ici
                const transformedOrders = Object.keys(data).map(orderId => {
                    const orderItems = data[orderId];
                    const clientName = orderItems[0]?.clientName || ""; // Assumer que tous les articles ont le même nom de client
                    // Correction appliquée ici
                    const orderContent = orderItems.map(item => `${item.productName} (${item.quantity})`).join(", ");
                    const totalPrice = orderItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0).toFixed(2);

                    return { orderId: parseInt(orderId), clientName, orderContent, totalPrice: `${totalPrice}€` };
                });


                // Trier par orderId décroissant
                transformedOrders.sort((a, b) => b.orderId - a.orderId);

                setMerchantOrdersLines(transformedOrders);
            } else {
                console.log('fetching all order errors : ', response.error);
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

    }, []);

    useEffect(() => {
        fetchAllCurrentOrders(merchantData.userId)
    }, [merchantData]);

    function handleEntrantesClicked() {
        setApprouveesClicked(false);
        setAnnuleesClicked(false);
        setEntrantesClicked(true);
    }

    function handleApprouveesClicked() {
        setApprouveesClicked(true);
        setAnnuleesClicked(false);
        setEntrantesClicked(false);
    }

    function handleAnnuleesClicked() {
        setApprouveesClicked(false);
        setAnnuleesClicked(true);
        setEntrantesClicked(false);
    }

  return (
    <>  
        <MerchantDashNavbar businessName={merchantData.businessName} merchantId={merchantData.userId} />
        <div className="w-[93%] mx-auto mt-2">
            <div className="sm:flex sm:justify-between">
                <div className="flex w-[250px] sm:w-[270px] md:w-[290px] lg:w-[310px]">
                    <div className="hover:cursor-pointer" onClick={handleEntrantesClicked}>
                        <p className={entrantesClicked ? "text-[15px] font-semibold sm:text-[16px] md:text-[18px] lg:text-[20px] border-b-2 border-black" : "text-[15px] font-bold sm:text-[16px] md:text-[18px] lg:text-[20px]"}>Entrantes</p>
                    </div>
                </div>
                <div>
                    <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center md:w-[300px] sm:w-[250px] w-full sm:mt-0 mt-4">
                        <div className="pl-2">
                            <IoMdSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Chercher une commande"
                            name="orderSearch"
                            className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>
                <div className="md:mt-8">
                    {merchantOrdersLines.length > 0 ? merchantOrdersLines
                        .filter(order => order.orderId.toString().includes(searchValue))
                        .map(({ orderId, clientName, orderContent, totalPrice }) => (
                            <MerchantEnteredOrder
                                key={orderId}
                                orderId={`#${orderId}`}
                                clientName={clientName}
                                orderContent={orderContent}
                                totalPrice={totalPrice}
                            />
                        )) : null}
                </div>
            </div>
        </>
    )
}
