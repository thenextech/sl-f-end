import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import MerchantDashNavbar from '../components/merchants/MerchantDashNavbar';
import Chart from 'chart.js/auto';
import { FaSearch } from 'react-icons/fa';

const MerchantDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [merchantData, setMerchantData] = useState({});
    const [statistics, setStatistics] = useState({});
    const [chartInstance, setChartInstance] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const formattedCurrentDate = new Date().toISOString().split('T')[0];

    const API_URL = process.env.REACT_APP_API_URL;

    const isThereAnActiveSession = async () => {
        try {
            const response = await fetch(`${API_URL}/merchant/dashboard`, {
                credentials: 'include',
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                const fetchedMerchantId = data.object.userId;

                if (fetchedMerchantId) {
                    setIsAuthenticated(true);
                    setMerchantData(data.object);
                    return fetchedMerchantId;
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

    const getSalesStatistics = async () => {
        try {
            const merchantId = await isThereAnActiveSession();

            const formattedStartDate = startDate || new Date().toISOString().split('T')[0];
            const formattedEndDate = endDate || new Date().toISOString().split('T')[0];

            const response = await fetch(
                `${API_URL}/merchants/stats?merchantId=${merchantId}&startDate=${formattedStartDate}T00:00:00.000Z&endDate=${formattedEndDate}T00:00:00.000Z`,
                {
                    credentials: 'include',
                    method: 'GET',
                }
            );

            if (response.ok) {
                const data = await response.json();

                // Réinitialiser les graphes et les états
                if (statistics.topCategoriesWithRevenue && chartInstance) {
                    chartInstance.destroy();
                    setChartInstance(null);
                }

                const chartLabels = data.topCategoriesWithRevenue.map(item => item.category);
                const chartDataValues = data.topCategoriesWithRevenue.map(item => item.revenue);

                const ctx = document.getElementById('topCategoriesChart');

                if (ctx) {
                    const newChartInstance = new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: chartLabels,
                            datasets: [
                                {
                                    data: chartDataValues,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.7)',
                                        'rgba(54, 162, 235, 0.7)',
                                        'rgba(255, 206, 86, 0.7)',
                                        'rgba(75, 192, 192, 0.7)',
                                        'rgba(153, 102, 255, 0.7)',
                                    ],
                                },
                            ],
                        },
                        options: {
                            responsive: false,
                            maintainAspectRatio: false,
                        },
                    });

                    setChartInstance(newChartInstance);
                }

                setStatistics(data);
            } else {
                console.error('Error fetching statistics:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSearch = () => {
        getSalesStatistics();
    };

    useEffect(() => {
        const checkSession = async () => {
            await isThereAnActiveSession();
            if (isAuthenticated) {
                await getSalesStatistics();
            }
        };

        checkSession();
    }, [isAuthenticated, startDate, endDate]);


    if (isAuthenticated === null) {
        return null;
    }

    if (isAuthenticated) {
        return (
            <>
                <MerchantDashNavbar businessName={merchantData.businessName} />
                <div className="container mx-auto mt-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Tableau de bord</h2>

                        <div className="bg-gray-800 text-white p-4 rounded-lg mb-4 ">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-col md:flex-row md:space-x-2">
                                    <div>
                                        <label htmlFor="startDate" className="block text-sm font-medium text-white">
                                            Date de début :
                                        </label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="mt-1 p-2 border border-gray-300 rounded-md text-black"
                                        />
                                    </div>

                                    <div className="mt-4 md:mt-0">
                                        <label htmlFor="endDate" className="block text-sm font-medium text-white">
                                            Date de fin :
                                        </label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="mt-1 p-2 border border-gray-300 rounded-md text-black"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        type="button"
                                        className="bg-green-500 text-white px-6 py-2 rounded-md mt-4 md:mt-0 md:ml-auto md:self-end"
                                    >
                                        <FaSearch size={20} />
                                    </button>
                                </div>


                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-3 place-content-center">
                            {/* Monthly Revenue */}
                            {statistics.monthlyRevenue !== undefined && (
                                <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 bg-gray-800 text-white p-4 rounded-lg mb-8">
                                    <h3 className="text-lg font-semibold mb-2">Chiffre d'affaires mensuel</h3>
                                    <p>{statistics.monthlyRevenue} €</p>
                                </div>
                            )}

                            {/* Daily Revenue */}
                            <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 bg-gray-800 text-white p-4 rounded-lg mb-8">
                                <h3 className="text-lg font-semibold mb-2">Chiffre d'affaires du jour</h3>
                                {statistics.dailyRevenue && Object.keys(statistics.dailyRevenue).length > 0 ? (
                                    <div>
                                        <b>{statistics.dailyRevenue[formattedCurrentDate] || 0} €</b>
                                    </div>
                                ) : (
                                    <p>Aucune donnée de chiffre d'affaires disponible pour aujourd'hui.</p>
                                )}
                            </div>

                            {/* Yearly Revenue */}
                            {statistics.yearlyRevenue !== undefined && (
                                <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 bg-gray-800 text-white p-4 rounded-lg mb-8">
                                    <h3 className="text-lg font-semibold mb-2">Chiffre d'affaires annuel</h3>
                                    <p>{statistics.yearlyRevenue} €</p>
                                </div>
                            )}
                        </div>


                        {/* Top Categories */}
                        {statistics.topCategories &&
                            statistics.topCategories.length > 0 &&
                            statistics.topCategoriesWithRevenue && (
                                <div className="bg-gray-800 text-white p-4 rounded-lg mb-4 text-center">
                                    <h3 className="text-lg font-semibold mb-2">Top Catégories avec Revenu</h3>
                                    <canvas id="topCategoriesChart" className="mx-auto" width="400" height="200"></canvas>
                                    <ul className="text-center">
                                        {statistics.topCategoriesWithRevenue
                                            .sort((a, b) => b.revenue - a.revenue)
                                            .map((item, index) => (
                                                <li
                                                    key={index}
                                                    className={index % 2 === 0 ? 'bg-gray-200 text-black' : 'bg-white text-black'}
                                                >{`${item.category} : ${item.revenue} €`}</li>
                                            ))}
                                    </ul>
                                </div>
                            )}

                        {/* Chiffres d'affaires par jour */}
                        <div className="bg-gray-800 text-white p-6 rounded-lg mb-4">
                            <h3 className="text-lg font-semibold mb-2">Chiffres d'affaires par jour</h3>
                            {statistics.dailyRevenue && Object.keys(statistics.dailyRevenue).length > 0 ? (
                                <table className="w-full table-auto text-white">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-blue-500 text-center">Date</th>
                                            <th className="px-6 py-3 bg-blue-500 text-center">Valeur</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(statistics.dailyRevenue).map(([date, value], index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                                                <td className="px-6 py-4 text-center text-black">{date}</td>
                                                <td className="px-6 py-4 text-center text-black">{value} €</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="px-6 py-3 bg-blue-500 text-center">Total</td>
                                            <td className="px-6 py-3 bg-blue-500 text-center">
                                                {Object.values(statistics.dailyRevenue).reduce((acc, val) => acc + val, 0)} €
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            ) : (
                                <p>Aucune donnée de chiffre d'affaires disponible par jour.</p>
                            )}
                        </div>

                        {/* Top Products */}
                        {statistics.topProductsWithRevenue && statistics.topProductsWithRevenue.length > 0 && (
                            <div className="bg-gray-800 text-white p-4 rounded-lg mb-8">
                                <h3 className="text-lg font-semibold mb-2">Produits populaires</h3>
                                <table className="w-full table-auto text-white">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-blue-500 text-center">Produit</th>
                                            <th className="px-6 py-3 bg-blue-500 text-center">Revenu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statistics.topProductsWithRevenue
                                            .sort((a, b) => b.revenue - a.revenue)
                                            .map((item, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                                                    <td className="px-6 py-4 text-center text-black">{item.product}</td>
                                                    <td className="px-6 py-4 text-center text-black">{item.revenue} €</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="px-6 py-3 bg-blue-500 text-center">Total</td>
                                            <td className="px-6 py-3 bg-blue-500 text-center">
                                                {statistics.topProductsWithRevenue.reduce((acc, val) => acc + val.revenue, 0)} €
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

            </>
        );
    }

    return <Navigate to="/merchant/login" replace={true} />;
};

export default MerchantDashboard;
