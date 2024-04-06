import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
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
import CurrentOrders from './CurrentOrders';
import ClientDashSideLinks from './ClientDashSideLinks';

export default function ClientNavbar( { user }) {
  
  const navigate = useNavigate();
  const [drawerClicked, setDrawerClicked] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const [error, setErrors] = useState("");
  const [userData, setUserData] = useState({});
  const [clientOrders, setClientOrders] = useState(null);
  const [clientLoyaltyCard, setClientLoyaltyCard] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const { cartItems } = useShoppingCart();
  const numItems = cartItems.length;
  
  const API_URL = process.env.REACT_APP_API_URL;
  
  function handleDrawerClick() {
    setDrawerClicked(!drawerClicked);
  }

  function handleCartBoxClick() {;
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

  const isThereAnActiveSession = async () => {
    try {
        const response = await fetch(`${API_URL}/client/dashboard`, {
            credentials: 'include',
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            setIsAuthenticated(true);
            setUserData(data.object);
        } else {
            setIsAuthenticated(false);
        }
    } catch (error) {
        console.error('Error:', error);
        setIsAuthenticated(false); 
    }
  }

  const retrieveAllUserCurrentOrders = async (userId) => {
    console.log(userId);
    try {
        const response = await fetch(`${API_URL}/orders/client?clientId=${userId}`, {
            credentials: 'include',
            method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();
          setClientOrders(data.length);
        } else {
          setIsAuthenticated(false);
        }
    } catch (error) {
        console.error('Error:', error);
        setIsAuthenticated(false); 
    }
  }

  const fetchClientLoyaltyCard = async (clientId) => {
    try {
      const response = await fetch(`${API_URL}/loyaltyCards/all`, {
        credentials: 'include',
        method: 'GET'
      });
      
      if (response.ok) {
        const data = response.json();
        data.then(array => array.map(elt => {
          if (elt.userId === clientId) {
            setClientLoyaltyCard(elt);
            console.log(elt);
          }
        }));
      } else {
        const error = response.json();
        console.log('error :', error);
      }
    } catch {
      console.error('Error:', error);
      setIsAuthenticated(false); 
    }
  }
  
  useEffect(() => {
    const checkSession = async () => {
        await isThereAnActiveSession();
    };

    checkSession();
  }, []);

  useEffect(() => {
    const getUserOrders = async () => {
      await retrieveAllUserCurrentOrders(userData.userId);
    }

    const getUserLoyaltyCard = async () => {
      await fetchClientLoyaltyCard(userData.userId);
    }
    
    getUserOrders();
    getUserLoyaltyCard();
  }, [userData]);

  function goBackToDashboard() {
    navigate('/client/dashboard');
  }

  return (
    <div>
      <Fog elementClicked={drawerClicked} handleElementClick={handleDrawerClick} />
      <SideBar elementClicked={drawerClicked} handleElementClick={handleDrawerClick} items={[<LogoutBtn handleBtnClick={handleLogoutClick} />, <ClientDashSideLinks numOrders={clientOrders} />]}/>
      <Fog elementClicked={cartClicked} handleElementClick={handleCartBoxClick} />
      <ShoppingCartSideBar elementClicked={cartClicked} numItems={numItems} items={cartItems} user={user}/>
      <div className="text-black flex items-center justify-between px-3 mt-3 md:px-[25px]">
        <div className="flex items-center">
          <Drawer handleDrawerClick={handleDrawerClick} numOrders={clientOrders}/>
          <AddressBox />
        </div>
        <div className="flex lg:w-[380px] sm:w-[190px] w-[280px] sm:justify-evenly justify-end">
          <CatalogueVFPBox isVfp={clientLoyaltyCard.vfp} />
          <FidelityPointBox points={clientLoyaltyCard.points} />
          <ShoppingCartNav handleBoxClick={handleCartBoxClick} numItems={numItems}/>
        </div>
      </div>
      <div className="w-[93%] h-[1px] bg-gray-200 mx-auto mt-3 sm:hidden">
      </div>
    </div>
  )
}
