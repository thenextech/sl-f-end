import React from 'react'
import HomeNavbar from '../components/HomeNavbar'
import Footer from '../components/Footer'
import AdminLoginHero from '../components/admins/AdminLoginHero'
import Card from '../components/Card'

function AdminLogin() {
  return (
    <>
        <HomeNavbar />
        <AdminLoginHero />
        <Footer />
    </>
  )
}

export default AdminLogin