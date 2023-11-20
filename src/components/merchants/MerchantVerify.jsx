import React from 'react'
import HomeNavbar from '../HomeNavbar'
import Footer from '../Footer'
import MerchantVerifyHero from './MerchantVerifyHero'
import Card from '../Card'

function MerchantVerify() {
  return (
    <>
        <HomeNavbar />
        <MerchantVerifyHero />
        <div className="lg:flex items-center md:flex items-center">
          <Card title="Augmentation des ventes" paragraph="Attirez d’avantage de clients qui préfèrent commander en ligne "/>
          <Card title="Optimisation des opérations en magasin" paragraph="Organisez mieux vos opérations en minimisant le temps d’attente des clients"/>
          <Card title="Fidélisation" paragraph="Grâce au programme de fidelité, fidélisez les clients en les récompensant avec des cadeaux de votre choix"/>
        </div>
        <Footer />
    </>
  )
}

export default MerchantVerify