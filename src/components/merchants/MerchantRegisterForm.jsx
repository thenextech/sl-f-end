import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillInfoCircle } from 'react-icons/ai';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default function MerchantRegisterForm() {
    const [businessName, setbusinessName] = useState("");
    const [representative, setRepresentative] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [errors, setErrors] = useState({});
    const [selectedCommunes, setSelectedCommunes] = useState([]);
    const [showPasswordRules, setShowPasswordRules] = useState(false);

    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;

    const autoCompleteAdress = async value => {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      const addressComponents = results[0].address_components;
      let postal = "";
      let locality = "";
  
      addressComponents.forEach(component => {
        if (component.types.includes("postal_code")) {
          postal = component.long_name;
        }
        if (component.types.includes("locality")) {
          locality = component.long_name;
        }
      });
  
      setAddress(value);
      setCity(locality);
      setPostalCode(postal);
    };

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

      // Validation Mot de passe
      if (password.length < 8 || !/(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/.test(password)) {
        newErrors.password = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un symbole";
      }

      // Validation Retapez votre mot de passe
      if (confirmPwd !== password) {
        newErrors.confirmPwd = "Les mots de passe ne correspondent pas";
      }

      // Validation logic for Ville (City)
      if (city === "") {
        newErrors.city = "Le champ Ville est requis";
      }

      // Validation logic for Nom de la société (Company Name)
      if (!/^[A-Za-z0-9\s]+$/.test(businessName)) {
        newErrors.businessName = "Le nom de la société ne peut contenir que des majuscules, des minuscules, des espaces et des chiffres";
      }
      
      // Validation logic for Représentant de la société (Representative)
    if (!/^[A-Za-z\s'-]+$/.test(representative)) {
      newErrors.representative = "Le représentant de la société ne peut contenir que des majuscules, des minuscules, des espaces et les symboles ' et -";
    }

      if (Object.keys(newErrors).length === 0) {
        
        const merchantToCreate = {
          businessName: businessName,
          email: emailAddress,
          password: password,
          address: address,
          city: city,
          postalCode: postalCode,
          userId: ''
        };

        console.log(JSON.stringify(merchantToCreate));

        const response = await fetch(`${API_URL}/merchant/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(merchantToCreate)
        })

        console.log(response);
        console.log(response.ok);

        if (response.ok) {
          const url = await response.json();
          navigate(url['url']);
        } else {
          console.log('here ?');
          const errorMessage = await response.json();
          console.log(errorMessage);
          newErrors.authFailed = errorMessage['error'];
          setErrors(newErrors);
        }
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
              value={businessName}
              onChange={(event) => setbusinessName(event.target.value)}
              required
              className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%] "
            />
          </div>
          {errors.businessName && (
          <p className="ml-1 text-[#ff0000] text-[10px]">{errors.businessName}</p>
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
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={autoCompleteAdress}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <label className="font-bold text-[11px] sm:text-[13px] ml-1">
                Adresse de votre commerce*
              </label>
              <div className="h-[25px] md:w-[70%] sm:h-[30px] w-full bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
                <input
                  {...getInputProps({
                    className: 'location-search-input bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]',
                  })}
                />
              </div>
              <div className="autocomplete-dropdown-container">
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
          </div>
          )}
        </PlacesAutocomplete>
        <div className="flex justify-between w-full md:w-[70%]  mb-3">
          <div className="flex flex-col w-[55%]">
            <label className="font-bold text-[11px] sm:text-[13px] ml-1">
              Ville
            </label>
            <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
              <input value={city} readOnly className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 focus:outline-none w-[95%]"/>
            </div>
          </div>
          <div className="flex flex-col w-[40%]">
            <label className="font-bold text-[11px] sm:text-[13px] ml-1">
              Code postal
            </label>
            <div className="h-[25px] sm:h-[30px] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
              <input value={postalCode} readOnly className="bg-[#ECECEC] rounded-[50px] text-[12px] sm:text-[13px] ml-2 w-full focus:outline-none" />
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
          {errors.authFailed && (
              <p className="ml-1 text-[#ff0000] text-[10px]">{errors.authFailed}</p>
            )}
          <button type="submit" className="mt-3 text-center rounded-[50px] w-full bg-[#3C24D1]  py-1 text-white lg:w-[60%] lg:py-1 lg:text-[18px]">Soumettre ma demande</button>
          <p className="text-[9px] lg:text-[12px] mt-1 font-semibold">Déjà partenaire ? <Link to="/merchant/login" className="text-[#3C24D1]">Accédez à votre espace</Link></p>
        </div>
      </form>
    )
}
