import React, { useState, useEffect } from 'react';
import { FiPrinter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ClientEnteredOrder({ orderId, totalPrice }) {
    const [orderContent, setOrderContent] = useState([]);
    
  const API_URL = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const fetchOrderContent = async () => {
      try {
        const response = await fetch(`${API_URL}/orderlines?orderId=${orderId}`, {
          credentials: 'include',
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          // Après avoir récupéré le contenu de la commande, récupérez les informations du commerçant pour chaque produit
          const dataWithMerchant = await Promise.all(data.map(async (item) => {
            const merchantResponse = await fetch(`${API_URL}/merchants/${item.merchantId}`, {
              credentials: 'include',
              method: 'GET',
            });

            const merchantData = await merchantResponse.json();
            // Ajoutez le nom du commerçant à l'objet de l'article
            return { ...item, merchantName: merchantData.businessName };
          }));

          setOrderContent(dataWithMerchant);
        } else {
          console.log('fetching order content error : ', response.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrderContent();
  }, [orderId]);
  
  const formatPriceToEuro = (price) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
    };
    
    const hashOrderId = (number) => {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_=.~';
        let result = '';
    
        for (let i = 0; i < 50; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        result += number;
        for (let i = 0; i < 50; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

  return (
    <div className="h-[190px] rounded-[10px] shadow-my mt-4 sm:mt-6">
      <div className="w-[96%] md:w-[98%] mx-auto">
        <div className="flex items-center w-[200px] sm:w-[210px] justify-between pt-1">
          <p className="font-bold sm:text-[20px]">#{orderId}</p>
        </div>
        <div className="h-[120px] flex items-center">
          <div>
            <p className="font-bold text-[13px] sm:text-[15px]">Contenu de la commande :</p>
            <ul>
              {orderContent.map((item, index) => (
                <li key={index} className="text-[12px] sm:text-[15px]">{item.productName} chez {item.merchantName}</li>
              ))}
            </ul>
            <p className="">
              <span className="font-bold">Prix total :</span> {formatPriceToEuro(totalPrice)}
            </p>
          </div>
        </div>
        <div className="relative hover:cursor-pointer">
                <Link to={`/client/orderOK/${hashOrderId(orderId)}/${0}`}><button className="absolute bottom-[-25px] right-[0px] sm:right-[-5px] text-white bg-[#3C24D1] py-[5px] px-[10px] rounded-[5px] font-semibold text-center text-[13px] sm:text-[15px] w-[130px] sm:w-[150px] mt-2 hover:cursor-pointer">Afficher l'itinéraire</button></Link>
        </div>
      </div>
    </div>
  );
}
