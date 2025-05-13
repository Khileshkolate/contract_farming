import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard.jsx";
import Farmer_Login from "./Components/Farmer_Login.jsx";
import Buyer_Login from "./Components/Buyer_Login.jsx";
import ContactUs from "./Components/ContactUs.jsx";
import AboutUs from "./Components/AboutUs.jsx";
import FarmerDashboard from "./Components/FarmerDashboard.jsx";
import Profile from "./Components/Profile.jsx";
import ContactSupport from "./Components/ContactSupport.jsx";
import RatingSystem from "./Components/RatingSystem.jsx";
import ContractFormats from "./Components/ContractFormats.jsx";
import BuyerDashboard from "./Components/BuyerDashboard.jsx";
import ContractCard from "./Components/ContractCard.jsx";
import './i18n';
import NegotiationDetails from './Components/NegotiationDetails';



function App() {
  return (
    
    <Suspense fallback={<div>Loading...</div>}>
      
      <Router>

        
        <Routes>
          <Route path="/" element={<Navigate to="/Dashboard" replace />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Farmer_Login" element={<Farmer_Login />} />
          <Route path="/Buyer_Login" element={<Buyer_Login />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/FarmerDashboard" element={<FarmerDashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ContactSupport" element={<ContactSupport />} />
          <Route path="/RatingSystem" element={<RatingSystem />} />
        
          <Route path="/ContractFormats" element={<ContractFormats />} />
          <Route path="/BuyerDashboard" element={<BuyerDashboard />} />
          <Route path="/ContractCard" element={<ContractCard />} />
         <Route path="/NegotiationDetails/:id" element={<NegotiationDetails />} />

    
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;