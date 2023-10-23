import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
    const [accessCode, setAccessCode] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
    };
  
    return (
      <form onSubmit={handleSubmit} className="p-1">
        <div className="flex flex-col mb-2">
          <label className="font-bold text-[13px] lg:text-[14px] ml-1">
            Code d'accès partenaire
          </label>
          <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
            <input
              type="text"
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
              required
              className="bg-[#ECECEC] rounded-[50px] text-[11px] sm:text-[13px] ml-2 focus:outline-none"
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
              className="bg-[#ECECEC] rounded-[50px] text-[11px] sm:text-[13px] ml-2 focus:outline-none"
            />
          </div>
        </div>
        <div className="w-full lg:w-[95%] flex flex-col items-center mt-1 mb-3">
          <button type="submit" className="mt-3 text-center rounded-[50px] w-full bg-[#3C24D1] py-1 text-white text-[10px] sm:text-[13px] text-[15px]">Se connecter</button>
          <p className="text-[9px] lg:text-[12px] mt-1 font-semibold text-center">Vous n’avez pas de compte ?<Link to="/register" className="text-[#3C24D1]"> Devenez partenaire  Shoploc</Link></p>
        </div>
      </form>
    )
}
