import React, { useState } from 'react'
import Fog from '../Fog';
import SideBar from '../SideBar';
import Drawer from '../Drawer';

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
          <Drawer handleDrawerClick={handleDrawerClick} v/>
      </div>
    </div>
  )
}
