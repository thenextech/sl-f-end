import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import MerchantRegister from './pages/MerchantRegister'
import MerchantLogin from './pages/MerchantLogin'
import ClientRegister from "./pages/ClientRegister"
import ClientLogin from "./pages/ClientLogin";
import ClientDashboard from "./pages/ClientDashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home />} />
          <Route path="/m/register" element = {<MerchantRegister />} />
          <Route path="/m/login" element = {<MerchantLogin />} />
          <Route path="/register" element = {<ClientRegister />} />
          <Route path="/login" element = {<ClientLogin />} />
          <Route path="/dashboard" element = {<ClientDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
