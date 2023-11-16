import React, { useState } from 'react'
import Fog from '../Fog';
import SideBar from '../SideBar';
import Drawer from '../Drawer';
import HomeLogo from '../HomeLogo';
import LogoutBtn from '../buttons/LogoutBtn';
import MerchantDashSideLinks from './MerchantDashSideLinks';

export default function MerchantDashNavbar() {
    const [drawerClicked, setDrawerClicked] = useState(false);

    function handleDrawerClick() {
      setDrawerClicked(!drawerClicked);
    }
  
    return (
      <div>
        <Fog elementClicked={drawerClicked} handleElementClick={handleDrawerClick} />
        <SideBar elementClicked={drawerClicked} handleElementClick={handleDrawerClick} items={[[<LogoutBtn/>, <MerchantDashSideLinks />]]}/>
        <div className="text-black flex items-center justify-between px-3 mt-3 md:px-[25px]">
          <div className="flex items-center">
            <Drawer handleDrawerClick={handleDrawerClick}/>
            <HomeLogo />
          </div>
          <div className="flex">
            <p className="text-[10px] sm:text-[13px] md:text-[16px] font-bold uppercase">Boulangerie Vianney Degruson</p>
        </div>
        </div>
        <div className="w-[93%] h-[1px] bg-gray-200 mx-auto mt-3 md:mt-0 md:w-[94%]">
        </div>
      </div>
    )
  }
