import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MerchantLoginForm() {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
        formData.append('email', emailAddress);
        formData.append('password', password);
      
      const response = await fetch('http://localhost:8080/merchant/login', {
          method: 'POST',
          credentials: 'include',
          body: formData
      });
        
      if (response.ok) {
        const url = await response.json();
        navigate(url['url']);
      } else {
        const errorMessage = await response.json();
        setErrors(errorMessage['error']);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="p-1">
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[13px] lg:text-[14px] ml-1">
            Adresse e-mail
          </label>
          <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
            <input
              type="email"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
              required
              className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[13px] lg:text-[14px] ml-1">
            Mot de passe
          </label>
          <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
            />
          </div>
        </div>
        <div className="w-full lg:w-[95%] flex flex-col items-center mt-1 mb-3">
          {error && (
            <p className="ml-1 text-[#ff0000] text-[13px]">{error}</p>
            )}
          <button type="submit" className="mt-3 text-center rounded-[50px] w-full bg-[#3C24D1] py-1 text-white text-[10px] sm:text-[13px] text-[15px]">Se connecter</button>
          <p className="text-[9px] lg:text-[12px] mt-1 font-semibold text-center">Vous n’avez pas de compte ?<Link to="/merchant/register" className="text-[#3C24D1]"> Devenez partenaire  Shoploc</Link></p>
        </div>
      </form>
    )
}
