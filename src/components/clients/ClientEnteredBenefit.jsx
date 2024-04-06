import React, { useState, useEffect } from 'react';
import { FiPrinter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ClientEnteredBenefit({ benefitId, description, typeBenefits, cost }) {
    
    const API_URL = process.env.REACT_APP_API_URL;
    
    const parseOfferType = (ofrType, productName) => {
        const offerType = {
            'PDP': 'Place de parking',
            'TDB': 'Ticket de bus',
        }

        return offerType[ofrType] || productName;
    }

    const generateRandomCode = (length = 6) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
    }

  return (
    <div className="h-[190px] rounded-[10px] shadow-my mt-4 sm:mt-6">
      <div className="w-[96%] md:w-[98%] mx-auto">
        <div className="flex items-center w-[200px] sm:w-[210px] justify-between pt-1">
          <p className="font-bold sm:text-[20px]">#{benefitId}</p>
        </div>
        <div className="h-[120px] flex items-center">
          <div>
            <p className="font-bold text-[15px] sm:text-[20px] mt-8">Détail de l'avantage :</p>
            <ul>
                <li className="text-[15px] sm:text-[17px]">{`${parseOfferType(typeBenefits, description.split('*')[0])} - ${description.split('*')[1]}`}</li>
                <li className="text-[15px] sm:text-[17px]">Point de fidelités débités : <span className="font-bold">{cost}</span></li>
            </ul>
            <p className="mt-8 sm:mt-6 text-[15px] sm:text-[17px] font-semibold">
                {!description.split('*')[1] == 'Offre administrateur' ? null : <p className="bg-gray-200 rounded-[10px] px-3 py-1">📲 Présentez ce code <span className="text-[#3C24D1] bg-gray-400">KWZKM8</span> à votre commerçant afin de récupérer votre avantage</p> }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
