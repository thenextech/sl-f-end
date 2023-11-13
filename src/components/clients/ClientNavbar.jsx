import React, { useState } from 'react'
import Fog from '../Fog';
import SideBar from '../SideBar';
import Drawer from '../Drawer';
import AddressBox from './AddressBox';
import FidelityPointBox from './FidelityPointBox';
import CatalogueVFPBox from './CatalogueVFPBox';

export default function ClientNavbar() {

  const [drawerClicked, setDrawerClicked] = useState(false);

  function handleDrawerClick() {
    setDrawerClicked(!drawerClicked);
  }

  return (
    <div>
      <Fog drawerClicked={drawerClicked} handleDrawerClick={handleDrawerClick} />
      <SideBar drawerClicked={drawerClicked} handleDrawerClick={handleDrawerClick} items={[]}/>
      <div className="text-black flex items-center justify-between px-3 mt-3 md:px-[25px]">
        <div className="flex items-center">
          <Drawer handleDrawerClick={handleDrawerClick}/>
          <AddressBox />
        </div>
        <div className="flex">
          <CatalogueVFPBox />
          <FidelityPointBox />
        </div>
      </div>
      <div className="w-[93%] h-[1px] bg-gray-200 mx-auto mt-3 sm:hidden">
      </div>
    </div>
  )
}
