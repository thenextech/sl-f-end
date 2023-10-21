import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Card from "./components/Card"
import HowItWorks from "./components/HowItWorks"
import VFPHome from "./components/VFPHome"

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="lg:flex items-center">
        <Card title="Click and collect simplifié" paragraph="Parcourez et réservez vos achats en un seul clic."/>
        <Card title="Programme de fidélité avantageux" paragraph="Accumulez des points de fidélité pour des avantages exclusifs."/>
        <Card title="Itinéraire optimal" paragraph="Planifiez votre itinéraire pour récupérer vos achats efficacement."/>
      </div>
      <HowItWorks />
      <VFPHome />
    </>
  )
}

export default App
