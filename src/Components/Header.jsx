// import React, { useState, useEffect } from 'react';
// import { FaSeedling, FaBars, FaUserCircle, FaFileContract, FaBell,
//          FaEdit, FaQuestionCircle, FaShareAlt, FaStar, FaSignOutAlt,
//          FaHome, FaTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';


//  const link = import.meta.env.VITE_BACKEND;

// const Header = () => {
//     // State to control the visibility of the mobile menu
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     // State to store the count of pending negotiations for the notification badge
//     const [negotiationsCount, setNegotiationsCount] = useState(0);
//     // Hook for programmatic navigation
//     const navigate = useNavigate();

//     // Function to toggle the mobile menu open/close
//     const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//     // Array defining navigation links for the header and sidebar menu
//     const navLinks = [
//         { href: "/FarmerDashboard", label: "Home", icon: <FaHome /> },
//         { href: "/Profile", label: "Profile", icon: <FaUserCircle /> },
//         { href: "/ContractFormats", label: "Contract Form", icon: <FaFileContract /> },
//         // Link to the dedicated NotificationsPage
//         { href: "/NotificationsPage", label: "Notifications", icon: <FaBell /> },
//         { href: "/Profile", label: "Update Profile", icon: <FaEdit /> },
//         { href: "/ContactSupport", label: "Contact Support", icon: <FaQuestionCircle /> },
//         { href: "/SocialShare", label: "Share", icon: <FaShareAlt /> },
//         { href: "/RatingSystem", label: "Rate", icon: <FaStar /> },
//         { href: "/dashboard", label: "Logout", icon: <FaSignOutAlt /> },
//     ];

//     // Effect hook to fetch the count of negotiations periodically
//     useEffect(() => {
//         const fetchNegotiationsCount = async () => {
//             try {
//                 // Retrieve authentication token from local storage
//                 const token = localStorage.getItem('token');
//                 // Fetch negotiations data from the backend API
//                 const response = await fetch(`${link}/api/negotiations`, {
//                     headers: { 'Authorization': `Bearer ${token}` } // Include authorization header
//                 });
//                 // Parse the JSON response
//                 const data = await response.json();
//                 // Update the negotiations count state
//                 setNegotiationsCount(data.length);
//             } catch (error) {
//                 console.error('Error fetching negotiations count:', error);
//             }
//         };

//         // Fetch immediately on component mount
//         fetchNegotiationsCount();
//         // Set up an interval to refetch the count every 3 seconds
//         const interval = setInterval(fetchNegotiationsCount, 3000);
//         // Clean up the interval when the component unmounts
//         return () => clearInterval(interval);
//     }, []); // Empty dependency array ensures this runs once on mount

//     return (
//         <header className="bg-green-800 text-white shadow-md py-4 w-full relative">
//             <div className="flex justify-between items-center px-8">
//                 {/* Menu toggle button for mobile view */}
//                 <button onClick={toggleMenu} className="text-white focus:outline-none">
//                     <FaBars className="text-3xl hover:text-yellow-400 transition-colors duration-300" />
//                 </button>

//                 {/* Application Logo and Title */}
//                 <div className="flex items-center space-x-1 animate-bounce">
//                     <FaSeedling className="text-yellow-400 text-3xl" />
//                     <h1 className="text-3xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">Digital Krishii</h1>
//                 </div>

//                 {/* Desktop Navigation Links */}
//                 <nav className="hidden md:flex">
//                     <a href="/FarmerDashboard" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Home</a>
//                     <a href="#" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Become a contract Farmer</a>
//                     <a href="#" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Become a Buyer</a>
//                     <a href="/ContactUs" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Contact Us</a>
//                     <a href="/about" className="text-lg text-white font-semibold hover:underline hover:text-yellow-300 transition-all duration-300">About Us</a>
//                 </nav>

//                 {/* Right-aligned section: Notifications, User Info, and Profile Image */}
//                 <div className="flex items-center">
//                     {/* Notification Bell Icon */}
//                     <div className="relative mr-4">
//                         <button
//                             // Navigates to the NotificationsPage when clicked
//                             onClick={() => navigate('/NotificationsPage')}
//                             className="relative p-2 hover:bg-white/10 rounded-lg"
//                         >
//                             <FaBell className="w-6 h-6 text-yellow-400" />
//                             {/* Display notification count badge if there are notifications */}
//                             {negotiationsCount > 0 && (
//                                 <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center text-white">
//                                     {negotiationsCount}
//                                 </span>
//                             )}
//                         </button>
//                     </div>
//                     {/* User Welcome Message and Logout Button */}
//                     <div className="flex flex-col items-end mr-3">
//                         <p className="text-md font-semibold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-md">
//                             Welcome, <span className="font-bold">Farmer Khilesh</span>
//                         </p>
//                         <button onClick={() => navigate('/Dashboard')} className="relative bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">Logout</button>
//                     </div>
//                     {/* User Profile Image */}
//                     <img src="src/Images/image.png" alt="Farmer Profile" className="w-12 h-12 rounded-full border-2 border-yellow-300 shadow-md" />
//                 </div>
//             </div>

