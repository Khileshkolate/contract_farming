import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard.jsx"; // ✅ Ensure correct extension
import Farmer_Login from "./Components/Farmer_Login.jsx"; // ✅ Ensure correct extension
import Buyer_Login from "./Components/Buyer_Login.jsx";
import ContactUs from "./Components/ContactUs.jsx";
import AboutUs from "./Components/AboutUs.jsx";
import FarmerDashboard from "./Components/FarmerDashboard.jsx";
import Profile from "./Components/Profile.jsx";
import ContactSupport from "./Components/ContactSupport.jsx";
import RatingSystem from "./Components/RatingSystem.jsx";
import SocialShare from "./Components/SocialShare.jsx";
import NotificationsPage from "./Components/NotificationsPage.jsx";
import ContractFormats from "./Components/ContractFormats.jsx";








function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Farmer_Login" element={<Farmer_Login/>} />
        <Route path="/Buyer_Login" element={<Buyer_Login />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/FarmerDashboard" element={<FarmerDashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ContactSupport" element={<ContactSupport />} />
        <Route path="/RatingSystem" element={<RatingSystem />} />
        <Route path="/SocialShare" element={<SocialShare />} />
        <Route path="/NotificationsPage" element={<NotificationsPage />} />
        <Route path="/ContractFormats" element={<ContractFormats />} />
  
        
        
     
       
        
      </Routes>
    </Router>
  );
}

export default App;
