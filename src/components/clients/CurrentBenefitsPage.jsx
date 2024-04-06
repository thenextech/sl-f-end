import ClientNavbar from "./ClientNavbar";
import React, {useState, useEffect} from 'react'
import { IoMdSearch } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
import ClientEnteredOrder from "./ClientEnteredOrder";
import { useNavigate } from "react-router-dom";
import ClientEnteredBenefit from "./ClientEnteredBenefit";

export default function CurrentOrdersPage() {

    const API_URL = process.env.REACT_APP_API_URL;

    const [searchValue, setSearchValue] = useState("");
    const [clientData, setClientData] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [clientBenefits, setClientBenefits] = useState({});
    const [benefits, setBenefits] = useState([]);

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

    const fetchAllBenefitsClient = async (userId) => {
        try {
            const response = await fetch(`${API_URL}/benefitsclients/client/${userId}`, {
                credentials: 'include',
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                data.sort((a, b) => b.orderId - a.orderId);
                setClientBenefits(data);
                data.map((benefitClient) => fetchBenefitsById(benefitClient.benefitsId));
            } else {
                console.log('fetching all benefits clients errors : ', response.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsAuthenticated(false);
        }
    }

    const fetchBenefitsById = async (benefitId) => {
        try {
            const response = await fetch(`${API_URL}/benefits/${benefitId}`, {
                credentials: 'include',
                method: 'GET',
            });
    
            if (response.ok) {
                const benefitData = await response.json();
                setBenefits((currentBenefits) => {
                
                    const isBenefitExist = currentBenefits.some(benefit => benefit.benefitsId === benefitData.benefitsId);
                    if (!isBenefitExist) {
                        return [...currentBenefits, benefitData];
                    } else {
                        return currentBenefits;
                    }
                });
            } else {
                console.error('Failed to fetch benefit by id: ', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    

    useEffect(() => {
        const checkSession = async () => {
            await isThereAnActiveSession();
        };

        checkSession();
        
    }, []);

    useEffect(() => {
        fetchAllBenefitsClient(clientData.userId)
    }, [clientData]);

    function goBackToDashboard() {
        navigate('/client/dashboard');
    }

    
    console.log(benefits);

    return (
        <>
            <ClientNavbar />
            <div className="w-[93%] mx-auto sm:mt-2">
                <div className="w-[95%] mx-auto sm:mt-4 sm:w-[97%] flex justify-between items-center" onClick={goBackToDashboard}>
                    <MdKeyboardBackspace className="text-[45px] sm:text-[55px] md:text-[65px] hover:cursor-pointer "/>
                </div>
                {
                    benefits.length > 0 ?
                        <>
                            <div className="flex justify-end">
                                <div>
                                    <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center md:w-[300px] sm:w-[250px]  sm:mt-0 mt-4">
                                        <div className="pl-2">
                                            <IoMdSearch />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Chercher un avantage"
                                            name="orderSearch"
                                            className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </> : null}
                <div className="md:mt-8">
                    {benefits.length > 0 ? benefits
                      .filter(benefit => benefit.benefitsId.toString().includes(searchValue))
                      .map(({ benefitsId, cost, description, typeBenefits}) => (
                            <ClientEnteredBenefit
                                key={benefitsId} 
                                benefitId={benefitsId}
                                description={description}
                                typeBenefits={typeBenefits}
                                cost={cost} 
                            />
                      )) : 
                      <div className="w-full flex items-center justify-center h-[500px]">
                        <p className="opacity-[0.5]">Aucun avantage à afficher</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}