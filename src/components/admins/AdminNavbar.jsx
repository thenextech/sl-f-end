import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import Fog from '../Fog';
import SideBar from '../SideBar';
import Drawer from '../Drawer';
import LogoutBtn from '../buttons/LogoutBtn';

export default function AdminNavbar() {
  
  const navigate = useNavigate();
  const [drawerClicked, setDrawerClicked] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const [error, setErrors] = useState("");
  const [userData, setUserData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  
  const API_URL = process.env.REACT_APP_API_URL;
  
  function handleDrawerClick() {
    setDrawerClicked(!drawerClicked);
  }

  const handleLogoutClick = async (event) => {
    const response = await fetch(`${API_URL}/admin/logout`, {
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

  function goToVfpOffers() {
    navigate('/admin/vfp');
  }

  function goToUsersList() {
    navigate('/admin/dashboard');
  }

  return (
    <div>
      <Fog elementClicked={drawerClicked} handleElementClick={handleDrawerClick} />
      <SideBar elementClicked={drawerClicked} handleElementClick={handleDrawerClick} items={[<LogoutBtn handleBtnClick={handleLogoutClick} />, <p className="font-semibold sm:text-[16px] md:text-[18px] mt-4 hover:cursor-pointer" onClick={goToUsersList}>Gestion des utilisateurs</p>, <p className="font-semibold sm:text-[16px] md:text-[18px] mt-4 hover:cursor-pointer" onClick={goToVfpOffers}>Offres VFP</p>]}/>
      <div className="text-black flex items-center justify-between px-3 mt-3 md:px-[25px]">
          <Drawer handleDrawerClick={handleDrawerClick} />
      </div>
    </div>
  )
}
