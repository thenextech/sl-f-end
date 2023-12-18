import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ClientNavbar from '../components/clients/ClientNavbar';
import MerchantCard from '../components/merchants/MerchantCard';

export default function ClientDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userData, setUserData] = useState({});
    const [merchants, setMerchants] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;

    const fetchAllMerchants = async () => {
        try {
          const response = await fetch(`${API_URL}/merchants/all`, {
            credentials: 'include',
            method: 'GET',
          });
    
          if (response.ok) {
            const data = await response.json();
            setMerchants(data); 
          } else {
            console.log('Erreur lors de la récupération des commerçants');
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const isThereAnActiveSession = async () => {
        try {
            const response = await fetch(`${API_URL}/client/dashboard`, {
                credentials: 'include',
                method: 'GET'
            });

            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(true);
                setUserData(data.object);
                await fetchAllMerchants();
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
    
    if (isAuthenticated) {
        return null; 
    }

    if (isAuthenticated === null) {
        return (
            <>
                <ClientNavbar user={userData}/>
                <div className="flex justify-center items-center">
                    {merchants.length === 0 ? 
                    <div className="w-full flex items-center justify-center h-[500px]">
                        <p className="opacity-[0.5]">Aucun commerçant à proximité</p>
                    </div> :
                    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 md:gap-8 sm:gap-6 flex flex-col mt-6 sm:mt-8">
                        {merchants.map((merchant) => (
                            <MerchantCard
                                key={merchant.userId}
                                name={merchant.businessName}
                                lineAddress1={merchant.lineAddress1}
                                id={merchant.userId}
                            />
                        ))}
                    </div>
                    }
                </div>               
            </>
        );
    }

    return <Navigate to="/client/login" replace={true} />;
}