import React from 'react'
import { Link } from "react-router-dom";

export default function HomeSideLinks() {
  return (
    <div className="mt-3">
        <p className="hover:cursor-pointer"><Link to="/m/login">Commerçants</Link></p>
        <p className="hover:cursor-pointer">Programme de fidelité</p>
        <p className="hover:cursor-pointer">FAQ</p>
    </div>
  )
}
