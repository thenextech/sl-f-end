import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import ClientNavbar from '../components/clients/ClientNavbar';

export default function ClientDashboard() {

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const isThereAnActiveSession = async () => {
        try {
            const response = await fetch('http://localhost:8080/client/dashboard', {
                method: 'GET'
            })
            console.log(response.ok)
            if (response.ok) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect( () => {
        isThereAnActiveSession();
    }, [])
    


    return (
        isAuthenticated ? (
            <ClientNavbar />
        ) : (
            <Navigate to="/client/login" replace={true} />
        )
    );
}
