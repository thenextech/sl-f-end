import React from 'react'
import logo from '../assets/images/shopLoc.png'

export default function SideBar({elementClicked, handleElementClick, items }) {

    function handleClick() {
        handleElementClick()
    }

  return (
    <div className={elementClicked ? "w-[50%] sm:w-[45%]  md:w-[35%] lg:w-[20%] h-[100%] bg-white fixed top-0 shadow-xl flex flex-col items-center z-40" : "fixed left-[150%]"} onClick={handleClick}>
        <div className="w-[75%] h-[100%] flex flex-col justify-between">
            <div>
                {items.map((item) => (
                    (item)
                ))}
            </div>
          <div className="flex flex-col items-center">
            <img src={logo} alt="logo shoploc" className="w-[270px] sm:w-[250px] md:w-[270px]"></img>
            <p className="text-[10px] text-[#494949] font-semibold mb-2 text-center">
              © 2024 ShopLoc - Tous droits réservés
            </p>
          </div>
        </div>
    </div>
  )
}
