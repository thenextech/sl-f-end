import React from 'react'
import { Link } from "react-router-dom";
import logo from '../assets/images/shopLoc.png'

export default function HomeLogo() {
  return (
    <Link to="/"><img src={logo} alt="logo shoploc" className="w-[120px] sm:w-[150px] md:w-[180px] ml-3 sm:ml-[25px] md:ml-[65px] hover:cursor-pointer"></img></Link>
  )
}
