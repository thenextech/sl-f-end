import ClientNavbar from "./ClientNavbar";
import React, {useState, useEffect} from 'react'
import { IoMdSearch } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
import ClientEnteredOrder from "./ClientEnteredOrder";
import { useNavigate } from "react-router-dom";

export default function CurrentBenefitsPage() {

    const API_URL = process.env.REACT_APP_API_URL;

    const [searchValue, setSearchValue] = useState("");
    const [clientData, setClientData] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [clientOrders, setClientOrders] = useState({});

    const navigate = useNavigate();

    const isThereAnActiveSession = async () => {
        try {
            const response = await fetch(`${API_URL}/client/dashboard`, {
                credentials: 'include',
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                const fetchedMerchantId = data.object.userId;

                if (fetchedMerchantId) {
                    setIsAuthenticated(true);
                    setClientData(data.object);
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
            const response = await fetch(`${API_URL}/orders/client?clientId=${userId}`, {
                credentials: 'include',
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                data.sort((a, b) => b.orderId - a.orderId);
                setClientOrders(data);
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
        fetchAllCurrentOrders(clientData.userId)
    }, [clientData]);

    function goBackToDashboard() {
        navigate('/client/dashboard');
    }

    return (
        <>
            <ClientNavbar />
            <div className="w-[93%] mx-auto sm:mt-2">
                <div className="w-[95%] mx-auto sm:mt-4 sm:w-[97%] flex justify-between items-center" onClick={goBackToDashboard}>
                    <MdKeyboardBackspace className="text-[45px] sm:text-[55px] md:text-[65px] hover:cursor-pointer "/>
                </div>
                <div className="flex justify-end">
                    <div>
                        <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center md:w-[300px] sm:w-[250px]  sm:mt-0 mt-4">
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
                    {clientOrders.length > 0 ? clientOrders
                      .filter(order => order.orderId.toString().includes(searchValue))
                      .map(({ orderId, totalPrice }) => (
                            <ClientEnteredOrder 
                                key={orderId} 
                                orderId={orderId}
                                totalPrice={totalPrice} 
                            />
                    )) : null}
                </div>
            </div>
        </>
    )
}