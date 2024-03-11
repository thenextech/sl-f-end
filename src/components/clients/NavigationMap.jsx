import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%', // This will make the map take the full height of the parent div
};

export default function NavigationMap() {
    const [location, setLocation] = useState({
        lat: 0, 
        lng: 0,
    });
      
    useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            function (error) {
              console.error("Erreur lors de l'obtention de la position : ", error);
            }
          );
        }
    }, []);
    

    return(
        <div className="mt-4 sm:mt-8 mx-auto rounded-md h-[680px] md:h-[840px] sm:h-[670px] lg:h-[400px] xl:h-[430px] 2xl:h-[630px] bg-gray-200 shadow-my2">
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={location}
                    zoom={15}
                >
                    <Marker position={location} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};
