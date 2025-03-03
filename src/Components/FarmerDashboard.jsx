import React, { useState } from 'react';
import { FaSeedling, FaBars, FaUserCircle, FaFileContract, FaBell, FaEdit, FaQuestionCircle, FaShareAlt, FaStar, FaSignOutAlt, FaHome, FaTimes } from 'react-icons/fa';

// Header Component
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                {/* Menu Icon (Hamburger) */}
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <FaBars className="text-3xl hover:text-yellow-400 transition-colors duration-300" />
                </button>

                <div className="flex items-center space-x-1 animate-bounce">
                    <FaSeedling className="text-yellow-400 text-3xl" />
                    <h1 className="text-3xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">Digital Krishii</h1>
                </div>

                <nav className="hidden md:flex">
                    <a href="/FarmerDashboard" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Home</a>
                    <a href="#" className="text-lg text-white font-semibold mr-4 hover:underline hover:text-yellow-300 transition-all duration-300">Become a Contract Farmer</a>
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

            {/* Sidebar */}
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

            {/* Overlay */}
            {isMenuOpen && (
                <div onClick={toggleMenu} className="fixed inset-0 bg-black opacity-50 z-40"></div>
            )}
        </header>
    );
};

// Section Title Component
const SectionTitle = ({ title }) => (
    <div className="text-center bg-green-800 text-white py-3 text-lg font-bold rounded-md mb-6 w-full">
        {title}
    </div>
);

