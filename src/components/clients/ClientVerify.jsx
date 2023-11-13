import React from 'react'
import HomeNavbar from '../HomeNavbar'
import Footer from '../Footer'
import ClientVerifyHero from './ClientVerifyHero'
import Card from '../Card'

function ClientVerify() {
  return (
    <>
        <HomeNavbar />
        <ClientVerifyHero />
        <div className="lg:flex items-center md:flex items-center">
          <Card title="Click and collect simplifié" paragraph="Parcourez et réservez vos achats en un seul clic."/>
          <Card title="Programme de fidélité avantageux" paragraph="Accumulez des points de fidélité pour des avantages exclusifs."/>
          <Card title="Itinéraire optimal" paragraph="Planifiez votre itinéraire pour récupérer vos achats efficacement."/>
        </div>
        <Footer />
    </>
  )
}

export default ClientVerify