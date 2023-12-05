import React, { useState } from 'react'
import Fog from '../Fog';
import SideBar from '../SideBar';
import Drawer from '../Drawer';
import AddressBox from './AddressBox';
import FidelityPointBox from './FidelityPointBox';
import CatalogueVFPBox from './CatalogueVFPBox';
import ShoppingCartNav from './shoppingCart/ShoppingCartNav';
import ShoppingCartSideBar from './shoppingCart/ShoppingCartSideBar';

export default function ClientNavbar( { user }) {
  
  const [drawerClicked, setDrawerClicked] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);

  const numItems = 1;

  function handleDrawerClick() {
    setDrawerClicked(!drawerClicked);
  }

  function handleCartBoxClick() {
    setCartClicked(!cartClicked);
  }

  return (
    <div>
      <Fog elementClicked={drawerClicked} handleElementClick={handleDrawerClick} />
      <SideBar elementClicked={drawerClicked} handleElementClick={handleDrawerClick} items={[]}/>
      <Fog elementClicked={cartClicked} handleElementClick={handleCartBoxClick} />
      <ShoppingCartSideBar elementClicked={cartClicked} handleElementClick={handleCartBoxClick} numItems={numItems}/>
      <div className="text-black flex items-center justify-between px-3 mt-3 md:px-[25px]">
        <div className="flex items-center">
          <Drawer handleDrawerClick={handleDrawerClick}/>
          <AddressBox />
        </div>
        <div className="flex lg:w-[380px] sm:w-[190px] w-[110px] justify-between">
          <CatalogueVFPBox />
          <FidelityPointBox />
          <ShoppingCartNav handleBoxClick={handleCartBoxClick} numItems={numItems}/>
        </div>
      </div>
      <div className="w-[93%] h-[1px] bg-gray-200 mx-auto mt-3 sm:hidden">
      </div>
    </div>
  )
}
