import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientVerifyForm() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
        formData.append('code', code);
      
      try {
        const response = await fetch('http://localhost:8080/client/verify', {
          method: 'POST',
          credentials: 'include',
          body: formData
        });
        
        if (response.ok) {
          const url = await response.json();
          navigate(url['url']);
        } else {
          const errorMessage = await response.json();
          setError(errorMessage['error']);
        }
      } catch (error) {
        setError('Une erreur est survenue lors de la vérification par code');
      }
    }
    
    return (
      <>
        <p className="font-semibold text-[15px] text-center mb-4">Un code de vérification vous a été envoyé à votre adresse mail. 
          Merci de le renseigner dans le champ ci-dessous</p>
        <form onSubmit={handleSubmit} className="p-1">
          <div className="flex flex-col mb-2">
            <label className="font-bold text-[13px] lg:text-[14px] ml-1">
              Code de vérification
            </label>
            <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[50px] font-normal flex items-center">
              <input
                type="text"
                value={code}
                name="code"
                onChange={(event) => setCode(event.target.value)}
                required
                className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
              />
             </div> 
          </div>
          <div className="w-full lg:w-[95%] flex flex-col items-center mt-1 mb-3">
            {error && (
              <p className="ml-1 text-[#ff0000] text-[11px]">{error}</p>
              )}
            <button type="submit" className="mt-3 text-center rounded-[50px] w-full bg-[#3C24D1] py-1 text-white text-[10px] sm:text-[13px] text-[15px]">Vérifier</button>
          </div>
        </form>      
      </>
    )
}
