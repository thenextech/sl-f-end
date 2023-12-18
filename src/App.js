import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import MerchantRegister from './pages/MerchantRegister';
import MerchantLogin from './pages/MerchantLogin';
import MerchantOrders from "./pages/MerchantOrders";
import ClientRegister from "./pages/ClientRegister"
import ClientLogin from "./pages/ClientLogin";
import ClientDashboard from "./pages/ClientDashboard";
import ClientVerify from "./components/clients/ClientVerify";
import MerchantCategories from "./pages/MerchantCategories";
import MerchantDashboard from "./pages/MerchantDashboard";
import MerchantVerify from "./components/merchants/MerchantVerify";
import AdminDashboard from "./pages/AdminDashboard";
import MerchantProducts from "./pages/MerchantProducts";
import { ShoppingCartProvider } from "./components/clients/shoppingCart/ShoppingCartContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ShoppingCartProvider>
          <Routes>
            <Route index element = {<Home />} />
            <Route path="/merchant/register" element = {<MerchantRegister />} />
            <Route path="/merchant/login" element = {<MerchantLogin />} />
            <Route path="/merchant/orders" element = {<MerchantOrders />} />
            <Route path="/merchant/category" element = {<MerchantCategories />} />
            <Route path="/merchant/dashboard" element = {<MerchantDashboard />} />
            <Route path="/merchant/verify" element = {<MerchantVerify />} />
            <Route path="/client/dashboard" element = {<ClientDashboard />}/>
            <Route path="/client/merchantProducts/:idMerchant" element = {<MerchantProducts />} />
            <Route path="/client/login" element = {<ClientLogin />} />
            <Route path="/client/register" element = {<ClientRegister />} />
            <Route path="/client/verify" element = {<ClientVerify />} />
            <Route path="/admin/dashboard" element = {<AdminDashboard />} />
          </Routes>        
        </ShoppingCartProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
