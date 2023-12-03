import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ClientNavbar from '../components/clients/ClientNavbar';

export default function ClientDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userData, setUserData] = useState({});

    const API_URL = process.env.REACT_APP_API_URL;

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
    }

    if (isAuthenticated) {
        return (
            <>
                <ClientNavbar user={userData}/>
            </>
        );
    }

    return <Navigate to="/client/login" replace={true} />;
}