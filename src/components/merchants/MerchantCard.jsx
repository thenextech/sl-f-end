import React from 'react'
import { MdDelete } from "react-icons/md";
import { Navigate, useNavigate } from 'react-router-dom';
import ExploreMerchant from '../buttons/ExploreMerchant';

export default function MerchantCard({ name, lineAddress1, lineAddress2, id, clientId}) {
  
  const navigate = useNavigate();

  function showMerchantProducts() {
    navigate(`/client/merchantProducts/${id}/${clientId}`);
  }

  return (
    <div className="h-[280px] w-[340px] sm:w-[300px] md:w-[360px] lg:w-[400px] rounded-[5px] shadow-my2 mb-6 sm:mb-2">
        <div className="bg-gray-200 w-full h-[120px] rounded-t-[5px] flex justify-center items-center">
            <p className="text-[20px] font-semibold text-gray-500">{name}</p>
        </div>
        <div className="relative w-[95%] mx-auto">
          <p className="text-[18px] font-semibold">{name}</p>
          <p className="text-[12px] opacity-[0.5]">{lineAddress1}</p>
          <p className="text-[12px] opacity-[0.5]">{lineAddress2}</p>
          <div className="h-[100px] w-full" onClick={showMerchantProducts}>
            <ExploreMerchant />
          </div>

        </div>
    </div>
  )
}
