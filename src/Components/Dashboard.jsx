import React from "react";
import { useNavigate } from "react-router-dom";
import { Tractor, Leaf, Home, Phone, Info, Search } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  
  //const [chatOpen, setChatOpen] = useState(false);
 // const [messages, setMessages] = useState([]);
 // const [input, setInput] = useState("");

  return (
    <div className="bg-[url('/path-to-farming-background.jpg')] bg-cover bg-no-repeat min-h-screen w-full">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-900 to-green-600 text-white p-4 shadow-xl w-full">
        <div className="flex flex-wrap justify-between items-center w-full">
          <div className="flex items-center space-x-3">
            <Tractor className="w-8 h-8 text-lime-200" />
            <h1 className="text-3xl font-extrabold">Digital Krishii</h1>
          </div>

          <nav className="flex space-x-4 text-lg items-center">
            <a href="/" className="flex items-center gap-1 hover:text-lime-300">
              <Home className="w-5 h-5" /> Home
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-lime-300">
              <Leaf className="w-5 h-5" /> Contract Farmer
            </a>
            
            <a href="/ContactUs" className="flex items-center gap-1 hover:text-lime-300">
              <Phone className="w-5 h-5" /> Contact Us
            </a>
            
            <button onClick={() => navigate("/about")} className="hover:text-lime-300 flex items-center gap-1">
               <Info className="w-5 h-5" /> About Us
            </button>

            <button
              className="px-4 py-2 rounded-full bg-white text-green-800 border border-green-700 hover:bg-green-700 hover:text-white transition-transform hover:scale-105 shadow-md"
              onClick={() => navigate("/Farmer_Login")}
            >
              Farmer Login
            </button>
            <button
              className="px-4 py-2 rounded-full bg-white text-green-800 border border-green-700 hover:bg-green-700 hover:text-white transition-transform hover:scale-105 shadow-md"
              onClick={() => navigate("/Buyer_Login")}
            >
              Buyer Login
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full border border-green-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
            <select className="p-2 rounded-full bg-white text-green-800 border border-green-500 focus:outline-none focus:ring-2 focus:ring-lime-400 hover:bg-green-700 hover:text-white transition-colors">
              <option>English</option>
              <option>Marathi</option>
              <option>Hindi</option>
              <option>Gujarati</option>
            </select>
          </nav>

          {/* Hero Section */}
          <section className="bg-green-700 text-white py-10 px-4 rounded-r-[3%] mr-[3%] mt-[2%]">
            <h2 className="text-3xl font-bold text-center">
              Get Assured Prices For Your Produce With Contract Farming
            </h2>
            <p className="text-lg mt-2 text-center">
              Contract farming offers a strategic solution by establishing pre-agreed terms between farmers and buyers.
            </p>
          </section>
        </div>
      </header>

      {/* Cards Section */}
      <Section title="Contracts For Farmers" data={farmerContracts} />
      <Section title="Lands Available For Contract Farming" data={landContracts} />
      <Section title="Land Available For Rent" data={landRent} />
      <Section title="Products Available" data={products} customImageClass="object-contain h-40 w-full border rounded-lg transform transition-transform duration-500 hover:scale-110 hover:shadow-2xl" />
    </div>
  );
};

const Section = ({ title, data, customImageClass }) => (
  <section className="w-full my-8 px-4">
    <div className="bg-green-800 text-white text-center py-3 rounded-lg text-xl font-bold mb-4">
      {title}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-lg p-4 rounded-lg text-center hover:shadow-2xl transform transition-transform duration-500 hover:scale-105"
        >
          <img
            src={item.img}
            alt={item.title}
            className={customImageClass || "w-full h-40 object-cover rounded-lg transform transition-transform duration-500 hover:scale-110 hover:shadow-2xl"}
          />
          <h4 className="mt-2 text-lg font-bold bg-green-700 text-white py-1 rounded-lg">{item.title}</h4>
          <p className="mt-1 bg-green-100 p-2 rounded-lg">{item.detail}</p>
        </div>
        
      ))}
    </div>
    
    
  </section>
);

const farmerContracts = [
  { img: "src/Images/Pic1.jpg", title: "Barley Seeds", detail: "32 Acres" },
  { img: "src/Images/2.jpg", title: "Onion Seeds", detail: "12 Acres" },
  { img: "src/Images/3.jpg", title: "Poultry Farm", detail: "10 Acres" },
  { img: "src/Images/4.jpeg", title: "Fish Farming", detail: "30 Acres" },
];


const landContracts = [
  { img: "src/Images/5.jpg", title: "Haryana", detail: "32 Acres" },
  { img: "src/Images/6.webp", title: "Uttar Pradesh", detail: "12 Acres" },
  { img: "src/Images/7.webp", title: "Madhya Pradesh", detail: "10 Acres" },
  { img: "src/Images/8.jpg", title: "Gujarat", detail: "30 Acres" },
];

const landRent = [
  { img: "src/Images/5.jpg", title: "Maharashtra", detail: "Currently Available - 29 Acres" },
  { img: "src/Images/6.webp", title: "Madhya Pradesh", detail: "Pre Booking - 39 Acres" },
  { img: "src/Images/7.webp", title: "Uttar Pradesh", detail: "Pre Booking - 29 Acres" },
  { img: "src/Images/8.jpg", title: "Haryana", detail: "Pre Booking - 49 Acres" },
];

const products = [
  { img: "src/Images/2-pcs-gardening-pruner-heavy-roll-cutter-2-asgardening-original-imah4qj9xzpfmcmm.webp", title: "Gardening Pruner", detail: "Rs.499" },
  { img: "src/Images/8-mw06901-10-farm-cult-original-imag75vmfrxvmpev.webp", title: "Manual Weeder", detail: "Rs.359" },
  { img: "src/Images/manual-0102p-dual-samie-original-imah6y6fmaccwcye.webp", title: "Automatic Weeder", detail: "Rs.5,999" },
  { img: "src/Images/heavy-duty-hedge-shears-cutter-wooden-handle-4tools-orange-original-imagtr9vyhdfcwkg.webp", title: "Hedge Shears", detail: "Rs.299" },
];

export default Dashboard;
