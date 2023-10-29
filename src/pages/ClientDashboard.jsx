import React from 'react'

export default function ClientDashboard() {
  const queryParams = new URLSearchParams(window.location.search);
    const firstName = queryParams.get('firstName');
    const lastName = queryParams.get('lastName');

    return (
        <div>
            <h2>Bienvenue {firstName} !</h2>
        </div>
    );
}
