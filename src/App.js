import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import MerchantRegister from './pages/MerchantRegister'
import MerchantLogin from './pages/MerchantLogin'
import ClientRegister from "./pages/ClientRegister"
import ClientLogin from "./pages/ClientLogin";
import ClientDashboard from "./pages/ClientDashboard";
import ClientVerify from "./components/clients/ClientVerify";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home />} />
          <Route path="/m/register" element = {<MerchantRegister />} />
          <Route path="/m/login" element = {<MerchantLogin />} />
          <Route path="/client/login" element = {<ClientLogin />} />
          <Route path="/client/dashboard" element = {<ClientDashboard />}/>
          <Route path="/client/register" element = {<ClientRegister />} />
          <Route path="/client/verify" element = {<ClientVerify />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
