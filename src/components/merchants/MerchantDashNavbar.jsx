import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Fog from '../Fog';
import SideBar from '../SideBar';
import Drawer from '../Drawer';
import HomeLogo from '../HomeLogo';
import LogoutBtn from '../buttons/LogoutBtn';
import MerchantDashSideLinks from './MerchantDashSideLinks';

export default function MerchantDashNavbar({ businessName, merchantId }) {
    const [drawerClicked, setDrawerClicked] = useState(false);
    const [merchantOrders, setMerchantOrders] = useState(0);
    const [error, setErrors] = useState("");

    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;

    function handleDrawerClick() {
      setDrawerClicked(!drawerClicked);
    }

    const handleLogoutClick = async (event) => {
      const response = await fetch(`${API_URL}/merchant/logout`, {
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
  
    const retrieveAllMerchantCurrentOrders = async (merchantId) => {
      try {
          const response = await fetch(`${API_URL}/orderlines/m/${merchantId}`, {
              credentials: 'include',
              method: 'GET'
          });
  
          if (response.ok) {
            const data = await response.json();
            setMerchantOrders(Object.keys(data).length);
          } else {
            console.log(response.error);
          }
      } catch (error) {
          console.error('Error:', error);
      }
    }
    
    useEffect(() => {
      const getUserOrders = async () => {
        await retrieveAllMerchantCurrentOrders(merchantId);
      }
      
      getUserOrders();
    }, [merchantId]);
  
  console.log(merchantOrders);
  
    return (
      <div>
        <Fog elementClicked={drawerClicked} handleElementClick={handleDrawerClick} />
        <SideBar elementClicked={drawerClicked} handleElementClick={handleDrawerClick} items={[[<LogoutBtn handleBtnClick={handleLogoutClick} />, <MerchantDashSideLinks numOrders={merchantOrders} />]]}/>
        <div className="text-black flex items-center justify-between px-3 mt-3 md:px-[25px]">
          <div className="flex items-center">
            <Drawer handleDrawerClick={handleDrawerClick} numOrders={merchantOrders}/>
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
