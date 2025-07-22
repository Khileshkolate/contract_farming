import React, { useState, useEffect } from 'react';
import { FaSeedling, FaBars, FaUserCircle, FaFileContract, FaBell,
         FaEdit, FaQuestionCircle, FaShareAlt, FaStar, FaSignOutAlt,
         FaHome, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


 const link = "https://contract-farming.onrender.com";

const Header = () => {
    // State to control the visibility of the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // State to store the count of pending negotiations for the notification badge
    const [negotiationsCount, setNegotiationsCount] = useState(0);
    // Hook for programmatic navigation
    const navigate = useNavigate();

    // Function to toggle the mobile menu open/close
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Array defining navigation links for the header and sidebar menu
    const navLinks = [
        { href: "/FarmerDashboard", label: "Home", icon: <FaHome /> },
        { href: "/Profile", label: "Profile", icon: <FaUserCircle /> },
        { href: "/ContractFormats", label: "Contract Form", icon: <FaFileContract /> },
        // Link to the dedicated NotificationsPage
        { href: "/NotificationsPage", label: "Notifications", icon: <FaBell /> },
        { href: "/Profile", label: "Update Profile", icon: <FaEdit /> },
        { href: "/ContactSupport", label: "Contact Support", icon: <FaQuestionCircle /> },
        { href: "/SocialShare", label: "Share", icon: <FaShareAlt /> },
        { href: "/RatingSystem", label: "Rate", icon: <FaStar /> },
        { href: "/dashboard", label: "Logout", icon: <FaSignOutAlt /> },
    ];

    // Effect hook to fetch the count of negotiations periodically
    useEffect(() => {
        const fetchNegotiationsCount = async () => {
            try {
                // Retrieve authentication token from local storage
                const token = localStorage.getItem('token');
                // Fetch negotiations data from the backend API
                const response = await fetch(`${link}/api/negotiations`, {
                    headers: { 'Authorization': `Bearer ${token}` } // Include authorization header
                });
                // Parse the JSON response
                const data = await response.json();
                // Update the negotiations count state
                setNegotiationsCount(data.length);
            } catch (error) {
                console.error('Error fetching negotiations count:', error);
            }
        };

        // Fetch immediately on component mount
        fetchNegotiationsCount();
        // Set up an interval to refetch the count every 3 seconds
        const interval = setInterval(fetchNegotiationsCount, 3000);
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <header className="bg-green-800 text-white shadow-md py-4 w-full relative">
            <div className="flex justify-between items-center px-8">
                {/* Menu toggle button for mobile view */}
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <FaBars className="text-3xl hover:text-yellow-400 transition-colors duration-300" />
                </button>

                {/* Application Logo and Title */}
                <div className="flex items-center space-x-1 animate-bounce">
                    <FaSeedling className="text-yellow-400 text-3xl" />
                    <h1 className="text-3xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">Digital Krishii</h1>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex">
                    <a href="/FarmerDashboard" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Home</a>
                    <a href="#" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Become a contract Farmer</a>
                    <a href="#" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Become a Buyer</a>
                    <a href="/ContactUs" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Contact Us</a>
                    <a href="/about" className="text-lg text-white font-semibold hover:underline hover:text-yellow-300 transition-all duration-300">About Us</a>
                </nav>

                {/* Right-aligned section: Notifications, User Info, and Profile Image */}
                <div className="flex items-center">
                    {/* Notification Bell Icon */}
                    <div className="relative mr-4">
                        <button
                            // Navigates to the NotificationsPage when clicked
                            onClick={() => navigate('/NotificationsPage')}
                            className="relative p-2 hover:bg-white/10 rounded-lg"
                        >
                            <FaBell className="w-6 h-6 text-yellow-400" />
                            {/* Display notification count badge if there are notifications */}
                            {negotiationsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center text-white">
                                    {negotiationsCount}
                                </span>
                            )}
                        </button>
                    </div>
                    {/* User Welcome Message and Logout Button */}
                    <div className="flex flex-col items-end mr-3">
                        <p className="text-md font-semibold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-md">
                            Welcome, <span className="font-bold">Farmer Khilesh</span>
                        </p>
                        <button onClick={() => navigate('/Dashboard')} className="relative bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">Logout</button>
                    </div>
                    {/* User Profile Image */}
                    <img src="src/Images/image.png" alt="Farmer Profile" className="w-12 h-12 rounded-full border-2 border-yellow-300 shadow-md" />
                </div>
            </div>

            {/* Mobile Menu Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex justify-between items-center bg-green-800">
                    <h2 className="text-xl font-bold">Menu</h2>
                    {/* Close menu button */}
                    <button onClick={toggleMenu} className="text-white hover:text-yellow-400 transition-colors duration-300">
                        <FaTimes className="text-2xl" />
                    </button>
                </div>
                {/* Mobile Navigation Links */}
                <nav className="py-4">
                    {navLinks.map((link, index) => (
                        <a key={index} href={link.href} className="flex items-center space-x-3 px-6 py-3 text-lg hover:bg-green-600 hover:text-yellow-300 transition-all duration-300">
                            {link.icon} <span>{link.label}</span>
                        </a>
                    ))}
                </nav>
            </div>
            {/* Overlay to close menu when clicking outside */}
            {isMenuOpen && <div onClick={toggleMenu} className="fixed inset-0 bg-black opacity-50 z-40"></div>}
        </header>
    );
};

export default Header;
