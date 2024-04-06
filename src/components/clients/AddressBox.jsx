import React, { useState } from 'react'
import { useEffect } from 'react';
import { FaLocationDot } from 'react-icons/fa6'

export default function AddressBox() {

  const [location, setLocation] = useState('');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        const geocoder = new window.google.maps.Geocoder();
        const latlng = {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        };
        
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              setLocation(results[0].formatted_address);
            } else {
              console.log("Aucun résultat trouvé");
            }
          } else {
            console.log("Le géocodage a échoué en raison de : " + status);
          }
        });
      });
    }
  }, []);

  return (
    <div className="hidden sm:block bg-gray-200 w-[170px] h-[40px] ml-4 sm:ml-8 sm:w-[240px] md:w-[350px] rounded-[50px]">
      <div className="flex items-center w-[90%] h-full mx-auto overflow-hidden">
        <FaLocationDot className="sm:text-[20px]"/>
        <p className="text-[12px] sm:text-[15px] ml-1 md:ml-2 truncate">{location}</p> 
      </div>
    </div>
  )
}
