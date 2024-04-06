import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function NavigationMap( { merchantAdresses }) {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [directions, setDirections] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [watchId, setWatchId] = useState(null);

  const userIcon = {
    url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', // Exemple d'URL pour un marqueur vert
    scaledSize: new window.google.maps.Size(40, 40), // Taille de l'icône
  };

  const startNavigation = () => {
    const id = navigator.geolocation.watchPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        // Ici, vous pouvez également mettre à jour l'itinéraire en temps réel si nécessaire
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  
    setWatchId(id);
  };

  const stopNavigation = () => {
    navigator.geolocation.clearWatch(watchId);
  };

  //const merchantAddresses = [
  //  "Avenue Paul Langevin, Villeneuve-d'Ascq, France, 59650",
  //  "25 Rue de Fives, 59650 Villeneuve-d'Ascq"
  //];

  console.log(merchantAdresses);

  // Utiliser l'effet pour récupérer la position du client
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();

    // Géocoder les adresses
    Promise.all(merchantAdresses.map(address => 
      new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            resolve({
              address,
              location: results[0].geometry.location
            });
          } else {
            reject(new Error(`Failed to geocode address: ${address}, status: ${status}`));
          }
        });
      })
    ))
      .then(geocodedAddresses => {
      trierAdresses(geocodedAddresses, location);
      // Calculer l'itinéraire une fois toutes les adresses géocodées
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route({
        origin: location,
        destination: geocodedAddresses[geocodedAddresses.length - 1].location,
        waypoints: geocodedAddresses.slice(0, -1).map(addr => ({
          location: addr.location,
          stopover: true,
        })),
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Failed to calculate route: ${status}`);
        }
      });
    })
    .catch(error => console.error(error));
  }, [location]);

  const trierAdresses = (adresses, positionUtilisateur) => {
    if (window.google && window.google.maps && window.google.maps.geometry) {
      return adresses.sort((adresseA, adresseB) => {
        const distanceA = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(positionUtilisateur.lat, positionUtilisateur.lng),
          new window.google.maps.LatLng(adresseA.location.lat(), adresseA.location.lng())
        );
        const distanceB = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(positionUtilisateur.lat, positionUtilisateur.lng),
          new window.google.maps.LatLng(adresseB.location.lat(), adresseB.location.lng())
        );
        return distanceA - distanceB;
      });
    } else {
      console.error('API Google Maps non chargée');
      return adresses;
    }
  };
    
    return(
        <div className="mt-4 sm:mt-8 mx-auto rounded-md h-[610px] md:h-[840px] sm:h-[670px] lg:h-[400px] xl:h-[430px] 2xl:h-[630px] bg-gray-200 shadow-my2">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={15}
            >
              {directions && <DirectionsRenderer directions={directions} />}
              {userPosition && <Marker position={userPosition} icon={userIcon}/>}
            </GoogleMap>
            <button onClick={startNavigation} className='text-white bg-[#3C24D1] py-[7px] px-[15px] rounded-[10px] font-regular text-center text-[14px] sm:text-[16px] md:text-[18px] w-[100%] mt-5 hover:cursor-pointer shadow-my2'>Démarrer l'Itinéraire</button>
        </div>
    );
};
