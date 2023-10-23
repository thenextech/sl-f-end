import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LoginHero from '../components/LoginHero'
import Card from '../components/Card'

function Login() {
  return (
    <>
        <Navbar />
        <LoginHero />
        <div className="lg:flex items-center md:flex items-center">
          <Card title="Augmentation des ventes" paragraph="Attirez d’avantage de clients qui préfèrent commander en ligne "/>
          <Card title="Optimisation des opérations en magasin" paragraph="Organisez mieux vos opérations en minimisant le temps d’attente des clients"/>
          <Card title="Fidélisation" paragraph="Grâce au programme de fidelité, fidélisez les clients en les récompensant avec des cadeaux de votre choix"/>
        </div>
        <Footer />
    </>
  )
}

export default Login