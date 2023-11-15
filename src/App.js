import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import MerchantRegister from './pages/MerchantRegister';
import MerchantLogin from './pages/MerchantLogin';
import MerchantDashboard from "./pages/MerchantDashboard";
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
          <Route path="/merchant/register" element = {<MerchantRegister />} />
          <Route path="/merchant/login" element = {<MerchantLogin />} />
          <Route path="/merchant/dashboard" element = {<MerchantDashboard />} />
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