// Card Component
const Card = ({ image, title, area, price, status, actionText, actionLink }) => (
    <div className="bg-gray-100 border border-green-800 text-center p-4 w-80 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
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

// Main FarmerDashboard Component
const FarmerDashboard = () => {
    // State for Contracts
    const [contracts, setContracts] = useState([
        { image: "src/Images/10.jpg", title: "Barley Seeds", area: "32 Acres", actionText: "Book Now", actionLink: "Filter.html" },
        { image: "src/Images/2.jpg", title: "Onion Seeds", area: "12 Acres", actionText: "Book Now", actionLink: "#" }
    ]);

    // State for Lands Available for Contract Farming
    const [availableLands, setAvailableLands] = useState([
        { image: "src/Images/5.jpg", title: "Maharashtra", area: "32 Acres", price: "50,000", status: "Available", actionText: "Buy Now", actionLink: "#" },
        { image: "src/Images/8.jpg", title: "Haryana", area: "12 Acres", price: "40,000", status: "Pre-book", actionText: "Buy Now", actionLink: "#" },
    ]);

    // State for Lands Available for Rent
    const [rentLands, setRentLands] = useState([
        { image: "src/Images/5.jpg", title: "Punjab", area: "20 Acres", price: "30,000", status: "Available", actionText: "Rent Now", actionLink: "#" },
        { image: "src/Images/7.webp", title: "Gujarat", area: "15 Acres", price: "25,000", status: "Pre-book", actionText: "Rent Now", actionLink: "#" },
    ]);

    // State for Products Available for Selling
    const [products, setProducts] = useState([
        { image: "src/Images/Pic1.jpg", title: "Wheat", area: "10 Bags", price: "5,000", status: "Available", actionText: "Buy Now", actionLink: "#" },
        { image: "src/Images/rice.jpg", title: "Rice", area: "15 Bags", price: "7,500", status: "Available", actionText: "Buy Now", actionLink: "#" },
    ]);

    // State for Farming Related Equipment for Selling
    const [equipment, setEquipment] = useState([
        { image: "src/Images/manual-0102p-dual-samie-original-imah6y6fmaccwcye.webp", title: "Tractor", area: "1 Unit", price: "500,000", status: "Available", actionText: "Buy Now", actionLink: "#" },
        { image: "src/Images/2-pcs-gardening-pruner-heavy-roll-cutter-2-asgardening-original-imah4qj9xzpfmcmm.webp", title: "Plough", area: "2 Units", price: "15,000", status: "Available", actionText: "Buy Now", actionLink: "#" },
    ]);

    // Form States
    const [contractForm, setContractForm] = useState({ image: "", title: "", area: "" });
    const [landForm, setLandForm] = useState({ image: "", title: "", area: "", price: "", status: "Available" });
    const [rentForm, setRentForm] = useState({ image: "", title: "", area: "", price: "", status: "Available" });
    const [productForm, setProductForm] = useState({ image: "", title: "", area: "", price: "", status: "Available" });
    const [equipmentForm, setEquipmentForm] = useState({ image: "", title: "", area: "", price: "", status: "Available" });

    // Form Handlers
    const handleContractChange = (e) => {
        setContractForm({ ...contractForm, [e.target.name]: e.target.value });
    };

    const handleLandChange = (e) => {
        setLandForm({ ...landForm, [e.target.name]: e.target.value });
    };

    const handleRentChange = (e) => {
        setRentForm({ ...rentForm, [e.target.name]: e.target.value });
    };

    const handleProductChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const handleEquipmentChange = (e) => {
        setEquipmentForm({ ...equipmentForm, [e.target.name]: e.target.value });
    };

    const handleContractSubmit = (e) => {
        e.preventDefault();
        if (contractForm.image && contractForm.title && contractForm.area) {
            setContracts([...contracts, { ...contractForm, actionText: "Book Now", actionLink: "#" }]);
            setContractForm({ image: "", title: "", area: "" });
        }
    };

    const handleLandSubmit = (e) => {
        e.preventDefault();
        if (landForm.image && landForm.title && landForm.area && landForm.price && landForm.status) {
            setAvailableLands([...availableLands, { ...landForm, actionText: "Buy Now", actionLink: "#" }]);
            setLandForm({ image: "", title: "", area: "", price: "", status: "Available" });
        }
    };

    const handleRentSubmit = (e) => {
        e.preventDefault();
        if (rentForm.image && rentForm.title && rentForm.area && rentForm.price && rentForm.status) {
            setRentLands([...rentLands, { ...rentForm, actionText: "Rent Now", actionLink: "#" }]);
            setRentForm({ image: "", title: "", area: "", price: "", status: "Available" });
        }
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        if (productForm.image && productForm.title && productForm.area && productForm.price && productForm.status) {
            setProducts([...products, { ...productForm, actionText: "Buy Now", actionLink: "#" }]);
            setProductForm({ image: "", title: "", area: "", price: "", status: "Available" });
        }
    };

    const handleEquipmentSubmit = (e) => {
        e.preventDefault();
        if (equipmentForm.image && equipmentForm.title && equipmentForm.area && equipmentForm.price && equipmentForm.status) {
            setEquipment([...equipment, { ...equipmentForm, actionText: "Buy Now", actionLink: "#" }]);
            setEquipmentForm({ image: "", title: "", area: "", price: "", status: "Available" });
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full">
            <Header />
            <main className="py-6 px-4 w-full">
                {/* Hero Section */}
                <section className="w-full bg-green-800 text-white text-center py-10 rounded-md shadow-lg mb-3">
                    <h2 className="text-3xl font-bold">Get Assured Prices For Your Produce With Contract Farming</h2>
                    <p className="text-lg mt-2 max-w-4xl mx-auto">Contract farming offers a strategic solution by establishing pre-agreed terms between farmers and buyers, ensuring a stable and reliable market for agricultural produce.</p>
                </section>

                {/* Contracts Section */}
                <SectionTitle title="Contracts For Farmers" />
                <div className="flex justify-center gap-6 mb-12 w-full mt-3">
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

                {/* Lands for Contract Farming Section */}
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

                {/* Lands for Rent Section */}
                <SectionTitle title="Lands Available For Rent" />
                <div className="flex justify-center gap-6 mb-12 w-full">
                    <div className="flex flex-wrap gap-6">
                        {rentLands.map((land, index) => (
                            <Card key={index} {...land} />
                        ))}
                    </div>
                    <form onSubmit={handleRentSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h3 className="text-lg font-semibold mb-4">Add New Land for Rent</h3>
                        <input type="text" name="image" placeholder="Image URL" value={rentForm.image} onChange={handleRentChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="title" placeholder="City" value={rentForm.title} onChange={handleRentChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="area" placeholder="Land Area" value={rentForm.area} onChange={handleRentChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="price" placeholder="Price" value={rentForm.price} onChange={handleRentChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <select name="status" value={rentForm.status} onChange={handleRentChange} className="w-full p-2 border border-gray-300 rounded mb-3">
                            <option value="Available">Available</option>
                            <option value="Pre-book">Pre-book</option>
                        </select>
                        <button type="submit" className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-600 transition">Add Land</button>
                    </form>
                </div>

                {/* Products Available for Selling Section */}
                <SectionTitle title="Products Available for Selling" />
                <div className="flex justify-center gap-6 mb-12 w-full">
                    <div className="flex flex-wrap gap-6">
                        {products.map((product, index) => (
                            <Card key={index} {...product} />
                        ))}
                    </div>
                    <form onSubmit={handleProductSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
                        <input type="text" name="image" placeholder="Image URL" value={productForm.image} onChange={handleProductChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="title" placeholder="Product Name" value={productForm.title} onChange={handleProductChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="area" placeholder="Quantity" value={productForm.area} onChange={handleProductChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="price" placeholder="Price" value={productForm.price} onChange={handleProductChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <select name="status" value={productForm.status} onChange={handleProductChange} className="w-full p-2 border border-gray-300 rounded mb-3">
                            <option value="Available">Available</option>
                            <option value="Pre-book">Pre-book</option>
                        </select>
                        <button type="submit" className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-600 transition">Add Product</button>
                    </form>
                </div>

                {/* Farming Related Equipment for Selling Section */}
                <SectionTitle title="Farming Related Equipment for Selling" />
                <div className="flex justify-center gap-6 mb-12 w-full">
                    <div className="flex flex-wrap gap-6">
                        {equipment.map((item, index) => (
                            <Card key={index} {...item} />
                        ))}
                    </div>
                    <form onSubmit={handleEquipmentSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h3 className="text-lg font-semibold mb-4">Add New Equipment</h3>
                        <input type="text" name="image" placeholder="Image URL" value={equipmentForm.image} onChange={handleEquipmentChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="title" placeholder="Equipment Name" value={equipmentForm.title} onChange={handleEquipmentChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="area" placeholder="Quantity" value={equipmentForm.area} onChange={handleEquipmentChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <input type="text" name="price" placeholder="Price" value={equipmentForm.price} onChange={handleEquipmentChange} className="w-full p-2 border border-gray-300 rounded mb-3" required />
                        <select name="status" value={equipmentForm.status} onChange={handleEquipmentChange} className="w-full p-2 border border-gray-300 rounded mb-3">
                            <option value="Available">Available</option>
                            <option value="Pre-book">Pre-book</option>
                        </select>
                        <button type="submit" className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-600 transition">Add Equipment</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default FarmerDashboard;