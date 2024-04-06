import React from 'react'
import HomeNavbar from '../components/HomeNavbar'
import Footer from '../components/Footer'
import ClientRegisterHero from '../components/clients/ClientRegisterHero'
import Card from '../components/Card'

function ClientRegister() {
  return (
    <>
        <HomeNavbar />
        <ClientRegisterHero />
        <div className="lg:flex items-center md:flex items-center">
          <Card title="Click and collect simplifié" paragraph="Parcourez et réservez vos achats en un seul clic."/>
          <Card title="Programme de fidélité avantageux" paragraph="Accumulez des points de fidélité pour des avantages exclusifs."/>
          <Card title="Itinéraire optimal" paragraph="Planifiez votre itinéraire pour récupérer vos achats efficacement."/>
        </div>
        <Footer />
    </>
  )
}

export default ClientRegister