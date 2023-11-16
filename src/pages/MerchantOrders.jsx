import React, {useState} from 'react'
import MerchantDashNavbar from '../components/merchants/MerchantDashNavbar';
import MerchantEnteredOrder from '../components/merchants/MerchantEnteredOrder';
import { IoMdSearch } from "react-icons/io";

export default function MerchantOrders() {

    const [entrantesClicked, setEntrantesClicked] = useState(true);
    const [approuveesClicked, setApprouveesClicked] = useState(false);
    const [annuleesClicked, setAnnuleesClicked] = useState(false);

    function handleEntrantesClicked() {
        setApprouveesClicked(false);
        setAnnuleesClicked(false);
        setEntrantesClicked(true);
    }

    function handleApprouveesClicked() {
        setApprouveesClicked(true);
        setAnnuleesClicked(false);
        setEntrantesClicked(false);
    }

    function handleAnnuleesClicked() {
        setApprouveesClicked(false);
        setAnnuleesClicked(true);
        setEntrantesClicked(false);
    }

  return (
    <>  
        <MerchantDashNavbar />
        <div className="w-[93%] mx-auto mt-2">
            <div className="sm:flex sm:justify-between">
                <div className="flex w-[250px] sm:w-[270px] md:w-[290px] lg:w-[310px] justify-between">
                    <div className="hover:cursor-pointer" onClick={handleEntrantesClicked}>
                        <p className={entrantesClicked ? "text-[15px] font-bold sm:text-[16px] md:text-[18px] lg:text-[20px] border-b-4 border-black" : "text-[15px] font-bold sm:text-[16px] md:text-[18px] lg:text-[20px]"}>Entrantes</p>
                    </div>
                    <div className="hover:cursor-pointer" onClick={handleApprouveesClicked}>
                        <p className={approuveesClicked ? "text-[15px] font-bold sm:text-[16px] md:text-[18px] lg:text-[20px] border-b-4 border-black" : "text-[15px] font-bold sm:text-[16px] md:text-[18px] lg:text-[20px]"}>Approuvées</p>
                    </div>
                    <div className="hover:cursor-pointer" onClick={handleAnnuleesClicked}>
                        <p className={annuleesClicked ? "text-[15px] font-bold sm:text-[16px] md:text-[18px] lg:text-[20px] border-b-4 border-black" : "text-[15px] font-bold sm:text-[16px] md:text-[18px] lg:text-[20px]" }>Annulées</p>
                    </div>
                </div>
                <div>
                    <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center md:w-[300px] sm:w-[250px] w-full sm:mt-0 mt-4">
                        <div className="pl-2">
                            <IoMdSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Chercher une commande"
                            name="orderSearch"
                            className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]"
                        />
                    </div>
                </div>
            </div>
            <div>
             <MerchantEnteredOrder />
             <MerchantEnteredOrder />
             <MerchantEnteredOrder />
             <MerchantEnteredOrder />
             <MerchantEnteredOrder />
             <MerchantEnteredOrder />
            </div>
        </div>
    </>
  )
}
