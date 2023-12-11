import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import MerchantDashNavbar from '../components/merchants/MerchantDashNavbar'

export default function MerchantDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [merchantData, setMerchantData] = useState({});

    const API_URL = process.env.REACT_APP_API_URL;

    /*const isThereAnActiveSession = async () => {
        try {
            const response = await fetch(`${API_URL}/merchant/dashboard`, {
                credentials: 'include',
                method: 'GET'
            });

            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(true);
                setMerchantData(data.object);
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
    }, []);
    
    if (isAuthenticated === null) {
        return null; 
    }*/
    
    if (isAuthenticated === null) {
        return (
            <>
                <MerchantDashNavbar businessName={merchantData.businessName}/>
                <div className="">
                    <div className="flex items-center justify-end w-[96%] mt-3">
                        <label className="font-bold text-[15px] sm:text-[13px] md:text-[16px] ml-1 mr-2">
                            Mois 
                        </label>
                        <div className="w-[120px] sm:h-[30px] bg-[#ECECEC] font-normal flex items-center justify-center">
                        <select name="postalCode">
                            <option value="Jan">Janvier</option>
                            <option value="Fev">Février</option>
                            <option value="Mar">Mars</option>
                            <option value="Avr">Avril</option>
                            <option value="Mai">Mai</option>
                            <option value="Jun">Juin</option>
                            <option value="Jul">Juillet</option>
                            <option value="Aout">Aout</option>
                            <option value="Sep">Septembre</option>
                            <option value="Oct">Octobre</option>
                            <option value="Novembre">Novembre</option>
                            <option value="Décembre">Décembre</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col w-full lg:w-[85%] md:w-[95%] items-center justify-center md:items-start md:mx-auto md:flex-row md:justify-between mt-8">
                        <div className="w-[350px] md:w-[230px] lg:w-[350px] h-[150px] md:h-[100px] lg:h-[150px] shadow-my rounded-[10px]">
                            <div className="w-[93%] mx-auto flex flex-col justify-between h-full">
                                <h2 className="text-[30px] font-semibold mt-1 md:text-[20px] lg:text-[30px]">Chiffre d'affaires</h2>
                                <h2 className="text-[50px] font-thin mt-1 md:text-[30px] lg:text-[50px]">0,00€</h2>
                            </div>
                        </div>  
                        <div className="md:mt-0 mt-4 w-[350px] h-[250px] md:w-[250px] md:h-[150px] lg:w-[350px] lg:h-[250px] shadow-my rounded-[10px]">
                            <div className="w-[93%] mx-auto flex flex-col justify-between h-full">
                                <h2 className="text-[29px] font-semibold mt-1 md:text-[20px] lg:text-[29px]">Nombre de commandes</h2>
                                <h2 className="text-[90px] font-thin mt-1 md:text-[70px] lg:text-[90px] ">-</h2>
                            </div>
                        </div>
                        <div className="md:mt-0 mt-4 w-[350px] h-[250px] md:w-[250px] md:h-[150px] lg:w-[350px] lg:h-[250px] shadow-my rounded-[10px]">
                            <div className="w-[93%] mx-auto flex flex-col justify-between h-full">
                                <h2 className="text-[29px] font-semibold mt-1 md:text-[20px] lg:text-[29px]">Taux de conversion</h2>
                                <h2 className="text-[90px] font-thin mt-1 md:text-[70px] lg:text-[90px]">-</h2>
                            </div>
                        </div>
                    </div>
        
                </div>
            </>
        )
    }

    return <Navigate to="/merchant/login" replace={true} />;
}
