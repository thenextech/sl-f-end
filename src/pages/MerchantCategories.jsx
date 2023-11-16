import React, {useState} from 'react'
import MerchantDashNavbar from '../components/merchants/MerchantDashNavbar'
import MerchantCategoryBox from '../components/merchants/MerchantCategoryBox'
import Fog from '../components/Fog';
import { IoMdClose } from "react-icons/io";

export default function MerchantCategories() {

  const [addBtnClicked, setAddBtnClicked] = useState(false);
  const [error, setError] = useState(null);

  function handleBtnClicked() {
    setAddBtnClicked(!addBtnClicked);
  }

  function handleSubmit() {
    console.log('todooo');
  }

  return (
    <>
        <Fog elementClicked={addBtnClicked} handleElementClick={handleBtnClicked} />
        <div className={addBtnClicked ? "absolute w-full h-full z-40 flex justify-center items-center" : "hidden"} >
          <div className="relative w-[320px] h-[150px] bg-white shadow-my">
            <div className="absolute right-0">
              <IoMdClose className="text-[25px] hover:cursor-pointer" onClick={handleBtnClicked}/>
            </div>
            <div className="w-[250px] flex flex-col h-full mx-auto justify-center">
              <form onSubmit={handleSubmit} className="p-1">
                <div className="flex flex-col mb-2">
                  <label className="font-semibold text-[13px] lg:text-[14px] ml-1">
                    Nom de la catégorie
                  </label>
                  <div className="h-[30px] sm:h-[30px] w-full lg:w-[95%] bg-[#ECECEC] rounded-[5px] font-normal flex items-center">
                    <input
                      type="text"
                      name="email"
                      className="bg-[#ECECEC] rounded-[50px] text-[11px] w-[95%] sm:text-[13px] ml-2 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-[95%] flex flex-col items-center mt-1 mb-3">
                  {error && (
                    <p className="ml-1 text-[#ff0000] text-[13px]">{error}</p>
                    )}
                  <button className="text-white bg-[#3C24D1] py-[3px] md:py-[5px] rounded-[5px] font-semibold text-center text-[13px] sm:text-[16px] w-[160px] sm:w-[190px] mt-2 hover:cursor-pointer shadow-md" >Ajouter une catégorie</button>
                </div>
              </form>
            </div>
          </div>
        </div>
       <MerchantDashNavbar /> 
       <div className="flex justify-end w-[96%] items-center">        
            <button className="text-white bg-[#3C24D1] py-[3px] md:py-[5px] rounded-[5px] font-semibold text-center text-[13px] sm:text-[16px] md:text-[18px] w-[160px] sm:w-[190px] md:w-[230px] mt-2 hover:cursor-pointer shadow-md" onClick={handleBtnClicked}>Ajouter une catégorie</button>
       </div>
       <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 md:gap-8 sm:gap-6 flex flex-col mt-6 sm:mt-8">
              <MerchantCategoryBox />
              <MerchantCategoryBox />
              <MerchantCategoryBox />
              <MerchantCategoryBox />
              <MerchantCategoryBox />
              <MerchantCategoryBox />
              <MerchantCategoryBox />
              <MerchantCategoryBox />
              <MerchantCategoryBox />
              <MerchantCategoryBox />
              <MerchantCategoryBox />
              <MerchantCategoryBox />
        </div>
       </div>
    </>
  )
}
