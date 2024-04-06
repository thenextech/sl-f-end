import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import MerchantDashNavbar from '../components/merchants/MerchantDashNavbar';
import Chart from 'chart.js/auto';
import { FaSearch } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa';
import { FaArrowUp, FaArrowDown, FaEquals } from 'react-icons/fa';
import { BsCashCoin } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

    const generateInvoiceNumber = (startDate, endDate, userId) => {
        const year = new Date(startDate).getFullYear();
        const month = String(new Date(startDate).getMonth() + 1).padStart(2, '0'); // JS months are 0-indexed
        // const sequenceNumber = getNextSequenceNumber(year, month, userId).toString().padStart(3, '0'); // Example: "001"
        const invoicePrefix = 'INV';

        return `${invoicePrefix}-${year}${month}-${userId}`;
    };


    const handleGeneratePDF = () => {
        const pdf = new jsPDF();

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.setTextColor(33, 37, 41); // Couleur gris foncé
        pdf.text("Facture générée sur Shoploc", 105, 20, { align: 'center' });


        pdf.setFontSize(12);
        pdf.setFont("times", "italic");
        const merchantInfo = `Nom du commerçant : ${merchantData.businessName}\nAdresse du commerçant : ${merchantData.lineAddress1}, ${merchantData.city} (${merchantData.postalCode})\n\n`;
        pdf.text(merchantInfo, 20, 30);

        // Affiche "Numéro de facture :" en texte normal
        pdf.setFont("times", "normal");
        pdf.text("Numéro de facture : ", 20, 50);

        // Calcule la largeur du texte pour positionner correctement le numéro de facture
        const invoiceLabelWidth = pdf.getStringUnitWidth("Numéro de facture : ") * pdf.internal.getFontSize() / pdf.internal.scaleFactor;

        // Génère le numéro de la facture et le met en gras
        const invoiceNumber = generateInvoiceNumber(startDate, endDate, merchantData.userId);
        pdf.setFont("times", "bold"); // Change la police en gras pour le numéro de la facture
        pdf.text(invoiceNumber, 20 + invoiceLabelWidth, 50);


        pdf.line(20, 51, 200, 51);

        pdf.setFont("times", "normal");
        pdf.setFontSize(12);
        pdf.text(`Pour la période du ${startDate} au ${endDate}`, 20, 60);

        // Vérification si statistics est défini et contient les données attendues
        if (statistics && statistics.revenuePerDaysBetweenDates && statistics.revenuePerDaysBetweenDates.length > 0) {
            const columns = ["Date", "Valeur"];
            const rows = statistics.revenuePerDaysBetweenDates.map(([date, value]) => {
                const formattedDate = convertDate(date); // Adaptez cette ligne si le format de la date est différent
                return [formattedDate, `${value} €`];
            });

            pdf.autoTable({
                head: [columns],
                body: rows,
                startY: 70,
                theme: 'striped',
                styles: { font: "courier", fontSize: 11 },
                headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255], fontStyle: 'bold' },
                columnStyles: { 0: { halign: 'left' }, 1: { halign: 'right' } },
            });

            const totalRevenue = statistics.revenuePerDaysBetweenDates.reduce((acc, [_, value]) => acc + value, 0);
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12);
            pdf.text("Total :", 20, pdf.autoTable.previous.finalY + 10);
            pdf.text(`${totalRevenue} €`, 40, pdf.autoTable.previous.finalY + 10);
        } else {
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(12);
            pdf.text("Aucune donnée de chiffre d'affaires disponible par jour.", 20, 70);
        }

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const websiteInfo = `Site web : www.shoploc.com\n© ${currentYear} Shoploc. Tous droits réservés.`;
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(100); // Gris plus clair
        pdf.text(websiteInfo, 20, pdf.internal.pageSize.height - 30);

        pdf.save("facture_shoploc_" + invoiceNumber + ".pdf");
    };

    // Fonction pour convertir la date au format "jj-mm-aaaa"
    function convertDate(dateArray) {
        const [year, month, day] = dateArray;
        return `${day}-${month}-${year}`;
    }


    if (isAuthenticated) {
        return (
            <>
                <MerchantDashNavbar businessName={merchantData.businessName} merchantId={merchantData.userId} />
                <div className="container mx-auto mt-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Tableau de bord</h2>

                        <div className="text-black p-4 bg-white-500 shadow-xl shadow-black-500/50 p-2  mb-2">
                            <div className="flex flex-wrap justify-center items-end gap-4 mb-4">
                                <div className="w-full md:w-auto">
                                    <label htmlFor="startDate" className="block text-sm font-medium">
                                        Date de début :
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="mt-1 p-2 border border-gray-300 rounded-md text-black w-full md:w-auto"
                                    />
                                </div>

                                <div className="w-full md:w-auto">
                                    <label htmlFor="endDate" className="block text-sm font-medium">
                                        Date de fin :
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="mt-1 p-2 border border-gray-300 rounded-md text-black w-full md:w-auto"
                                    />
                                </div>

                                <button
                                    onClick={handleSearch}
                                    type="button"
                                    className="bg-green-500 text-white px-6 py-2 rounded-md self-start md:self-auto"
                                >
                                    <FaSearch size={28} />
                                </button>
                                <button
                                    onClick={handleGeneratePDF}
                                    type="button"
                                    className="bg-red-500 text-white px-6 py-2 rounded-md" alt="Facture"
                                >
                                    <FaFilePdf size={28} />
                                </button>
                            </div>
                        </div>


                        <div className="flex flex-wrap gap-2 justify-center mb-1">
                            {/* Daily Revenue */}
                            <div className="flex flex-col bg-white text-black p-4 shadow-xl rounded-lg mb-8 w-full max-w-xs">
                                <h3 className="text-lg font-semibold mb-2">CA jour</h3>
                                {statistics?.todayRevenue !== undefined && statistics.yesterdayRevenue !== undefined ? (
                                    <div className="flex items-center justify-center">
                                        <b className="mr-2">{statistics.todayRevenue || 0} €</b>
                                        {statistics.todayRevenue !== statistics.yesterdayRevenue ? (
                                            <span className={statistics.todayRevenue > statistics.yesterdayRevenue ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                                                {statistics.todayRevenue > statistics.yesterdayRevenue ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                                                {`${(100 * (statistics.todayRevenue - statistics.yesterdayRevenue) / statistics.yesterdayRevenue).toFixed(2)}% `}
                                                <span>({statistics.todayRevenue > statistics.yesterdayRevenue ? "+" : ""}{(statistics.todayRevenue - statistics.yesterdayRevenue).toFixed(2)} €)</span>
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 flex items-center">
                                                <FaEquals className="mr-1" />
                                                0% (0.00 €)
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-center">0.00€</p>
                                )}
                            </div>

                            {/* Weekly Revenue */}
                            <div className="flex flex-col bg-white text-black p-4 shadow-xl rounded-lg mb-8 w-full max-w-xs">                                <h3 className="text-lg font-semibold mb-2">CA semaine</h3>
                                <div className="flex items-center justify-center">
                                    <b>{statistics.weekRevenue || 0} €</b>
                                    {statistics.weekRevenue !== statistics.lastWeekRevenue ? (
                                        <span className={statistics.weekRevenue > statistics.lastWeekRevenue ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                                            {statistics.weekRevenue > statistics.lastWeekRevenue ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                                            {statistics.lastWeekRevenue === 0 ? "N/A %" : `${((statistics.weekRevenue - statistics.lastWeekRevenue) / statistics.lastWeekRevenue * 100).toFixed(2)}% `}
                                            <span>({statistics.weekRevenue > statistics.lastWeekRevenue ? "+" : ""}{(statistics.weekRevenue - statistics.lastWeekRevenue).toFixed(2)} €)</span>
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 flex items-center">
                                            <FaEquals className="mr-1" />
                                            0% (0.00 €)
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* CA du Mois */}
                            <div className="flex flex-col bg-white text-black p-4 shadow-xl rounded-lg mb-8 w-full max-w-xs">
                                <h3 className="text-lg font-semibold mb-2">CA du mois</h3>
                                <div className="flex items-center justify-center">
                                    <b className="mr-2">{statistics.monthRevenue || 0} €</b>
                                    {statistics.monthRevenue !== statistics.lastMonthRevenue ? (
                                        <span className={statistics.monthRevenue > statistics.lastMonthRevenue ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                                            {statistics.monthRevenue > statistics.lastMonthRevenue ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                                            {/* Correction ici pour le cas où lastMonthRevenue est 0 */}
                                            {statistics.lastMonthRevenue === 0 ? 
                                                (statistics.monthRevenue !== 0 ? "+100%" : "0%") : // Si monthRevenue n'est pas 0 et lastMonthRevenue est 0, afficher 100%
                                                `${((statistics.monthRevenue - statistics.lastMonthRevenue) / statistics.lastMonthRevenue * 100).toFixed(1)}% `
                                            }
                                            <span>({statistics.monthRevenue > statistics.lastMonthRevenue ? "+" : ""}{(statistics.monthRevenue - statistics.lastMonthRevenue).toFixed(2)} €)</span>
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 flex items-center">
                                            <FaEquals className="mr-1" />
                                            0% (0.00 €)
                                        </span>
                                    )}
                                </div>
                            </div>



                            {/* Yearly Revenue */}
                            <div className="flex flex-col bg-white text-black p-4 shadow-xl rounded-lg mb-8 w-full max-w-xs">
                                <h3 className="text-lg font-semibold mb-2">CA année</h3>
                                <div className="flex items-center justify-center">
                                    <b className="mr-2">{statistics.yearRevenue || 0} €</b>
                                    {statistics.yearRevenue !== statistics.lastYearRevenue ? (
                                        <span className={statistics.yearRevenue > statistics.lastYearRevenue ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                                            {statistics.yearRevenue > statistics.lastYearRevenue ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                                            {/* Correction ici pour le cas où lastMonthRevenue est 0 */}
                                            {statistics.lastYearRevenue === 0 ? 
                                                (statistics.yearRevenue !== 0 ? "+100%" : "0%") : // Si monthRevenue n'est pas 0 et lastMonthRevenue est 0, afficher 100%
                                                `${((statistics.yearRevenue - statistics.lastYearRevenue) / statistics.lastYearRevenue * 100).toFixed(1)}% `
                                            }
                                            <span>({statistics.yearRevenue > statistics.lastYearRevenue ? "+" : ""}{(statistics.yearRevenue - statistics.lastYearRevenue).toFixed(2)} €)</span>
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 flex items-center">
                                            <FaEquals className="mr-1" />
                                            0% (0.00 €)
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-wrap gap-2 justify-center mb-1">
                            {/* nombre de commande */}
                            <div className="flex flex-col bg-white text-black p-4 shadow-xl rounded-lg mb-8 w-full max-w-xs">
                                <h3 className="text-lg font-semibold mb-2">Nombre commandes</h3>
                                {statistics?.nbrOrdersBetweenTwoDates !== undefined}
                                <div className="flex items-center justify-center">
                                    <b className="mr-2">{statistics.nbrOrdersBetweenTwoDates || 0} </b>

                                </div>
                            </div>

                            {/* nombre de clients */}
                            <div className="flex flex-col bg-white text-black p-4 shadow-xl rounded-lg mb-8 w-full max-w-xs">
                                <h3 className="text-lg font-semibold mb-2">Nombre clients</h3>
                                {statistics?.nbrDistinctClients !== undefined}
                                <div className="flex items-center justify-center">
                                    <b className="mr-2">{statistics.nbrDistinctClients || 0} </b>
                                </div>
                            </div>

                            {/* nombre de points cumulées */}
                            <div className="flex flex-col bg-white text-black p-4 shadow-xl rounded-lg mb-8 w-full max-w-xs">
                                <h3 className="text-lg font-semibold mb-2">TT points cum.</h3>
                                {statistics?.totalRevenueComplet !== undefined}
                                <div className="flex items-center justify-center">
                                    <b className="mr-2 flex items-center text-black"> {/* Assurez-vous que le texte est visible sur votre fond */}
                                        {Math.trunc(statistics.totalRevenueComplet) || 0}
                                        <BsCashCoin className="ml-1 text-yellow-500" /> {/* Exemple avec jaune, ajustez selon besoin */}
                                    </b>
                                </div>
                            </div>
                            {/* nombre de points cumulées */}
                            <div className="flex flex-col bg-white text-black p-4 shadow-xl rounded-lg mb-8 w-full max-w-xs">
                            <h3 className="text-lg font-semibold mb-2">TT points cum. consommés</h3>
                            {/* Assurez-vous que statistics et statistics.totalRevenueComplet sont définis */}
                            <div className="flex items-center justify-center">
                                <b className="mr-2">
                                    {
                                        statistics && statistics.totalRevenueComplet !== undefined ?
                                        Math.trunc(statistics.totalRevenueComplet * 0.4) : 0
                                    }
                                </b>
                            </div>
                        </div>

                        </div>


                        {/* Top Categories */}
                        {statistics.topCategories &&
                            statistics.topCategories.length > 0 &&
                            statistics.topCategoriesWithRevenue && (
                                <div className="text-black p-4 shadow-2xl rounded-lg mb-4 flex justify-between items-start">
                                    {/* Tableau à gauche */}
                                    <div className="w-1/2 text-center">
                                        <h3 className="text-lg font-semibold mb-2">Top Catégories avec Revenu</h3>
                                        <ul>
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

    {/* Graphique à droite */}
    <div className="w-1/2 flex justify-center">
        <canvas id="topCategoriesChart" width="400" height="200"></canvas>
    </div>
</div>

                            )}

                        {/* Chiffres d'affaires par jour */}
                        <div className="text-black p-4 shadow-2xl p-6 rounded-lg mb-4">
                            <h3 className="text-lg font-semibold mb-2">Chiffres d'affaires par jour</h3>
                            {statistics.revenuePerDaysBetweenDates && statistics.revenuePerDaysBetweenDates.length > 0 ? (
                                <table className="w-full table-auto text-white">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-blue-500 text-center">Date</th>
                                            <th className="px-6 py-3 bg-blue-500 text-center">Valeur</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statistics.revenuePerDaysBetweenDates.map((item, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                                                <td className="px-6 py-4 text-center text-black">{convertDate(item[0])}</td>
                                                <td className="px-6 py-4 text-center text-black">{item[1]} €</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="px-6 py-3 bg-blue-500 text-center">Total</td>
                                            <td className="px-6 py-3 bg-blue-500 text-center">
                                                {statistics.revenuePerDaysBetweenDates.reduce((acc, val) => acc + val[1], 0)} €
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            ) : (
                                <p>Aucune donnée disponible.</p>
                            )}
                        </div>


                        {/* Top Products */}
                        {statistics.topProductsWithRevenue && statistics.topProductsWithRevenue.length > 0 && (
                            <div className="text-black p-4 shadow-2xl p-4 rounded-lg mb-8">
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
// Fonction pour convertir la date au format "jj-mm-aaaa"
function convertDate(dateArray) {
    const [year, month, day] = dateArray;
    return `${day}-${month}-${year}`;
}
export default MerchantDashboard;
