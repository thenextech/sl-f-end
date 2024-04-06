import React, { useEffect, useState, useRef } from 'react';
import AdminNavbar from '../components/admins/AdminNavbar';

export default function AdminDashboard() {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(null);
    const [fetchComplete, setFetchComplete] = useState(false);
    const [merchants, setMerchants] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedSection, setSelectedSection] = useState('merchants');
    const tableRef = useRef(null);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchAllMerchants = async () => {
            try {
                const merchantsResponse = await fetch(`${API_URL}/merchants/all`, {
                    credentials: 'include',
                    method: 'GET',
                });

                if (merchantsResponse.ok) {
                    const merchantsData = await merchantsResponse.json();
                    setMerchants(merchantsData);
                    setFetchComplete(true);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllClients = async () => {
            try {
                const clientsReponse = await fetch(`${API_URL}/clients/all`, {
                    credentials: 'include',
                    method: 'GET',
                });

                if (clientsReponse.ok) {
                    const clientsData = await clientsReponse.json();
                    setClients(clientsData);
                    setFetchComplete(true);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (loading && !fetchComplete) {
            fetchAllMerchants();
            fetchAllClients();
        }
    }, [loading, fetchComplete]);

    /*useEffect(() => {
        let dataTable = null;

        if (fetchComplete) {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                dataTable = $(tableRef.current).DataTable();
                dataTable.destroy(); 
            }
            $(tableRef.current).DataTable({
                responsive: true,
                language: {
                    url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json' // Utilisation de la traduction en français
                }
            });
        }
    }, [fetchComplete]);*/

    const handleStatusChange = async (id, newStatus, section) => {
        console.log(id);
        if (section === 'merchants') {

            const merchant = merchants.find((merchant) => merchant.userId === id);

            const { userId, ...updatedMerchant } = merchant;

            updatedMerchant.status = newStatus;
            
            try {
                const response = await fetch(`${API_URL}/merchants/${id}`, {
                    credentials: 'include',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedMerchant),
                });
    
                if (!response.ok) {
                    setErrorMessage('Error saving modifications.');
                    return;
                } else {
                    setMerchants((prevMerchants) =>
                        prevMerchants.map((merchant) =>
                            merchant.userId === id ? { ...updatedMerchant, userId: merchant.userId }  : merchant
                    ));
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('Erreur lors du changement de statut du commerçant : ', merchant.businessName);
            }

        } else if (section === 'clients') {
    
            const retrievedClient = clients.find((client) => client.userId === id);

            const { userId, ...updatedClientz } = retrievedClient;

            const updatedClient = {...retrievedClient, status: newStatus}
            
            try {
                const response = await fetch(`${API_URL}/clients/${id}`, {
                    credentials: 'include',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedClient),
                });
    
                if (!response.ok) {
                    setErrorMessage('Error saving modifications.');
                    return;
                } else {
                    setClients((prevClients) =>
                        prevClients.map((client) =>
                            client.userId === id ? updatedClient : client
                    ));
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('Erreur lors du changement de statut du client');
            }
        }
    };

    if (fetchComplete) {
        return (
            <>
                <AdminNavbar />
        <div className="container mx-auto w-[95%]">
                    <div className="text-xl font-bold mt-2 mb-2 text-center">Gestion des profils</div>
                    <div className="flex items-center">
                    <div className={selectedSection === 'merchants' ? "flex flex-col lg:flex-row lg:items-center lg:justify-between border-b-2" : "flex flex-col lg:flex-row lg:items-center lg:justify-between"}>
                            <div className="text-l font-bold mr-2 space-x-2 mb-4 lg:mb-0">
                                <button
                                    className="py-2 px-4 rounded-md"
                                    type="button"
                                    onClick={() => setSelectedSection('merchants')}
                                >
                                    Gestion des commerçants
                                </button>
                            </div>

                            {successMessage && <p className="text-green-500">{successMessage}</p>}
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        </div>
                        <div className={selectedSection === 'clients' ? "flex flex-col lg:flex-row lg:items-center lg:justify-between border-b-2" : "flex flex-col lg:flex-row lg:items-center lg:justify-between"}>
                            <div className="text-l font-bold mr-2 space-x-2 mb-4 lg:mb-0">
                                <button
                                    className="py-2 px-4 rounded-md"
                                    type="button"
                                    onClick={() => setSelectedSection('clients')}
                                >
                                    Gestion des clients
                                </button>
                            </div>

                            {successMessage && <p className="text-green-500">{successMessage}</p>}
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        </div>

                        
                    </div>
                    
                    {selectedSection === 'merchants' && (
                        <>
                            <div className="mt-10 overflow-x-auto">
                            <table
                                ref={tableRef}
                                className="min-w-full bg-white border border-gray-300"
                            >
                                 <thead>
                                    <tr className="border-2">
                                        <th className="border-2">Nom commerce</th>
                                        <th className="border-2">Email</th>
                                        <th className="border-2">Status</th>
                                        <th className="border-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {merchants.map((merchant) => (
                                        <tr key={merchant.userId}>
                                        <td className="border-2 text-center">{merchant.businessName}</td>
                                        <td className="border-2 text-center">{merchant.email}</td>
                                            <td className="border-2 text-center">{merchant.status}</td>
                                            <td className="py-2 px-4 border-2 text-center">
                                                <button
                                                    disabled={merchant.status === 'ACTIVE'}
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            merchant.userId,
                                                            'ACTIVE',
                                                            'merchants'
                                                        )
                                                    }
                                                    className={merchant.status === 'ACTIVE' ? "bg-green-200 text-white py-1 px-2 rounded" : "bg-green-500 text-white py-1 px-2 rounded"}
                                                >
                                                    Activer
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            merchant.userId,
                                                            'INACTIVE',
                                                            'merchants'
                                                        )
                                                    }
                                                    className={merchant.status === 'INACTIVE' ? "bg-red-200 text-white py-1 px-2 rounded ml-2 disabled" : "bg-red-500 text-white py-1 px-2 rounded ml-2"}
                                                >
                                                    Desactiver
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </>
                    )}
                    
                    {selectedSection === 'clients' && (
                        <>
                            <div className="mt-10 overflow-x-auto">
                            <table
                                ref={tableRef}
                                className="min-w-full bg-white border border-gray-300"
                            >
                                 <thead>
                                    <tr className="border-2">
                                        <th className="border-2">Nom client</th>
                                        <th className="border-2">Email</th>
                                        <th className="border-2">Status</th>
                                        <th className="border-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((client) => (
                                        <tr key={client.userId}>
                                        <td className="border-2 text-center">{client.firstName} {client.lastName}</td>
                                        <td className="border-2 text-center">{client.email}</td>
                                        <td className="border-2 text-center font-bold">{client.status}</td>
                                            <td className="py-2 px-4 border-2 text-center">
                                                <button
                                                    disabled={client.status === 'ACTIVE'}
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            client.userId,
                                                            'ACTIVE',
                                                            'clients'
                                                        )
                                                    }
                                                    className={client.status === 'ACTIVE' ? "bg-green-200 text-white py-1 px-2 rounded" : "bg-green-500 text-white py-1 px-2 rounded"}
                                                >
                                                    Activer
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            client.userId,
                                                            'INACTIVE',
                                                            'clients'
                                                        )
                                                    }
                                                    className={client.status === 'INACTIVE' ? "bg-red-200 text-white py-1 px-2 rounded ml-2 disabled" : "bg-red-500 text-white py-1 px-2 rounded ml-2"}
                                                >
                                                    Deactiver
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </>
                    )}
                </div>
            </>
        );
    }

    return <p>Chargement...</p>;
}
