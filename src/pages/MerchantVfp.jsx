import React, {useState, useEffect} from 'react'
import AdminNavbar from '../components/admins/AdminNavbar';
import { Navigate, useNavigate } from 'react-router-dom';
import Fog from '../components/Fog';
import { IoMdClose } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
import OfferCard from '../components/OfferCard';
import MerchantDashNavbar from '../components/merchants/MerchantDashNavbar';

export default function MerchantVfp() {

  const API_URL = process.env.REACT_APP_API_URL;
  
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [merchantData, setMerchantData] = useState({});

  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [categoryName, setCategoryName] = useState(null);
  const [categoryResponse, setCategoryResponse] = useState(null);

  // Offer attributes
  const [fidelityAmount, setFidelityAmount] = useState(null);
  const [debutDate, setDebutDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [offerType, setOfferType] = useState("");
  const [offerResponse, setOfferReponse] = useState(null);

    const navigate = useNavigate();
    
    function goBackToDashboard() {
        navigate('/merchant/dashboard');
    }
  
    const fetchMerchantBenefits = async (merchantId) => {
      try {
        const response = await fetch(
          `${API_URL}/benefits/user/${merchantId}`
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
  
    const handleDeleteOffer = async (offerId) => {
      try {
        const response = await fetch(`${API_URL}/benefits/${offerId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
    
        if (response.ok) {
          setOffers((prevOffer) => prevOffer.filter((offer) => offer.benefitsId !== offerId));
          console.log('L\'offre a été supprimée avec succès.');
        } else {
          console.error('Erreur lors de la suppression de l\'offre.');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

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

    useEffect(() => {
    
        isThereAnActiveSession();
    }, []);

    useEffect(() => {

        fetchMerchantBenefits(merchantData.userId)
    }, [merchantData]);

    if (!isAuthenticated) {
        return <p>Chargement...</p>
    }

    if (isAuthenticated) {

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

    return (
      <>
            <MerchantDashNavbar businessName={merchantData.businessName}  />
        <div className="flex justify-between w-[96%] mx-auto items-center">
            <div className="w-[95%] mx-auto sm:mt-4 sm:w-[97%] flex justify-between items-center" >
                <MdKeyboardBackspace className="text-[45px] sm:text-[55px] md:text-[65px] hover:cursor-pointer" onClick={goBackToDashboard}/>
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
                offerId={offer.benefitsId}
                handleDeleteOffer={handleDeleteOffer}
                shopName={offer.description.split('*')[1]}
                isAdmin={true}
              />)}
            </div>
          }
         </div>
      </>
    )    
  }

  return <Navigate to="/admin/login" replace={true} />
}