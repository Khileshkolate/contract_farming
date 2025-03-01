import React, { useState } from 'react';
import { FaSeedling, FaBars, FaUserCircle, FaFileContract, FaBell, FaEdit, FaQuestionCircle, FaShareAlt, FaStar, FaSignOutAlt, FaHome, FaTimes } from 'react-icons/fa'; // Import more icons, including FaTimes for close

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Define your navigation links here
    const navLinks = [
        { href: "#", label: "Home", icon: <FaHome /> },
        { href: "#profile", label: "Profile", icon: <FaUserCircle /> },
        { href: "#contract", label: "Contract Form", icon: <FaFileContract /> },
        { href: "#notifications", label: "Notifications", icon: <FaBell /> },
        { href: "#update-profile", label: "Update Profile", icon: <FaEdit /> },
        { href: "#contact-support", label: "Contact Support", icon: <FaQuestionCircle /> },
        { href: "#share", label: "Share", icon: <FaShareAlt /> },
        { href: "#rate", label: "Rate", icon: <FaStar /> },
        { href: "#logout", label: "Logout", icon: <FaSignOutAlt /> },
    ];

    return (
        <header className="bg-green-800 text-white shadow-md py-4 w-full relative"> {/* Make header relative */}
            <div className="flex justify-between items-center px-8">

                {/* Menu Icon (Hamburger) */}
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <FaBars className="text-3xl" />
                </button>

                <div className="flex items-center space-x-1 animate-bounce"> {/* Reduced space-x */}
                    <FaSeedling className="text-yellow-400 text-3xl" />
                    <h1 className="text-3xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">Digital Krishii</h1>
                </div>
                <nav className={`hidden md:flex`}>  {/* Hide on small screens, show on medium and up */}
                    <a href="#" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Home</a>
                    <a href="#" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Become a Contract Farmer</a>
                    <a href="#" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Become a Buyer</a>
                    <a href="#" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Contact Us</a>
                    <a href="#" className="text-lg text-white font-semibold hover:underline hover:text-yellow-300 transition-all duration-300">About Us</a>
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

            {/* Mobile Menu (Conditionally Rendered) */}
            <div className={`fixed top-0 left-0 h-full w-1/2 bg-green-700 text-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}> {/* Slide in animation, fixed position */}
                <div className="p-4">
                    {/* Close Button */}
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <FaTimes className="text-3xl" /> {/* Close icon */}
                    </button>
                </div>

                <nav className="py-2 px-4">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="flex items-center space-x-2 block text-lg text-white font-semibold py-2 hover:underline hover:text-yellow-300 transition-all duration-300"
                         
                        >
                            {link.icon} <span>{link.label}</span>
                        </a>
                    ))}
                </nav>
            </div>

            {/* Overlay to disable background when menu is open */}
            {isMenuOpen && (
                <div onClick={toggleMenu} className="fixed top-0 left-0 w-full h-full bg-black opacity-50 md:hidden z-40"></div>
            )}

        </header>
    );
};

const SectionTitle = ({ title }) => (
    <div className="text-center bg-green-800 text-white py-3 text-lg font-bold rounded-md mb-6 w-full">
        {title}
    </div>
);

const Card = ({ image, title, area, price, status, actionText, actionLink }) => (
    <div className="bg-gray-100 border border-green-800 text-center p-4 w-80 rounded-lg shadow-lg">
        <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-2" />
        <h4 className="bg-green-800 text-white py-1 rounded-md text-lg font-semibold">{title}</h4>
        <p className="text-gray-700 mt-1">{area}</p>
        {price && <p className="font-bold text-gray-900 mt-1">₹{price}</p>}
        {status && <p className={`font-bold mt-1 ${status === 'Available' ? 'text-green-600' : 'text-orange-500'}`}>{status}</p>}
        <div className="mt-3">
            <a href={actionLink} className="block bg-green-800 text-white py-2 rounded-md hover:bg-green-600 transition">
                {actionText}
            </a>
        </div>

    </div>
);

const FarmerDashboard = () => {
    const [contracts, setContracts] = useState([
        { image: "src/Images/10.jpg", title: "Barley Seeds", area: "32 Acres", actionText: "Book Now", actionLink: "Filter.html" },
        { image: "src/Images/2.jpg", title: "Onion Seeds", area: "12 Acres", actionText: "Book Now", actionLink: "#" }
    ]);

    const [availableLands, setAvailableLands] = useState([
        { image: "src/Images/5.jpg", title: "Maharashtra", area: "32 Acres", price: "50,000", status: "Available", actionText: "Buy Now", actionLink: "#" },
        { image: "src/Images/8.jpg", title: "Haryana", area: "12 Acres", price: "40,000", status: "Pre-book", actionText: "Buy Now", actionLink: "#" },
    ]);

    const [contractForm, setContractForm] = useState({ image: "", title: "", area: "" });
    const [landForm, setLandForm] = useState({ image: "", title: "", area: "", price: "", status: "Available" });

    const handleContractChange = (e) => {
        setContractForm({ ...contractForm, [e.target.name]: e.target.value });
    };

    const handleLandChange = (e) => {
        setLandForm({ ...landForm, [e.target.name]: e.target.value });
    };

    const handleContractSubmit = (e) => {
        e.preventDefault();
        if (contractForm.image && contractForm.title && contractForm.area) {
            setContracts(prevContracts => [...prevContracts, { ...contractForm, actionText: "Book Now", actionLink: "#" }]);
            setContractForm({ image: "", title: "", area: "" });
        }
    };

    const handleLandSubmit = (e) => {
        e.preventDefault();
        if (landForm.image && landForm.title && landForm.area && landForm.price && landForm.status) {
            setAvailableLands(prevAvailableLands => [...prevAvailableLands, { ...landForm, actionText: "Buy Now", actionLink: "#" }]);
            setLandForm({ image: "", title: "", area: "", price: "", status: "Available" });
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full">
            <Header />
            <main className="py-6 px-4 w-full">
                <section className="w-full bg-green-800 text-white text-center py-10 rounded-md shadow-lg mb-3"> {/* Added mb-3 */}
                    <h2 className="text-3xl font-bold">Get Assured Prices For Your Produce With Contract Farming</h2>
                    <p className="text-lg mt-2 max-w-4xl mx-auto">Contract farming offers a strategic solution by establishing pre-agreed terms between farmers and buyers, ensuring a stable and reliable market for agricultural produce.</p>
                </section>

                <SectionTitle title="Contracts For Farmers" />
                <div className="flex justify-center gap-6 mb-12 w-full mt-3"> {/* Added mt-3 */}
                    <div className="flex flex-wrap gap-6">
                        {contracts.map((contract, index) => (
                            <Card key={index} {...contract} />
                        ))}
                    </div>
                    <form onSubmit={handleContractSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h3 className="text-lg font-semibold mb-4">Add New Contract</h3>
                        <input type="text" name="image" placeholder="Image URL" value={contractForm.image} onChange={handleContractChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="title" placeholder="Crop Name" value={contractForm.title} onChange={handleContractChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="area" placeholder="Land Area" value={contractForm.area} onChange={handleContractChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <button type="submit" className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-600 transition">Submit</button>
                    </form>
                </div>
                <SectionTitle title="Lands Available For Contract Farming" />
                <div className="flex justify-center gap-6 mb-12 w-full">
                    <div className="flex flex-wrap gap-6">
                        {availableLands.map((land, index) => (
                            <Card key={index} {...land} />
                        ))}
                    </div>
                     <form onSubmit={handleLandSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h3 className="text-lg font-semibold mb-4">Add New Land</h3>
                        <input type="text" name="image" placeholder="Image URL" value={landForm.image} onChange={handleLandChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="title" placeholder="City" value={landForm.title} onChange={handleLandChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="area" placeholder="Land Area" value={landForm.area} onChange={handleLandChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="price" placeholder="Price" value={landForm.price} onChange={handleLandChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <select name="status" value={landForm.status} onChange={handleLandChange} className="w-full p-2 border border-gray-300 rounded mb-3">
                            <option value="Available">Available</option>
                            <option value="Pre-book">Pre-book</option>
                        </select>
                        <button type="submit" className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-600 transition">Add Land</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default FarmerDashboard;