//             {/* Mobile Menu Sidebar */}
//             <div className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//                 <div className="p-4 flex justify-between items-center bg-green-800">
//                     <h2 className="text-xl font-bold">Menu</h2>
//                     {/* Close menu button */}
//                     <button onClick={toggleMenu} className="text-white hover:text-yellow-400 transition-colors duration-300">
//                         <FaTimes className="text-2xl" />
//                     </button>
//                 </div>
//                 {/* Mobile Navigation Links */}
//                 <nav className="py-4">
//                     {navLinks.map((link, index) => (
//                         <a key={index} href={link.href} className="flex items-center space-x-3 px-6 py-3 text-lg hover:bg-green-600 hover:text-yellow-300 transition-all duration-300">
//                             {link.icon} <span>{link.label}</span>
//                         </a>
//                     ))}
//                 </nav>
//             </div>
//             {/* Overlay to close menu when clicking outside */}
//             {isMenuOpen && <div onClick={toggleMenu} className="fixed inset-0 bg-black opacity-50 z-40"></div>}
//         </header>
//     );
// };

// export default Header;









import React, { useState, useEffect } from 'react';
import { FaSeedling, FaBars, FaUserCircle, FaFileContract, FaBell,
         FaEdit, FaQuestionCircle, FaShareAlt, FaStar, FaSignOutAlt,
         FaHome, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const link = import.meta.env.VITE_BACKEND;

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [negotiations, setNegotiations] = useState([]);
    const [userName, setUserName] = useState('Guest');
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
                
                if (!response.ok) throw new Error('Failed to fetch');
                
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
    
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }
                const response = await fetch(`${link}/api/user/profile`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUserName(`${userData.fName} ${userData.lName}`);
                } else {
                    setUserName('User');
                }
            } catch (error) {
                setUserName('User');
            }
        };
        fetchUserName();
    }, []);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-green-800 text-white shadow-md py-4 w-full z-50">
                <div className="flex justify-between items-center px-4 md:px-8">
                    <div className="flex items-center">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <FaBars className="text-2xl md:text-3xl hover:text-yellow-400 transition-colors duration-300" />
                        </button>
                        
                        <div className="md:hidden flex items-center space-x-1 ml-3">
                            <FaSeedling className="text-yellow-400 text-xl" />
                            <h1 className="text-lg font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">Digital Krishii</h1>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-1 ml-4">
                            <FaSeedling className="text-yellow-400 text-3xl" />
                            <h1 className="text-3xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">Digital Krishii</h1>
                        </div>
                    </div>

                    <nav className="hidden md:flex flex-grow justify-center mx-4">
                        <div className="flex space-x-4">
                            <a href="/FarmerDashboard" className="text-lg text-white font-semibold hover:underline hover:text-yellow-300 transition-all duration-300">Home</a>
                            <a href="#" className="text-lg text-white font-semibold hover:underline hover:text-yellow-300 transition-all duration-300">Become a contract Farmer</a>
                            <a href="#" className="text-lg text-white font-semibold hover:underline hover:text-yellow-300 transition-all duration-300">Become a Buyer</a>
                            <a href="/ContactUs" className="text-lg text-white font-semibold hover:underline hover:text-yellow-300 transition-all duration-300">Contact Us</a>
                            <a href="/about" className="text-lg text-white font-semibold hover:underline hover:text-yellow-300 transition-all duration-300">About Us</a>
                        </div>
                    </nav>

                    <div className="flex items-center">
                        <div className="relative mr-2 md:mr-4">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2 hover:bg-white/10 rounded-lg"
                            >
                                <FaBell className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                                {negotiations.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-white">
                                        {negotiations.length}
                                    </span>
                                )}
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white/90 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-gray-200 z-[9999]">
                                    <h3 className="text-lg font-bold text-green-800 mb-4">Negotiation Requests</h3>
                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {negotiations.map(negotiation => {
                                            const createdAt = new Date(negotiation.createdAt);
                                            const now = new Date();
                                            const diffMinutes = Math.floor((now - createdAt) / (1000 * 60));
                                            
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
                                                                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                                                        negotiation.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                                        negotiation.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                                        'bg-yellow-100 text-yellow-700'
                                                                    }`}>
                                                                        {negotiation.status}
                                                                    </div>
                                                                    <p className="text-xs text-green-600 mt-1">
                                                                        {diffMinutes < 1 ? 'Just now' : 
                                                                        `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="bg-green-100 p-3 rounded-md mt-2">
                                                                <p className="text-green-800 text-sm italic">
                                                                    "{negotiation.message || 'No message provided'}"
                                                                </p>
                                                                <p className="text-right text-xs text-green-600 mt-1">
                                                                    Sent: {new Date(negotiation.createdAt).toLocaleString('en-IN', {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hour12: true
                                                                    })}
                                                                </p>
                                                            </div>
                                                            <div className="mt-3 text-sm text-green-700 space-y-1">
                                                                <p className="font-semibold">Contract Details:</p>
                                                                <div className="pl-2">
                                                                    <p>Contract ID: {negotiation.contractId?._id || 'N/A'}</p>
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
                        
                        <div className="hidden md:flex flex-col items-end mr-3">
                            <p className="text-md font-semibold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-md">
                                Welcome Farmer, <span className="font-bold">{userName}</span>
                            </p>
                            <button onClick={() => navigate('/Dashboard')} className="relative bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">Logout</button>
                        </div>
                        
                        <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg" onClick={() => navigate('/dashboard')}>
                            <FaSignOutAlt className="w-5 h-5 text-yellow-400" />
                        </button>
                        
                        <img src="src/Images/image.png" alt="Farmer Profile" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-yellow-300 shadow-md" />
                    </div>
                </div>
            </header>
            
            <div className="h-20 md:h-24"></div>
            
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
        </>
    );
};
export default Header;