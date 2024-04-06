import React, {useState, useEffect} from 'react'
import AdminNavbar from '../components/admins/AdminNavbar';
import { Navigate, useNavigate } from 'react-router-dom';
import Fog from '../components/Fog';
import { IoMdClose } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
import OfferCard from '../components/OfferCard';

export default function AdminVfp() {

  const API_URL = process.env.REACT_APP_API_URL;

  const [addVfpOfferClicked, setAddCategodryClicked] = useState(false);
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
        navigate('/admin/dashboard');
    }
  
    const fetchAdminBenefits = async () => {
      try {
        const response = await fetch(
          `${API_URL}/benefits/user/${34}`
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

    useEffect(() => {
    
      fetchAdminBenefits();
    }, []);

  if (1 == 1) {
  
    function handleAddOfferClicked() {
      setAddCategodryClicked(!addVfpOfferClicked);
    }
  
    const handleOfferSubmit = async (event) => {
      event.preventDefault();
      const response = await fetch(`${API_URL}/benefits/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            cost: fidelityAmount,
            typeBenefits: offerType,
            dateCreation: debutDate,
            dateStart: debutDate,
            description: '*Offre administrateur',
            dateEnd: endDate,
            userId: 30
          }
        )
      });
      
      if (response.ok) {
        const data = await response.json();
        offers.push(data);
        setOfferReponse('L\'offre a été ajoutée avec succès');

      } else {
        setOfferReponse('Erreur lors de la création de l\'offre');
      }
    }

    const parseOfferType = (ofrType) => {
      return ofrType === 'PDP' ? 'Place de parking' : 'Ticket de bus';
    }

    const formatArrayDate =  (dateArray) => {
      const [year, month, day] = dateArray;
      return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }

    return (
      <>
          <Fog elementClicked={addVfpOfferClicked} handleElementClick={handleAddOfferClicked} />
          <div className={addVfpOfferClicked ? "absolute w-full h-full z-40 flex justify-center items-center" : "hidden"} >
            <div className="relative w-[350px] h-[300px] bg-white shadow-my rounded-[10px]">
              <div className="absolute right-0">
                <IoMdClose className="text-[25px] hover:cursor-pointer" onClick={handleAddOfferClicked}/>
              </div>
              <div className="w-[250px] flex flex-col h-full mx-auto justify-center">
                <form onSubmit={handleOfferSubmit} className="p-1">
                  <div className="flex flex-col mb-2">
                    <label className="font-semibold text-[13px] sm:text-[16px] ml-1">
                      Type d'offre
                    </label>
                    <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                      <select name="offerType" value={offerType}
                        onChange={(event) => setOfferType(event.target.value)}
                      required>
                      <option value=""></option>
                      <option value="PDP" className="text-[13px]">Place de parking</option>
                      <option value="TDB" className="text-[13px]">Ticket de bus</option>
                      </select>
                    </div>
                      <label className="font-semibold text-[13px] sm:text-[16px] ml-1">
                        Date de début
                      </label>
                      <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                        <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                          <input
                            type="datetime-local"
                            name="debutDate"
                            value={debutDate}
                            onChange={(event) => setDebutDate(event.target.value)}
                            className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                      <label className="font-semibold text-[13px] sm:text-[16px] ml-1">
                        Date de fin
                      </label>
                      <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                        <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                          <input
                            type="datetime-local"
                            name="endDate"
                            value={endDate}
                            onChange={(event) => setEndDate(event.target.value)}
                            className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                      <label className="font-semibold text-[13px] sm:text-[16px] ml-1">
                        Points de fidelité à assigner
                      </label>
                      <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                        <input
                          type="double"
                          name="fidelityAmount"
                          value={fidelityAmount}
                          onChange={(event) => setFidelityAmount(event.target.value)}
                          className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                          required
                        />
                      </div>
                  </div>
                  <div className="w-full lg:w-[95%] flex flex-col items-center mt-1 mb-3">
                    {offerResponse && (
                      <p className="ml-1 text-green-500 text-[13px]">{offerResponse}</p>
                      )}
                    <button className="text-white bg-[#3C24D1] py-[3px] md:py-[5px] rounded-[5px] font-semibold text-center text-[13px] sm:text-[16px] w-[160px] sm:w-[190px] mt-2 hover:cursor-pointer shadow-md" >Ajouter l'offre</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
         <AdminNavbar /> 
        <div className="flex justify-between w-[96%] mx-auto items-center">
            <div className="w-[95%] mx-auto sm:mt-4 sm:w-[97%] flex justify-between items-center" >
                <MdKeyboardBackspace className="text-[45px] sm:text-[55px] md:text-[65px] hover:cursor-pointer" onClick={goBackToDashboard}/>
            </div>
            <button className="text-white bg-[#3C24D1] py-[3px] md:py-[5px] rounded-[5px] font-semibold text-center text-[12px] sm:text-[16px] md:text-[18px] w-[200px] sm:w-[190px] md:w-[230px] mt-2 hover:cursor-pointer shadow-md md:mr-4 mr-2"onClick={handleAddOfferClicked}>Ajouter une offre VFP</button>      
         </div>
         <div className="flex w-[90%] mx-auto justify-center">
          {offers.length === 0 ? 
          <div className="w-full flex items-center justify-center h-[500px]">
             <p className="opacity-[0.5]">Aucune offre VFP à afficher</p>
          </div> :
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 md:gap-8 sm:gap-6 flex-col mt-6 sm:mt-12">
              {offers.map((offer) => <OfferCard
                offerName={parseOfferType(offer.typeBenefits)}
                startDate={formatArrayDate(offer.dateStart)}
                endDate={formatArrayDate(offer.dateEnd)}
                points={offer.cost}
                offerId={offer.benefitsId}
                handleDeleteOffer={handleDeleteOffer}
                isAdmin={true}
                shopName="Offre administrateur"
              />)}
            </div>
          }
         </div>
      </>
    )    
  }

  return <Navigate to="/admin/login" replace={true} />
}