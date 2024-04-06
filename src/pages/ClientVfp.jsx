import OfferCard from "../components/OfferCard";
import ClientNavbar from "../components/clients/ClientNavbar";
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import React, { useState, useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import Fog from '../components/Fog';


export default function ClientVfp( { userId }) {

    const API_URL = process.env.REACT_APP_API_URL;

    const [offers, setOffers] = useState([]);
    const [clientLoyaltyCard, setClientLoyaltyCard] = useState([]);
    const [userData, setUserData] = useState({});
    const [error, setErrors] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [takeOfferClicked, setTakeOfferClicked] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [offerTakeOk, setOfferTakeOk] = useState(false);

    const navigate = useNavigate();

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

    const fetchClientLoyaltyCard = async (clientId) => {
        try {
          const response = await fetch(`${API_URL}/loyaltyCards/all`, {
            credentials: 'include',
            method: 'GET'
          });
          
          if (response.ok) {
            const data = response.json();
            data.then(array => array.map(elt => {
              if (elt.userId === clientId) {
                setClientLoyaltyCard(elt);
                console.log(elt);
              }
            }));
          } else {
            const error = response.json();
            console.log('error :', error);
          }
        } catch {
          console.error('Error:', error);
          setIsAuthenticated(false); 
        }
    }

    const submitOfferTake = async () => {
        const response = await fetch(`${API_URL}/benefitsclients/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                status: 'READY',
                benefitsId: selectedOffer.benefitsId,
                clientId: userData.userId,
                dateCreation: new Date().toISOString().split('.')[0]
              }
            )
        });
          
        if (response.ok) {
            console.log('Offre ajoutée avec succès');
            await updateClientVfpPoints(userData.userId);
            setOfferTakeOk(true);
        } else {
            console.log('Erreur lors de la création du benefitsClient');
        }
    }

    const updateClientVfpPoints = async (clientId) => {
        try {
            const response = await fetch(`${API_URL}/loyaltyCards/change-points`, {
                credentials: 'include',
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: clientId,
                    points: -1 * selectedOffer.cost
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                console.log('Points de fidelité modifiés avec succès');
            } else {
                const error = await response.json();
                console.log('error ', error);
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
    
    const fetchAllOffers = async () => {
        try {
          const response = await fetch(
            `${API_URL}/benefits/all`
          );
  
          if (response.ok) {
            const data = await response.json();
            setOffers((prevBenefits) => [...prevBenefits, ...data]);
          } else {
            console.log(`Aucune offre n'a été trouvée`);
          }
        } catch (error) {
          console.error(`Erreur à la récupération des offres:`, error);
        }
    };

    const parseOfferType = (ofrType, productName) => {
        const offerType = {
            'PDP': 'Place de parking',
            'TDB': 'Ticket de bus',
        }

        return offerType[ofrType] || productName;
    }
  
    const formatArrayDate =  (dateArray) => {
        const [year, month, day] = dateArray;
        return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }

    function goBackToDashboard() {
        navigate('/client/dashboard');
    }

    const handleTakeOfferClicked = (offerId) => {
        setTakeOfferClicked(!takeOfferClicked);
        const foundOffer = offers.find(offer => offer.benefitsId === offerId);
        setSelectedOffer(foundOffer);
    }

    useEffect(() => {
    
        fetchAllOffers();
    }, []);
    
    useEffect(() => {
        const getUserLoyaltyCard = async () => {
            await fetchClientLoyaltyCard(userData.userId);
        }

        getUserLoyaltyCard();
    }, [userData]);

    useEffect(() => {
    }, [selectedOffer]);


    return (
        <>  
            <Fog elementClicked={takeOfferClicked} handleElementClick={handleTakeOfferClicked} />
            <div className={takeOfferClicked ? "absolute w-full h-full z-40 flex justify-center items-center" : "hidden"} >
                <div className="relative w-[370px] sm:w-[400px] h-[150px] bg-white shadow-my rounded-[10px]">
                    <div className="absolute right-0">
                        <IoMdClose className="text-[25px] hover:cursor-pointer" onClick={handleTakeOfferClicked}/>
                    </div>
                    <div className="h-full w-[80%] mx-auto mt-4">
                        {
                            offerTakeOk ?
                                <>
                                    <p className='text-center font-semibold'>Avantage récupéré avec succès. Allez dans la rubrique Avantages récupérés pour en avoir tout le détail.</p>
                                    <div className="flex items-end justify-end">
                                        <button className="text-white bg-[#3C24D1] py-[5px] px-[13px] rounded-[5px] font-semibold text-center text-[12px] sm:text-[14px] w-[120px] mt-4 hover:cursor-pointer" onClick={handleTakeOfferClicked}>Trop bien !</button>
                                    </div>
                                </> :
                                <>
                                    <p className='text-center font-semibold'>{selectedOffer ? `Êtes vous sur de prendre cet avantage ? ${selectedOffer.cost} points de fidelités vont vous être débités` : null}</p>
                                    <div className="flex items-end justify-end mt-4">
                                        <p className="text-black text-[15px] font-semibold mr-4 hover:cursor-pointer border-b-2 border-black" onClick={handleTakeOfferClicked}>Annuler</p>
                                        <button className="text-white bg-[#3C24D1] py-[5px] px-[13px] rounded-[5px] font-semibold text-center text-[12px] sm:text-[14px] w-[120px] mt-4 hover:cursor-pointer" onClick={submitOfferTake}>Confirmer</button>
                                    </div>
                                </>
                        }
                    </div>
                   
                </div>
            </div>
            <ClientNavbar />
            <div className="flex justify-between w-[96%] mx-auto items-center">
                <div className="w-[95%] mx-auto sm:mt-4 sm:w-[97%] flex justify-between items-center sm:items-start" >
                    <MdKeyboardBackspace className="text-[45px] sm:text-[55px] md:text-[65px] hover:cursor-pointer" onClick={goBackToDashboard} />
                    <p className="text-[12px] sm:text-[15px] w-[80%] text-center mx-auto sm:mt-6 font-semibold">🔥 Ci-dessous toutes les <span className="text-[#3C24D1] font-bold">offres</span> du moment ! </p>
                </div>
            </div>
            
            <div className="flex w-[90%] mx-auto justify-center">
                {offers.length === 0 ? 
                    <div className="w-full flex items-center justify-center h-[500px]">
                        <p className="opacity-[0.5]">Aucune offre VFP à afficher</p>
                    </div> :
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 md:gap-8 sm:gap-6 flex-col mt-6 sm:mt-12">
                        {offers.map((offer) => <OfferCard
                            offerName={parseOfferType(offer.typeBenefits, offer.description.split('*')[0])}
                            startDate={formatArrayDate(offer.dateStart)}
                            endDate={formatArrayDate(offer.dateEnd)}
                            points={offer.cost}
                            isAdmin={false}
                            offerId={offer.benefitsId}
                            clientPoints={clientLoyaltyCard.points}
                            shopName={offer.description.split('*')[1]}
                            takeOfferClicked={handleTakeOfferClicked}
                        />)}
                    </div>
                }
            </div>
            
        </>
        
    )
}