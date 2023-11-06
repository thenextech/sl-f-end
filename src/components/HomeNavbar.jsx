import React, {useState} from 'react'
import HomeSideLinks from './HomeSideLinks';
import HomeSideBtn from './buttons/HomeSideBtn';
import NavButtons from './buttons/NavButtons';
import Drawer from './Drawer';
import HomeLogo from './HomeLogo'
import SideBar from './SideBar';
import Fog from './Fog';


export default function HomeNavbar() {

  const [drawerClicked, setDrawerClicked] = useState(false);

  function handleDrawerClick() {
    setDrawerClicked(!drawerClicked);
  }

  return (
    <>
    <div>
      <Fog drawerClicked={drawerClicked} handleDrawerClick={handleDrawerClick} />
      <SideBar drawerClicked={drawerClicked} handleDrawerClick={handleDrawerClick} items={[<HomeSideBtn/>, <HomeSideLinks/>]}/>
      <div className="text-black flex items-center justify-between px-3 mt-3 md:px-[25px]">
        <div className="flex items-center">
          <Drawer handleDrawerClick={handleDrawerClick}/>
          <HomeLogo />
        </div>
          <NavButtons />
      </div>
    </div>
  </>
  )
}


