import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Fog from '../Fog';
import SideBar from '../SideBar';
import Drawer from '../Drawer';
import AddressBox from './AddressBox';
import FidelityPointBox from './FidelityPointBox';
import CatalogueVFPBox from './CatalogueVFPBox';
import ShoppingCartNav from './shoppingCart/ShoppingCartNav';
import LogoutBtn from '../buttons/LogoutBtn';
import ShoppingCartSideBar from './shoppingCart/ShoppingCartSideBar';
import { useShoppingCart } from './shoppingCart/ShoppingCartContext';

export default function ClientNavbar( { user }) {
  
  const navigate = useNavigate();
  const [drawerClicked, setDrawerClicked] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const [error, setErrors] = useState("");

  const { cartItems } = useShoppingCart();
  const numItems = cartItems.length;
  
  const API_URL = process.env.REACT_APP_API_URL;
  
  function handleDrawerClick() {
    setDrawerClicked(!drawerClicked);
  }

  function handleCartBoxClick() {
    setCartClicked(!cartClicked);
  }

  const handleLogoutClick = async (event) => {
    const response = await fetch(`${API_URL}/client/logout`, {
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
      <SideBar elementClicked={drawerClicked} handleElementClick={handleDrawerClick} items={[<LogoutBtn handleBtnClick={handleLogoutClick}/>]}/>
      <Fog elementClicked={cartClicked} handleElementClick={handleCartBoxClick} />
      <ShoppingCartSideBar elementClicked={cartClicked} numItems={numItems} items={cartItems}/>
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
