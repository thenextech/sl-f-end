import React, {useState} from 'react'
import {IoMdMenu} from 'react-icons/io'
import {BiSolidUser} from 'react-icons/bi'
import logo from '../assets/images/shopLoc.png'

export default function Navbar() {

  const [drawerClicked, setDrawerClicked] = useState(false);

  function handleDrawerClick() {
    console.log(drawerClicked);
    setDrawerClicked(!drawerClicked);
  }

  return (
    <>
    <div>
      <div className={drawerClicked ? "absolute top-0 w-screen h-screen bg-black opacity-80" : "hidden"} onClick={() => { handleDrawerClick(false) }}>
      </div>
      <div className={drawerClicked ? "w-[55%] sm:w-[45%]  md:w-[17%] h-[100%] bg-white fixed top-0 shadow-xl flex flex-col items-center" : "fixed left-[100%]"} onClick={handleDrawerClick}>
        <div className="w-[75%] h-[100%] flex flex-col justify-between">
          <div>
            <div className="flex flex-col items-center">
              <button className="text-white bg-[#3C24D1] py-[7px] px-[15px] rounded-[10px] font-semibold text-center text-[16px] sm:text-[16px] md:text-[18px] w-[100%] mt-5 hover:cursor-pointer">OUEE DEPLOY OUE</button>
              <button className="text-black bg-[#EAEAEA] py-[7px] px-[15px] rounded-[10px] font-semibold text-center text-[16px] sm:text-[16px] md:text-[18px] w-[100%] mt-2 hover:cursor-pointer">Connexion</button>
            </div>
            <div className="mt-3">
              <p className="hover:cursor-pointer">Commerçants</p>
              <p className="hover:cursor-pointer">Programme de fidelité</p>
              <p className="hover:cursor-pointer">FAQ</p>
          </div>
          </div>
          <div>
            <img src={logo} alt="logo shoploc" className="w-[270px] sm:w-[250px] md:w-[270px]"></img>
            <p className="text-[10px] text-[#494949] font-semibold mb-2 text-center">
              © 2023 ShopLoc - Tous droits réservés
            </p>
          </div>
        </div>
      </div>

      <div className="text-black flex items-center justify-between px-3 mt-3 md:px-[25px]">
          <div className="flex items-center">
              <IoMdMenu className="text-[25px] sm:text-[38px] md:text-[50px] hover:cursor-pointer" onClick={handleDrawerClick}></IoMdMenu>
              <img src={logo} alt="logo shoploc" className="w-[120px] sm:w-[150px] md:w-[180px] ml-3 sm:ml-[25px] md:ml-[65px]"></img>
          </div> 
          <div className='flex'>
              <div className="w-[35px] sm:w-[42px] md:w-[45px] bg-[#D9D9D9] rounded-[30px] h-[35px] sm:h-[42px] md:h-[45px] mr-[12px] sm:mr-[18px] md:mr-[23px] flex items-center justify-center hover:cursor-pointer">
                  <BiSolidUser className="text-[18px] sm:text-[23px] md:text-[26px]"></BiSolidUser>
              </div>
              <button className="text-white bg-[#3C24D1] py-[7px] px-[15px] rounded-[30px] font-bold text-center text-[13px] sm:text-[16px] md:text-[18px] h-[90%]">Inscription</button>
          </div>
      </div>
    </div>
    
    
        
    </>
    

    
  )
}


