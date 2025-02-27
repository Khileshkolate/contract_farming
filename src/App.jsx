import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard.jsx"; // ✅ Ensure correct extension
import Farmer_Login from "./Components/Farmer_Login.jsx"; // ✅ Ensure correct extension
import Buyer_Login from "./Components/Buyer_Login.jsx";
import ContactUs from "./Components/ContactUs.jsx";
import AboutUs from "./Components/AboutUs.jsx";







function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Farmer_Login" element={<Farmer_Login/>} />
        <Route path="/Buyer_Login" element={<Buyer_Login />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
      
     
       
        
      </Routes>
    </Router>
  );
}

export default App;
