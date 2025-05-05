import React, { useState, useEffect } from 'react';
import { FaSeedling, FaBars, FaUserCircle, FaFileContract, FaBell, 
         FaEdit, FaQuestionCircle, FaShareAlt, FaStar, FaSignOutAlt, 
         FaHome, FaTimes, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import LandsSection from './LandsSection.jsx';    
import EquipmentSection from './EquipmentSection';
import LandsSectionRent from './LandsSectionRent';    

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { href: "/FarmerDashboard", label: "Home", icon: <FaHome /> },
        { href: "/Profile", label: "Profile", icon: <FaUserCircle /> },
        { href: "/ContractFormats", label: "Contract Form", icon: <FaFileContract /> },
        { href: "/NotificationsPage", label: "Notifications", icon: <FaBell /> },
        { href: "/Profile", label: "Update Profile", icon: <FaEdit /> },
        { href: "/ContactSupport", label: "Contact Support", icon: <FaQuestionCircle /> },
        { href: "/SocialShare", label: "Share", icon: <FaShareAlt /> },
        { href: "/RatingSystem", label: "Rate", icon: <FaStar /> },
        { href: "/dashboard", label: "Logout", icon: <FaSignOutAlt /> },
    ];

    return (
        <header className="bg-green-800 text-white shadow-md py-4 w-full relative">
            <div className="flex justify-between items-center px-8">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <FaBars className="text-3xl hover:text-yellow-400 transition-colors duration-300" />
                </button>

                <div className="flex items-center space-x-1 animate-bounce">
                    <FaSeedling className="text-yellow-400 text-3xl" />
                    <h1 className="text-3xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">Digital Krishii</h1>
                </div>

                <nav className="hidden md:flex">
                    <a href="/FarmerDashboard" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Home</a>
                    <a href="#" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Become a contract Farmer</a>
                    <a href="#" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Become a Buyer</a>
                    <a href="/ContactUs" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Contact Us</a>
                    <a href="/about" className="text-lg text-white font-semibold hover:underline hover:text-yellow-300 transition-all duration-300">About Us</a>
                </nav>

                <div className="flex items-center">
                    <div className="flex flex-col items-end mr-3">
                        <p className="text-md font-semibold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-md">
                            Welcome, <span className="font-bold">Farmer Khilesh</span>
                        </p>
                        <a href="Dashboard" className="relative bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">Logout</a>
                    </div>
                    <img src="src/Images/image.png" alt="Farmer Profile" className="w-12 h-12 rounded-full border-2 border-yellow-300 shadow-md" />
                </div>
            </div>

            <div className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex justify-between items-center bg-green-800">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button onClick={toggleMenu} className="text-white hover:text-yellow-400 transition-colors duration-300">
                        <FaTimes className="text-2xl" />
                    </button>
                </div>
                <nav className="py-4">
                    {navLinks.map((link, index) => (
                        <a key={index} href={link.href} className="flex items-center space-x-3 px-6 py-3 text-lg hover:bg-green-600 hover:text-yellow-300 transition-all duration-300">
                            {link.icon} <span>{link.label}</span>
                        </a>
                    ))}
                </nav>
            </div>

            {isMenuOpen && <div onClick={toggleMenu} className="fixed inset-0 bg-black opacity-50 z-40"></div>}
        </header>
    );
};

const SectionTitle = ({ title }) => (
    <div className="text-center bg-green-800 text-white py-3 text-lg font-bold rounded-md mb-6 w-full">
        {title}
    </div>  
);

const Card = ({ id, image, title, area, price, status, actionText, actionLink, onDelete }) => (
    <div className="bg-gray-100 border border-green-800 text-center p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-2" />
      <h4 className="bg-green-800 text-white py-1 rounded-md text-lg font-semibold">{title}</h4>
      <p className="text-gray-700 mt-1">{area}</p>
      {price && <p className="font-bold text-gray-900 mt-1">₹{price}</p>}
      {status && <p className={`font-bold mt-1 ${status === 'Available' ? 'text-green-600' : 'text-orange-500'}`}>{status}</p>}
      <div className="mt-3 flex gap-2">
        <a href={actionLink} className="block bg-green-800 text-white py-2 rounded-md hover:bg-green-600 transition flex-1">
          {actionText}
        </a>
        <button 
          onClick={() => onDelete(id)} 
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-800 transition"
        >
          <FaTrash />
        </button>
      </div>
    </div>
);

