import React, { useState, useEffect } from 'react';
import { FaSeedling, FaBars, FaUserCircle, FaFileContract, FaBell, 
         FaEdit, FaQuestionCircle, FaShareAlt, FaStar, FaSignOutAlt, 
         FaHome, FaTimes, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LandsSection from './LandsSection.jsx';    
import EquipmentSection from './EquipmentSection';
import LandsSectionRent from './LandsSectionRent';
import Footer from './Footer';


const link = "https://contract-farming.onrender.com";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [negotiations, setNegotiations] = useState([]);
    const navigate = useNavigate();
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

    useEffect(() => {
        const fetchNegotiations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${link}/api/negotiations`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setNegotiations(data);
            } catch (error) {
                console.error('Error fetching negotiations:', error);
            }
        };
        fetchNegotiations();
        const interval = setInterval(fetchNegotiations, 3000);
        return () => clearInterval(interval);
    }, []);

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
                    <div className="relative mr-4">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 hover:bg-white/10 rounded-lg"
                        >
                            <FaBell className="w-6 h-6 text-yellow-400" />
                            {negotiations.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center text-white">
                                    {negotiations.length}
                                </span>
                            )}
                        </button>
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-96 bg-white/90 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-gray-200 z-[9999]">
                                <h3 className="text-lg font-bold text-green-800 mb-4">Negotiation Requests</h3>
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {negotiations.map(negotiation => {
                                        const sentAt = negotiation?.createdAt ? new Date(negotiation.createdAt) : null;
                                        const isValidSentDate = sentAt instanceof Date && !isNaN(sentAt);
                                        const receivedAt = new Date();
                                        
                                        const formattedSentTime = isValidSentDate ? 
                                            sentAt.toLocaleString('en-IN', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            }) : 'Time not available';

                                        const formattedReceivedTime = receivedAt.toLocaleString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        });

                                        return (
                                            <div key={negotiation._id} className="bg-green-50 p-4 rounded-lg border-2 border-green-200 hover:border-green-400 transition-all">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h4 className="text-green-800 font-medium">
                                                                    {negotiation.buyerId?.fName || 'Unknown Buyer'} {negotiation.buyerId?.lName}
                                                                </h4>
                                                                <p className="text-green-600 text-sm">
                                                                    {negotiation.buyerId?.email || 'No email provided'}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xs text-green-600 whitespace-nowrap">
                                                                    <span className="block text-[10px] text-green-500">Received at:</span>
                                                                    {formattedReceivedTime}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="bg-green-100 p-3 rounded-md mt-2">
                                                            <p className="text-green-800 text-sm italic">
                                                                "{negotiation.message || 'No message provided'}"
                                                            </p>
                                                            <p className="text-right text-xs text-green-600 mt-1">
                                                                Sent at: {formattedSentTime}
                                                            </p>
                                                        </div>
                                                        <div className="mt-3 text-sm text-green-700 space-y-1">
                                                            <p className="font-semibold">Contract Details:</p>
                                                            <div className="pl-2">
                                                                <p>Title: {negotiation.contractId?.title || 'Untitled'}</p>
                                                                <p>Original Price: ₹{(negotiation.contractId?.price || 0).toLocaleString('en-IN')}</p>
                                                                <p>Offered Price: ₹{(negotiation.proposedPrice || 0).toLocaleString('en-IN')}</p>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => navigate('/negotiation-details', { state: { negotiation } })}
                                                            className="mt-3 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors w-full flex items-center justify-center gap-2 text-sm"
                                                        >
                                                            <FaFileContract />
                                                            View Complete Negotiation
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {negotiations.length === 0 && (
                                        <div className="text-center py-4 bg-yellow-50 rounded-lg">
                                            <p className="text-green-600">No pending requests</p>
                                            <p className="text-xs text-gray-500 mt-1">New requests will appear here automatically</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-end mr-3">
                        <p className="text-md font-semibold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-md">
                            Welcome, <span className="font-bold">Farmer Khilesh</span>
                        </p>
                        <button onClick={() => navigate('/Dashboard')} className="relative bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">Logout</button>
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

const Card = ({ id, image, title, area, price, status, actionText, onDelete, onEdit }) => (
    <div className="bg-gray-100 border border-green-800 text-center p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-2" />
        <h4 className="bg-green-800 text-white py-1 rounded-md text-lg font-semibold">{title}</h4>
        <p className="text-gray-700 mt-1">{area}</p>
        {price && <p className="font-bold text-gray-900 mt-1">₹{price}</p>}
        {status && <p className={`font-bold mt-1 ${status === 'Available' ? 'text-green-600' : 'text-orange-500'}`}>{status}</p>}
        <div className="mt-3 flex gap-2">
            <button 
                onClick={onEdit}
                className="block bg-green-800 text-white py-2 rounded-md hover:bg-green-600 transition flex-1"
            >
                {actionText}
            </button>
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
    const [showAll, setShowAll] = useState({ contracts: false });
    const [formData, setFormData] = useState({ image: '', title: '', area: '' });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (endpoint, setter) => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${link}/api/${endpoint}`, {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const method = editId ? 'PUT' : 'POST';
            const url = editId 
                ? `${link}/api/contracts/${editId}`
                : `${link}/api/contracts`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (editId) {
                setContracts(prev => prev.map(contract => 
                    contract._id === editId ? data : contract
                ));
            } else {
                setContracts(prev => [...prev, data]);
            }

            setFormData({ image: '', title: '', area: '' });
            setEditId(null);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contract?')) {
            try {
                const token = localStorage.getItem('token');
                await fetch(`${link}/api/contracts/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setContracts(prev => prev.filter(contract => contract._id !== id));
            } catch (error) {
                console.error('Delete error:', error);
            }
        }
    };

    const handleEdit = (contract) => {
        setFormData({
            image: contract.image,
            title: contract.title,
            area: contract.area
        });
        setEditId(contract._id);
    };

    const toggleShowAll = (section) => {
        setShowAll(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full">
            <Header />
            <main className="py-6 px-4 w-full">
                <section className="w-full bg-green-800 text-white text-center py-10 rounded-md shadow-lg mb-3">
                    <h2 className="text-3xl font-bold">Get Assured Prices For Your Produce With Contract Farming</h2>
                    <p className="text-lg mt-2 max-w-4xl mx-auto">Contract farming offers a strategic solution by establishing pre-agreed terms between farmers and buyers, ensuring a stable and reliable market for agricultural produce.</p>
                </section>

                <SectionTitle title="Contract Farming" />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 w-full">
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contracts
                                .slice(0, showAll.contracts ? contracts.length : 3)
                                .map(item => (
                                    <Card
                                        key={item._id}
                                        id={item._id}
                                        image={item.image}
                                        title={item.title}
                                        area={item.area}
                                        price={item.price}
                                        status={item.status}
                                        actionText="Add Info"
                                        onDelete={handleDelete}
                                        onEdit={() => handleEdit(item)}
                                    />
                                ))}
                        </div>
                        {contracts.length > 3 && (
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => toggleShowAll('contracts')}
                                    className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-500 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 mx-auto"
                                >
                                    {showAll.contracts ? (
                                        <>
                                            <FaChevronUp className="inline-block" />
                                            Show Less
                                        </>
                                    ) : (
                                        <>
                                            <FaChevronDown className="inline-block" />
                                            View All ({contracts.length - 3}+)
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-4 mx-4">
                        <h3 className="text-lg font-semibold mb-4">
                            {editId ? 'Edit Contract' : 'Add New Contract'}
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="url"
                                placeholder="Image URL"
                                name="image"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded text-sm md:text-base focus:ring-2 focus:ring-green-600"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Crop Name"
                                name="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded text-sm md:text-base focus:ring-2 focus:ring-green-600"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Land Area"
                                name="area"
                                value={formData.area}
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded text-sm md:text-base focus:ring-2 focus:ring-green-600"
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-green-800 text-white py-3 rounded hover:bg-green-600 transition text-sm md:text-base font-semibold mt-4"
                        >
                            {editId ? 'Update Contract' : 'Create Contract'}
                        </button>
                        {editId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({ image: '', title: '', area: '' });
                                    setEditId(null);
                                }}
                                className="w-full bg-gray-500 text-white py-3 rounded hover:bg-gray-600 transition text-sm md:text-base font-semibold mt-2"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </form>
                </div>

                <LandsSection/>
                <LandsSectionRent />
                <EquipmentSection />
            </main>
            <Footer />
        </div>
    );
};

export default FarmerDashboard;