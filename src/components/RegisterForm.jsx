import React, { useState } from "react";


export default function RegisterForm() {
    const [companyName, setCompanyName] = useState("");
    const [representative, setRepresentative] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
    };
  
    return (
      <form onSubmit={handleSubmit} className="p-1">
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] ml-1">
            Nom de la société*
          </label>
          <div className="h-[25px] w-[65%] bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center">
            <input
              type="text"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              required
              className="bg-[#ECECEC] rounded-[50px] text-[10px] ml-2 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] ml-1">
            Représentant de la société*
          </label>
          <div className="h-[25px] w-[65%] bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center">
            <input
              type="text"
              value={representative}
              onChange={(event) => setRepresentative(event.target.value)}
              required
              className="bg-[#ECECEC] rounded-[50px] text-[10px] ml-2 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] ml-1">
            Adresse ligne 1
          </label>
          <div className="h-[25px] w-[65%] bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center">
          <input
            type="text"
            value={address1}
            onChange={(event) => setAddress1(event.target.value)}
            className="bg-[#ECECEC] rounded-[50px] text-[10px] ml-2 focus:outline-none"
          />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] ml-1">
            Adresse ligne 2
          </label>
          <div className="h-[25px] w-[65%] bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center">
          <input
            type="text"
            value={address2}
            onChange={(event) => setAddress2(event.target.value)}
            className="bg-[#ECECEC] rounded-[50px] text-[10px] ml-2 focus:outline-none"
          />
          </div>
          
        </div>
        <div className="flex justify-between w-[65%] mb-3">
          <div className="flex flex-col w-[55%]">
            <label className="font-bold text-[11px] ml-1">
              Ville
            </label>
            <div className="h-[25px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="bg-[#ECECEC] rounded-[50px] text-[10px] ml-2 focus:outline-none w-full"
              />
            </div>
          </div>
          <div className="flex flex-col w-[40%]">
            <label className="font-bold text-[11px] ml-1">
              Code postal
            </label>
            <div className="h-[25px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
              <input
              type="text"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              className="bg-[#ECECEC] rounded-[50px] text-[10px] ml-2 w-full focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(event) => setAcceptTerms(event.target.checked)}
            required
            className="border-none"
          />
          <p className="font-bold text-[9px] ml-1">J'accepte les conditions générales d'utilisation*</p>
        </div>
        <div className="w-[65%] flex flex-col items-center mt-1 mb-3">
          <button type="submit" className="mt-3 text-center rounded-[50px] w-full bg-[#3C24D1]  py-1 text-white">Soumettre ma demande</button>
          <p className="text-[9px] mt-1 font-semibold">Déjà partenaire ? Accédez à votre espace</p>
        </div>
      </form>
    )
}
