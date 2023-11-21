import React, { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import ClientNavbar from '../components/clients/ClientNavbar';
import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

export default function AdminDashboard() {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(null);
    const [fetchComplete, setFetchComplete] = useState(false);
    const [merchants, setMerchants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedSection, setSelectedSection] = useState('merchants');
    const tableRef = useRef(null);

    useEffect(() => {
        const isAdminSessionActive = async () => {
            try {
                const response = await fetch('http://localhost:8080/admin/dashboard', {
                    credentials: 'include',
                    method: 'GET',
                });

                if (response.ok) {
                    setIsAdminAuthenticated(true);
                } else {
                    setIsAdminAuthenticated(false);
                }
            } catch (error) {
                console.error('Error:', error);
                setIsAdminAuthenticated(false);
            }
        };

        isAdminSessionActive();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const merchantsResponse = await fetch('http://localhost:8080/merchants/all', {
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

        if (loading && !fetchComplete) {
            fetchData();
        }
    }, [loading, fetchComplete]);

    useEffect(() => {
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
    }, [fetchComplete]);

    const handleStatusChange = (id, newStatus, section) => {
        if (section === 'merchants') {
            setMerchants((prevMerchants) =>
                prevMerchants.map((merchant) =>
                    merchant.id === id ? { ...merchant, status: newStatus, isModified: true } : merchant
                )
            );
        }
    };

    const handleSaveAll = async () => {
        const modifiedMerchants = merchants.filter((merchant) => merchant.isModified);

        const allModifiedData = [...modifiedMerchants];

        try {
            for (const data of allModifiedData) {
                const updatedData = {};
                for (const key in data) {
                    if (data.hasOwnProperty(key) && key !== 'id' && key !== 'isModified') {
                        updatedData[key] = data[key];
                    }
                }
    
                const response = await fetch(`http://localhost:8080/merchants/${data.id}`, {
                    credentials: 'include',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                });
    
                if (!response.ok) {
                    setErrorMessage('Error saving modifications.');
                    return;
                }
            }
    
            setSuccessMessage('Toutes les modifications ont été enregistrées avec succès.');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Erreur lors enregistrement des modifications.');
        }
    };


    if (isAdminAuthenticated === null) {
        return <p>Vérification de l'authentification...</p>;
    }

    if (isAdminAuthenticated === false) {
        return <Navigate to="/admin/login" replace={true} />;
    }

    if (fetchComplete) {
        return (
            <>
                <ClientNavbar />
                <div className="container mx-auto">
                    <div className="text-xl font-bold mt-2 mb-2">Gestion des profils</div>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
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
                    <button onClick={handleSaveAll} className="mt-2 text-center rounded-[50px] bg-[#3C24D1] py-2 px-2 text-white text-[10px] sm:text-[13px] text-[15px]">
                        Enregistrer 
                    </button>
                    {selectedSection === 'merchants' && (
                        <div className="mt-2 overflow-x-auto">
                            <table
                                ref={tableRef}
                                className="min-w-full bg-white border border-gray-300"
                            >
                                 <thead>
                                    <tr>
                                    <th className="border-b">ID</th>
                                    <th className="border-b">Nom commerce</th>
                                    <th className="border-b">First Name</th>
                                    <th className="border-b">Email</th>
                                    <th className="border-b">Status</th>
                                    <th className="border-b">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {merchants.map((merchant) => (
                                        <tr key={merchant.id}>
                                            <td className="border-b">{merchant.id}</td>
                                        <td className="border-b">{merchant.businessName}</td>
                                        <td className="border-b">{merchant.firstName}</td>
                                        <td className="border-b">{merchant.email}</td>
                                        <td className="border-b">
                                                <select
                                                    value={merchant.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            merchant.id,
                                                            e.target.value,
                                                            'merchants'
                                                        )
                                                    }
                                                    className="bg-blue-100 border rounded py-1 px-2"
                                                >
                                                    <option value="ACTIVE">ACTIVE</option>
                                                    <option value="INACTIVE">INACTIVE</option>
                                                    <option value="BLOCKED">BLOCKED</option>
                                                    <option value="DELETED">DELETED</option>
                                                </select>
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            merchant.id,
                                                            'ACTIVE',
                                                            'merchants'
                                                        )
                                                    }
                                                    className="bg-green-500 text-white py-1 px-2 rounded"
                                                >
                                                    Activate
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            merchant.id,
                                                            'INACTIVE',
                                                            'merchants'
                                                        )
                                                    }
                                                    className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                                                >
                                                    Deactivate
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    
                </div>
            </>
        );
    }

    return <p>Chargement...</p>;
}
