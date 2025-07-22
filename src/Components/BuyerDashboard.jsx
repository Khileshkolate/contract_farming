import React, { useState, useEffect } from 'react';
import { HomeIcon, DocumentTextIcon, ShoppingCartIcon, ChartBarIcon, UserCircleIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const link = "https://contract-farming.onrender.com";


const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contracts, setContracts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profile, setProfile] = useState({});
  const [negotiationMessage, setNegotiationMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('buyerToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const response = await fetch(`${link}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('buyerToken');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      return response.json();
    } catch (error) {
      setNotification(error.message);
      throw error;
    }
  };

  const fetchContracts = async () => {
    try {
      const data = await fetchWithAuth('/api/contracts');
      setContracts(data);
    } catch (error) {
      setContracts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await fetchWithAuth('/api/profile');
      setProfile(data);
    } catch (error) {
      setProfile({});
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await fetchWithAuth('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(profile)
      });
      setShowProfileForm(false);
      setNotification('Profile updated successfully');
    } catch (error) {
      setNotification('Failed to update profile');
    }
  };

  const sendNegotiation = async () => {
    try {
      if (!selectedContract?._id || !negotiationMessage.trim()) {
        setNotification("Please select a contract and enter a message");
        return;
      }
  
      const response = await fetchWithAuth('/api/negotiations', {
        method: 'POST',
        body: JSON.stringify({
          contractId: selectedContract._id,
          message: negotiationMessage
        })
      });
  
      setNotification('Negotiation sent successfully!');
      setNegotiationMessage('');
      setSelectedContract(null);
      
    } catch (error) {
      setNotification(error.message || 'Failed to send negotiation');
    }
  };

  const handleCartAction = (contract) => {
    setCartItems(prev => {
      const exists = prev.some(i => i._id === contract._id);
      return exists 
        ? prev.filter(i => i._id !== contract._id)
        : [...prev, contract];
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('buyerToken');
    window.location.href = '/Dashboard'; // Assuming /Dashboard is the main login/landing page
  };

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const token = localStorage.getItem('buyerToken');
      if (!token) {
        window.location.href = '/login'; // Redirect to login if no token
        return;
      }
      await fetchContracts();
      await fetchProfile();
    };
    checkAuthAndFetch();
  }, []);

  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: "Active Contracts", value: contracts.length },
        { title: "Cart Items", value: cartItems.length },
        { title: "Farmers Available", value: new Set(contracts.map(c => c.farmer?.email)).size }
      ].map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      ))}
    </div>
  );

  const RecentContractsTable = () => (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent Contracts</h2>
        <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
          View All &gt;
        </button>
      </div>
      
      <div className="overflow-x-auto"> {/* Added for horizontal scrolling on small screens */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-gray-600 border-b border-gray-200">
              <th className="py-3 px-4 text-sm font-semibold">Farmer</th>
              <th className="py-3 px-4 text-sm font-semibold">Product</th>
              <th className="py-3 px-4 text-sm font-semibold">Quantity</th>
              <th className="py-3 px-4 text-sm font-semibold">Price</th>
              <th className="py-3 px-4 text-sm font-semibold">Status</th>
              <th className="py-3 px-4 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contracts.slice(0, 3).map(contract => (
              <tr key={contract._id} className="text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={contract.farmer?.image || 'https://placehold.co/40x40/E0F2F7/000000?text=F'} 
                      className="w-8 h-8 rounded-full object-cover"
                      alt="Farmer"
                      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/E0F2F7/000000?text=F' }}
                    />
                    <span>{contract.farmer?.name || 'N/A'}</span>
                  </div>
                </td>
                <td className="py-4 px-4">{contract.title || 'N/A'}</td>
                <td className="py-4 px-4">{contract.quantity || 'N/A'}</td>
                <td className="py-4 px-4">₹{(contract.price || 0).toLocaleString()}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    contract.status === 'Active' ? 'bg-green-100 text-green-700' :
                    contract.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {contract.status || 'N/A'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => setSelectedContract(contract)}
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 p-4 bg-blue-100 text-blue-800 rounded-lg shadow-md animate-slide-in z-50">
          {notification}
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Digital Krishii
            </h1>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setShowCart(true)}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>
            <div 
              className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => setShowProfileForm(true)}
            >
              <UserCircleIcon className="w-8 h-8 text-blue-500" />
              <div className="hidden sm:block"> {/* Hide on extra small screens */}
                <p className="text-sm text-gray-700 font-medium">{profile.name || 'Buyer Account'}</p>
                <p className="text-xs text-gray-500">{profile.email || ''}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar for larger screens */}
        <nav className="hidden lg:block w-64 bg-white border-r border-gray-200 p-6 shadow-sm">
          <div className="space-y-4">
            {['dashboard', 'contracts'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab === 'dashboard' && <HomeIcon className="w-5 h-5" />}
                {tab === 'contracts' && <DocumentTextIcon className="w-5 h-5" />}
                <span className="font-medium">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
        )}
        <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-6 shadow-lg z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700 p-1 rounded-full">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4">
            {['dashboard', 'contracts'].map((tab) => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab === 'dashboard' && <HomeIcon className="w-5 h-5" />}
                {tab === 'contracts' && <DocumentTextIcon className="w-5 h-5" />}
                <span className="font-medium">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 bg-gray-50">
          {isLoading ? (
            <div className="text-center text-gray-600 text-lg py-10">Loading dashboard...</div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <DashboardStats />
                  <RecentContractsTable />
                </div>
              )}

              {activeTab === 'contracts' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contracts.map(contract => (
                    <div key={contract._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                      <img
                        src={contract.image || 'https://placehold.co/400x200/E0F2F7/000000?text=Product'}
                        className="w-full h-48 object-cover rounded-md mb-4"
                        alt="Contract"
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x200/E0F2F7/000000?text=Product' }}
                      />
                      <h3 className="text-lg font-bold text-gray-800">{contract.title || 'N/A'}</h3>
                      <div className="mt-4 space-y-2 text-sm text-gray-600">
                        <p><strong>Farmer:</strong> {contract.farmer?.name || 'N/A'}</p>
                        <p><strong>Quantity:</strong> {contract.quantity || 'N/A'}</p>
                        <p><strong>Price:</strong> ₹{(contract.price || 0).toLocaleString()}</p>
                        <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            contract.status === 'Active' ? 'bg-green-100 text-green-700' :
                            contract.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>{contract.status || 'N/A'}</span></p>
                      </div>
                      <div className="mt-4 flex flex-col sm:flex-row gap-2"> {/* Responsive buttons */}
                        <button
                          onClick={() => handleCartAction(contract)}
                          className={`flex-1 px-4 py-2 rounded-md transition-colors text-sm font-medium
                            ${cartItems.some(i => i._id === contract._id) ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                          {cartItems.some(i => i._id === contract._id) ? 'Remove from Cart' : 'Add to Cart'}
                        </button>
                        <button
                          onClick={() => setSelectedContract(contract)}
                          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Profile Modal */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"> {/* Added responsive padding */}
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md relative shadow-lg animate-scale-in"> {/* Added responsive padding */}
            <button 
              onClick={() => setShowProfileForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>
            <form onSubmit={updateProfile} className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={profile.email || ''}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-600 bg-gray-50 cursor-not-allowed"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"> {/* Added responsive padding */}
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-2xl relative shadow-lg animate-scale-in"> {/* Added responsive padding and max-widths */}
            <button 
              onClick={() => setShowCart(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>
            
            {cartItems.length === 0 ? (
              <p className="text-gray-600 text-center py-4">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between gap-4"> {/* Added flex and gap */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || 'https://placehold.co/60x60/E0F2F7/000000?text=Item'}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        alt="Contract"
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/60x60/E0F2F7/000000?text=Item' }}
                      />
                      <div>
                        <h3 className="text-gray-800 font-medium">{item.title || 'N/A'}</h3>
                        <p className="text-gray-600 text-sm">
                          ₹{(item.price || 0).toLocaleString()} • {item.quantity || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCartAction(item)} // This will remove from cart
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium flex-shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200 text-right">
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contract Details Modal */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"> {/* Added responsive padding */}
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-2xl relative shadow-lg animate-scale-in"> {/* Added responsive padding and max-widths */}
            <button 
              onClick={() => setSelectedContract(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={selectedContract.image || 'https://placehold.co/400x300/E0F2F7/000000?text=Product+Details'}
                className="w-full h-64 object-cover rounded-lg"
                alt="Contract"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x300/E0F2F7/000000?text=Product+Details' }}
              />
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-800">{selectedContract.title || 'N/A'}</h2>
                <p className="text-gray-600">{selectedContract.description || 'No description available.'}</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Farmer:</strong> {selectedContract.farmer?.name || 'N/A'}</p>
                  <p><strong>Location:</strong> {selectedContract.location || 'N/A'}</p> {/* Corrected property name for location */}
                  <p><strong>Price:</strong> ₹{(selectedContract.price || 0).toLocaleString()}</p>
                  <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedContract.status === 'Active' ? 'bg-green-100 text-green-700' :
                      selectedContract.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>{selectedContract.status || 'N/A'}</span></p>
                  <p><strong>Quantity:</strong> {selectedContract.quantity || 'N/A'}</p> {/* Corrected property name for quantity */}
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-800 font-medium mb-2">Send Negotiation</h3>
                  <textarea
                    value={negotiationMessage}
                    onChange={(e) => setNegotiationMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
                    placeholder="Type your negotiation message..."
                    rows="3"
                  />
                  <button
                    onClick={sendNegotiation}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
