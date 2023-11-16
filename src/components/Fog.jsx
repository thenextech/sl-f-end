import React from 'react'

export default function Fog({ elementClicked, handleElementClick}) {
  return (
    <div className={elementClicked ? "fixed top-0 w-screen h-screen bg-black opacity-80 z-30" : "hidden"} onClick={() => { handleElementClick(false) }}>
      </div>
  )
}