const FarmerDashboard = () => {
    const [contracts, setContracts] = useState([]);
    const [availableLands, setAvailableLands] = useState([]);
    const [rentLands, setRentLands] = useState([]);
    const [products, setProducts] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [showAll, setShowAll] = useState({
        contracts: false,
        lands: false,
        rents: false,
        products: false,
        equipment: false
    });

    const initialFormState = {
        contracts: { image: "", title: "", area: "" },
        lands: { image: "", title: "", area: "", price: "", status: "Available" },
        rents: { image: "", title: "", area: "", price: "", status: "Available" },
        products: { image: "", title: "", area: "", price: "", status: "Available" },
        equipment: { image: "", title: "", area: "", price: "", status: "Available" }
    };
    const [forms, setForms] = useState(initialFormState);

    useEffect(() => {
        const fetchData = async (endpoint, setter) => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setter(data);
                }
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
            }
        };

        fetchData('contracts', setContracts);
        fetchData('lands', setAvailableLands);
        fetchData('rents', setRentLands);
        fetchData('products', setProducts);
        fetchData('equipment', setEquipment);
    }, []);

    const handleDelete = async (id, endpoint, setter) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login again');
                window.location = '/login';
                return;
            }

            const response = await fetch(`http://localhost:5000/api/${endpoint}/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete item');
            }

            setter(prev => prev.filter(item => item._id !== id));
            alert('Item deleted successfully!');
        } catch (error) {
            console.error('Delete error:', error);
            alert(error.message || 'Error deleting item');
        }
    };

    const handleFormChange = (section, e) => {
        setForms(prev => ({
            ...prev,
            [section]: { ...prev[section], [e.target.name]: e.target.value }
        }));
    };

    const handleSubmit = async (e, section, endpoint, setter) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('/api/contracts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              title: forms.contracts.title,
              description: 'Contract description',
              price: 5000, // Example value
              duration: 90 // Example value
            })
          });
      
          if (response.ok) {
            const newContract = await response.json();
            setContracts(prev => [...prev, newContract]);
          }
        } catch (error) {
          console.error('Contract creation error:', error);
        }
      };

    const toggleShowAll = (section) => {
        setShowAll(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const renderSection = (section, endpoint, setter, title, fields) => (
        <>
            <SectionTitle title={title} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 w-full">
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {section
                            .slice(0, showAll[endpoint] ? section.length : 3)
                            .map(item => (
                                <Card
                                    key={item._id}
                                    id={item._id}
                                    {...item}
                                    onDelete={(id) => handleDelete(id, endpoint, setter)}
                                />
                            ))}
                    </div>
                    {section.length > 3 && (
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => toggleShowAll(endpoint)}
                                className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-500 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mx-auto"
                            >
                                {showAll[endpoint] ? (
                                    <>
                                        <FaChevronUp className="inline-block" />
                                        Show Less
                                    </>
                                ) : (
                                    <>
                                        <FaChevronDown className="inline-block" />
                                        View All ({section.length - 3}+)
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                <form 
                    onSubmit={(e) => handleSubmit(e, endpoint, endpoint, setter)} 
                    className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-4 mx-4"
                >
                    <h3 className="text-lg font-semibold mb-4">Add New {title.split(' ')[0]}</h3>
                    {fields.map((field) => (
                        field.type === 'select' ? (
                            <div key={field.name} className="mb-4">
                                <select
                                    name={field.name}
                                    value={forms[endpoint][field.name]}
                                    onChange={(e) => handleFormChange(endpoint, e)}
                                    className="w-full p-3 border border-gray-300 rounded text-sm md:text-base focus:ring-2 focus:ring-green-600"
                                    required
                                >
                                    {field.options.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div key={field.name} className="mb-4">
                                <input
                                    type="text"
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={forms[endpoint][field.name]}
                                    onChange={(e) => handleFormChange(endpoint, e)}
                                    className="w-full p-3 border border-gray-300 rounded text-sm md:text-base focus:ring-2 focus:ring-green-600"
                                    required
                                />
                            </div>
                        )
                    ))}
                    <button 
                        type="submit" 
                        className="w-full bg-green-800 text-white py-3 rounded hover:bg-green-600 transition text-sm md:text-base font-semibold"
                    >
                        Add New Contract
                    </button>
                </form>
            </div>
        </>
    );

    return (
        <div className="bg-gray-100 min-h-screen w-full">
            <Header />
            <main className="py-6 px-4 w-full">
                <section className="w-full bg-green-800 text-white text-center py-10 rounded-md shadow-lg mb-3">
                    <h2 className="text-3xl font-bold">Get Assured Prices For Your Produce With Contract Farming</h2>
                    <p className="text-lg mt-2 max-w-4xl mx-auto">Contract farming offers a strategic solution by establishing pre-agreed terms between farmers and buyers, ensuring a stable and reliable market for agricultural produce.</p>
                </section>

                {renderSection(contracts, 'contracts', setContracts, 'Contracts For Farmers', [
                    { name: 'image', placeholder: 'Image URL' },
                    { name: 'title', placeholder: 'Crop Name' },
                    { name: 'area', placeholder: 'Land Area' }
                ])}
                
                <LandsSection/>
                <LandsSectionRent />
                <EquipmentSection />
            </main>
        </div>
    );
};

export default FarmerDashboard;