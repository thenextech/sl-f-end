import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Fog from '../Fog';
import SideBar from '../SideBar';
import Drawer from '../Drawer';
import HomeLogo from '../HomeLogo';
import LogoutBtn from '../buttons/LogoutBtn';
import MerchantDashSideLinks from './MerchantDashSideLinks';

export default function MerchantDashNavbar({ businessName }) {
    const [drawerClicked, setDrawerClicked] = useState(false);
    const [error, setErrors] = useState("");

    const navigate = useNavigate();

    function handleDrawerClick() {
      setDrawerClicked(!drawerClicked);
    }

    const handleLogoutClick = async (event) => {
      console.log('lààà');
      const response = await fetch('http://localhost:8080/merchant/logout', {
          method: 'GET',
          credentials: 'include',
      });
        
      if (response.ok) {
        const url = await response.json();
        navigate(url['url']);
      } else {
        const errorMessage = await response.json();
        console.log(errorMessage);
        setErrors(errorMessage['error']);
      }
    }
  
    return (
      <div>
        <Fog elementClicked={drawerClicked} handleElementClick={handleDrawerClick} />
        <SideBar elementClicked={drawerClicked} handleElementClick={handleDrawerClick} items={[[<LogoutBtn handleBtnClick={handleLogoutClick} />, <MerchantDashSideLinks />]]}/>
        <div className="text-black flex items-center justify-between px-3 mt-3 md:px-[25px]">
          <div className="flex items-center">
            <Drawer handleDrawerClick={handleDrawerClick}/>
            <HomeLogo />
          </div>
          <div className="flex">
            <p className="text-[10px] sm:text-[13px] md:text-[16px] font-bold uppercase">{businessName}</p>
        </div>
        </div>
        <div className="w-[93%] h-[1px] bg-gray-200 mx-auto mt-3 md:mt-0 md:w-[94%]">
        </div>
      </div>
    )
  }
