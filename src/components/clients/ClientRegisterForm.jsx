import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AiFillInfoCircle} from 'react-icons/ai';

export default function ClientRegisterForm() {

    const baseURL = "http://localhost:8080";

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [errors, setErrors] = useState({});
    const [showPasswordRules, setShowPasswordRules] = useState(false);
    const [selectedCommunes, setSelectedCommunes] = useState([]);
    
    const navigate = useNavigate();


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

    const handleSubmit = async (event) => {
      event.preventDefault();
      const newErrors = {};

      // Validation Nom
      if (!/^[A-Za-z-]+$/.test(lastName)) {
        newErrors.lastName = "Le nom doit contenir seulement des lettres";
      }
      if (lastName.trim() === "") {
        newErrors.lastName = "Le nom est requis";
      }

      // Validation Prénom
      if (!/^[A-Za-z-]+$/.test(firstName)) {
        newErrors.firstName = "Le prénom doit contenir seulement des lettres";
      }
      if (firstName.trim() === "") {
        newErrors.firstName = "Le prénom est requis";
      }
      
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

      // Validation Mot de passe
      if (password.length < 8 || !/(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/.test(password)) {
        newErrors.password = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un symbole";
      }

      // Validation Retapez votre mot de passe
      if (confirmPwd !== password) {
        newErrors.confirmPwd = "Les mots de passe ne correspondent pas";
      }

      // Validation logic for Adresse ligne 1
      if (!/^[-'a-zA-Z0-9, ]+$/.test(address1)) {
        newErrors.address1 = "Adresse non valide. Utilisez des lettres minuscules, des lettres majuscules, des chiffres, des symboles comme -, ,, et '";
      }

      // Validation logic for Adresse ligne 2
      if (!address2 === "" && !/^[-'a-zA-Z0-9, ]+$/.test(address2)) {
        newErrors.address2 = "Adresse non valide. Utilisez des lettres minuscules, des lettres majuscules, des chiffres, des symboles comme -, ,, et '";
      }

      // Validation logic for Ville (City)
      if (city === "") {
        newErrors.city = "Le champ Ville est requis";
      }

      if (Object.keys(newErrors).length === 0) {
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', emailAddress);
        formData.append('password', password);
        formData.append('lineAddress1', address1);
        formData.append('lineAddress2', address2);
        formData.append('city', city);
        formData.append('postalCode', postalCode);

        const res = await fetch('http://localhost:8080/client/register', {
          method: 'POST',
          body: formData
        })
        var data = await res.json();
        console.log(data);
      } else {
        console.log(newErrors);
        setErrors(newErrors);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="p-1">
        <div className="flex justify-between w-full md:w-[70%]  mb-3">
          <div className="flex flex-col w-[48%]">
            <label className="font-bold text-[11px] sm:text-[13px] ml-1">
              Nom*
            </label>
            <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
              <input
                type="text"
                value={lastName}
                required
                name="lastName"
                onChange={(event) => setLastName(event.target.value)}
                className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]"
              />
            </div>
            {errors.lastName && (
            <p className="ml-1 text-[#ff0000] text-[10px]">{errors.lastName}</p>
            )}
          </div>
          <div className="flex flex-col w-[48%]">
            <label className="font-bold text-[11px] sm:text-[13px] ml-1">
              Prénom*
            </label>
            <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
              <input
              type="text"
              value={firstName}
              required
              name="firstName"
              onChange={(event) => setFirstName(event.target.value)}
              className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 w-full focus:outline-none"
              />
            </div>
            {errors.firstName && (
            <p className="ml-1 text-[#ff0000] text-[10px]">{errors.firstName}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] sm:text-[13px] ml-1">
            Adresse e-mail*
          </label>
          <div className="h-[25px] md:w-[70%] sm:h-[30px] w-full bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center">
            <input
              type="email"
              value={emailAddress}
              name="email"
              onChange={(event) => setEmailAddress(event.target.value)}
              required
              className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%] "
            />
          </div>
          {errors.emailAddress && (
          <p className="ml-1 text-[#ff0000] text-[10px]">{errors.emailAddress}</p>
          )}
          {errors.alreadyUsedEmail && (
              <p className="ml-1 text-[#ff0000] text-[10px]">{errors.alreadyUsedEmail}</p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] sm:text-[13px] ml-1">
            Mot de passe*
          </label>
          <div className="h-[25px] md:w-[70%] sm:h-[30px] w-full bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center justify-between">
            <input
              type="password"
              value={password}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              required
              className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%] md:w-[95%]"
            />
            <AiFillInfoCircle className="hover:cursor-pointer mr-1"
              onMouseEnter={() => setShowPasswordRules(true)}
              onMouseLeave={() => setShowPasswordRules(false)}></AiFillInfoCircle>
          </div>
          {showPasswordRules && (
          <p className=" ml-1 text-gray text-[10px] font-normal">
            Le mot de passe doit être composé de :
            <br />
            - Au moins 8 caractères
            <br />
            - Une majuscule
            <br />
            - Une minuscule
            <br />
            - Un symbole
          </p>
          )}
          {errors.password && (
            <p className="ml-1 text-[#ff0000] text-[10px]">{errors.password}</p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[11px] sm:text-[13px] ml-1">
            Retapez votre mot de passe*
          </label>
          <div className="h-[25px] md:w-[70%] sm:h-[30px] w-full bg-[#ECECEC] rounded-[50px] w-[50%] font-normal flex items-center">
          <input
            type="password"
            value={confirmPwd}
            onChange={(event) => setConfirmPwd(event.target.value)}
            required
            className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]"
          />
          </div>
          {errors.confirmPwd && (
            <p className="ml-1 text-[#ff0000] text-[10px]">{errors.confirmPwd}</p>
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
            name="lineAddress1"
            onChange={(event) => setAddress1(event.target.value)}
            required
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
            name="lineAddress2"
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
              Ville*
            </label>
            <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
              <input
                type="text"
                value={city}
                name="city"
                onChange={(event) => setCity(event.target.value)}
                required
                className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]"
              />
            </div>
            {errors.city && (
              <p className="ml-1 text-[#ff0000] text-[10px]">{errors.city}</p>
            )}
          </div>
          <div className="flex flex-col w-[40%]">
            <label className="font-bold text-[11px] sm:text-[13px] ml-1">
              Code postal*
            </label>
            <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
               <select name="postalCode" value={postalCode} onChange={(event) => setPostalCode(event.target.value)} className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 w-full focus:outline-none" required>
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
          <button type="submit" className="mt-3 text-center rounded-[50px] w-full bg-[#3C24D1]  py-1 text-white lg:w-[60%] lg:py-1 lg:text-[18px]">M'inscrire</button>
          <p className="text-[9px] lg:text-[12px] mt-1 font-semibold">Déjà inscrit ? <Link to="/login" className="text-[#3C24D1]">Accédez à votre compte</Link></p>
        </div>
      </form>
    )
}
