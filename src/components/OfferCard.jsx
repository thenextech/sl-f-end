import { MdDelete } from "react-icons/md";
import FidelityPointBox from "./clients/FidelityPointBox";
import { BsTicketDetailed } from 'react-icons/bs';
import { AiFillLock } from "react-icons/ai";

export default function OfferCard({
    offerName,
    startDate,
    endDate,
    points,
    offerId,
    isAdmin,
    clientPoints,
    shopName,
    takeOfferClicked,
    handleSuspendOffer,
    handleEditOffer,
    handleDeleteOffer
}) {

    const onDeleteClick = () => {
        handleDeleteOffer(offerId);
    };

    const onTakeOfferClick = () => {
        if (clientPoints > points) takeOfferClicked(offerId);
    };
    
    return (
        <div className="h-[310px] sm:h-[340px] md:h-[355px] w-[170px] sm:w-[180px] md:w-[220px]  rounded-[5px] shadow-my">
            <div className="bg-gray-200 w-full h-[120px] rounded-t-[5px] flex justify-center items-center">
                <p className="sm:text-[20px] font-semibold text-gray-500">{offerName}</p>
            </div>
            <div className="relative w-[95%] mx-auto h-[190px]">
            {isAdmin ?
                <MdDelete className="absolute top-1 right-0 text-[20px] hover:cursor-pointer" onClick={onDeleteClick} /> : null}
                <p className="text-[14px] sm:text-[18px] font-semibold">{offerName}</p>
                <p className="text-[12px] sm:text-[14px] opacity-[0.7] text-[#3C24D1]">{shopName == "Offre administrateur" ? shopName : `Chez ${shopName}` }</p>
                <p className="text-[10px] sm:text-[12px] opacity-[0.5]">Du : {startDate}</p>
                <p className="text-[10px] sm:text-[12px] opacity-[0.5]">Au : {endDate}</p>
                <div className={clientPoints > points || isAdmin ? "absolute bottom-[10px] sm:bottom-[-20px] md:bottom-[-35px] w-full h-[40px] bg-black rounded-[50px] mr-1 hover:cursor-pointer" : "absolute bottom-[10px] sm:bottom-[-20px] md:bottom-[-35px] w-full h-[40px] bg-gray-300 rounded-[50px] mr-1"} onClick={onTakeOfferClick}>
                    <div className="h-full w-fit sm:w-fit flex items-center mx-auto justify-between">
                        {clientPoints > points || isAdmin ?
                            <>
                                <p className="text-white text-[12px] sm:text-[15px] font-bold">{points}</p>
                                <BsTicketDetailed className="text-[#ffda05] text-[18px] sm:text-[21px] ml-2" />
                            </> :
                            <>
                                <p className="text-gray-700 text-[12px] sm:text-[15px] font-bold">{points}</p>
                                <AiFillLock className="text-black text-[18px] sm:text-[21px] ml-1" />
                            </>
                        }    
                    </div>
                </div>
            </div>
        </div>
    )
}