import React from 'react'

export default function Fog({ drawerClicked, handleDrawerClick}) {
  return (
    <div className={drawerClicked ? "fixed top-0 w-screen h-screen bg-black opacity-80 z-30" : "hidden"} onClick={() => { handleDrawerClick(false) }}>
      </div>
  )
}
