import React from 'react'
import ClientNavbar from '../components/clients/ClientNavbar';

export default function ClientDashboard() {
  const queryParams = new URLSearchParams(window.location.search);
    const firstName = queryParams.get('firstName');
    const lastName = queryParams.get('lastName');

    return (
        <>
            <ClientNavbar />
        </>
    );
}
