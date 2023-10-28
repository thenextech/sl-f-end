import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MerchantRegisterForm() {
    const [companyName, setCompanyName] = useState("");
    const [representative, setRepresentative] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [errors, setErrors] = useState({});
    const [selectedCommunes, setSelectedCommunes] = useState([]);

    useEffect(() => {
      // Lorsque la valeur de "city" change, effectuer une requête à l'API Geonames
      if (city) {
        fetch(`https://geo.api.gouv.fr/communes?nom=${city}&fields=codesPostaux,nom`)
          .then(response => response.json())
          .then(data => {
            const theCity = data.find(elt => elt.nom === city);
            console.log(theCity);
            if (theCity) {
              setSelectedCommunes(theCity.codesPostaux);
              setErrors({ ...errors, city: "" });
            } else {
              setErrors({ ...errors, city: "Veuillez saisir une ville française valide" });
            }
          })
          .catch(error => {
            console.error(error);
            setErrors({ ...errors, city: "Erreur lors de la recherche du code postal" });
          });
      } else {
        setPostalCode("");
        setErrors({ ...errors, city: "" });
      }
    }, [city]);

  
    const handleSubmit = (event) => {
      event.preventDefault();
      const newErrors = {};
      
      // Validation Email
      // Validation Adresse e-mail 
      const isValidEmail = (email) => {
        // Validation d'adresse e-mail avec une expression régulière courante
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      };

      if (emailAddress.trim() === "") {
        newErrors.emailAddress = "L'adresse e-mail est requise";
      } else if (!isValidEmail(emailAddress)) {
        newErrors.emailAddress = "Veuillez entrer une adresse e-mail valide";
      }

      // Validation logic for Adresse ligne 1
      if (!/^[-'a-zA-Z0-9, ]+$/.test(address1)) {
        newErrors.address1 = "Adresse non valide. Utilisez des lettres minuscules, des lettres majuscules, des chiffres, des symboles comme -, ,, et '";
      }

      // Validation logic for Adresse ligne 2
      if (address2 != "" && !/^[-'a-zA-Z0-9, ]+$/.test(address2)) {
        newErrors.address2 = "Adresse non valide. Utilisez des lettres minuscules, des lettres majuscules, des chiffres, des symboles comme -, ,, et '";
      }

      // Validation logic for Ville (City)
      if (city === "") {
        newErrors.city = "Le champ Ville est requis";
      }

      // Validation logic for Nom de la société (Company Name)
      if (!/^[A-Za-z0-9\s]+$/.test(companyName)) {
        newErrors.companyName = "Le nom de la société ne peut contenir que des majuscules, des minuscules, des espaces et des chiffres";
      }
      
      // Validation logic for Représentant de la société (Representative)
    if (!/^[A-Za-z\s'-]+$/.test(representative)) {
      newErrors.representative = "Le représentant de la société ne peut contenir que des majuscules, des minuscules, des espaces et les symboles ' et -";
    }

      if (Object.keys(newErrors).length === 0) {
        // Soumettre le formulaire si aucune erreur n'est présente
        // Placez ici votre logique de soumission du formulaire
      } else {
        setErrors(newErrors);
      }

    };
  
    return (
      <form onSubmit={handleSubmit} className="p-1">
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] sm:text-[13px] ml-1">
            Nom de la société*
          </label>
          <div className="h-[25px] md:w-[70%] sm:h-[30px] w-full bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center">
            <input
              type="text"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              required
              className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%] "
            />
          </div>
          {errors.companyName && (
          <p className="ml-1 text-[#ff0000] text-[10px]">{errors.companyName}</p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] sm:text-[13px] ml-1">
            Représentant de la société*
          </label>
          <div className="h-[25px] md:w-[70%] sm:h-[30px] w-full bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center">
            <input
              type="text"
              value={representative}
              onChange={(event) => setRepresentative(event.target.value)}
              required
              className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%] "
            />
          </div>
          {errors.representative && (
          <p className="ml-1 text-[#ff0000] text-[10px]">{errors.representative}</p>
        )}
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] sm:text-[13px] ml-1">
            Adresse e-mail*
          </label>
          <div className="h-[25px] md:w-[70%] sm:h-[30px] w-full bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center">
            <input
              type="text"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
              required
              className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]"
            />
          </div>
          {errors.emailAddress && (
          <p className="ml-1 text-[#ff0000] text-[10px]">{errors.emailAddress}</p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] sm:text-[13px] ml-1">
            Adresse ligne 1*
          </label>
          <div className="h-[25px] md:w-[70%] sm:h-[30px] w-full bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center">
          <input
            type="text"
            value={address1}
            onChange={(event) => setAddress1(event.target.value)}
            className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]"
          />
          </div>
          {errors.address1 && (
            <p className="ml-1 text-[#ff0000] text-[10px]">{errors.address1}</p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] sm:text-[13px] ml-1">
            Adresse ligne 2
          </label>
          <div className="h-[25px] md:w-[70%] sm:h-[30px] w-full bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center">
          <input
            type="text"
            value={address2}
            onChange={(event) => setAddress2(event.target.value)}
            className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]"
          />
          </div>
          {errors.address2 && (
            <p className="ml-1 text-[#ff0000] text-[10px]">{errors.address2}</p>
          )}
        </div>
        <div className="flex justify-between w-full md:w-[70%]  mb-3">
          <div className="flex flex-col w-[55%]">
            <label className="font-bold text-[11px] sm:text-[13px] ml-1">
              Ville
            </label>
            <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]"
              />
            </div>
            {errors.city && (
              <p className="ml-1 text-[#ff0000] text-[10px]">{errors.city}</p>
            )}
          </div>
          <div className="flex flex-col w-[40%]">
            <label className="font-bold text-[11px] sm:text-[13px] ml-1">
              Code postal
            </label>
            <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
              <select value={postalCode} onChange={(event) => setPostalCode(event.target.value)} className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 w-full focus:outline-none" required>
                <option value=""></option>
                {selectedCommunes.map((codePostal) => (
                  <option key={codePostal} value={codePostal}>{codePostal}</option>
                ))}
              </select>
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
          <p className="font-bold text-[9px] lg:text-[12px] sm:text-[11px] ml-2 ml-1">J'accepte les <Link to="#" className="text-[#3C24D1]">conditions générales d'utilisation*</Link></p>
        </div>
        <div className="w-full md:w-[70%]  flex flex-col items-center mt-1 mb-3">
          <button type="submit" className="mt-3 text-center rounded-[50px] w-full bg-[#3C24D1]  py-1 text-white lg:w-[60%] lg:py-1 lg:text-[18px]">Soumettre ma demande</button>
          <p className="text-[9px] lg:text-[12px] mt-1 font-semibold">Déjà partenaire ? <Link to="/m/login" className="text-[#3C24D1]">Accédez à votre espace</Link></p>
        </div>
      </form>
    )
}
