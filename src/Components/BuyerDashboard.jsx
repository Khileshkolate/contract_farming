import React, { useState, useEffect } from 'react';
import { HomeIcon, DocumentTextIcon, ShoppingCartIcon, ChartBarIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

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

  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('buyerToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000${url}`, {
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
    window.location.href = '/Dashboard';
  };

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const token = localStorage.getItem('buyerToken');
      if (!token) {
        window.location.href = '/login';
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
        <div key={idx} className="bg-white/10 p-6 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-emerald-300">{stat.title}</p>
              <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
      ))}
    </div>
  );

  const RecentContractsTable = () => (
    <div className="bg-white/10 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-emerald-300">Recent Contracts</h2>
        <button className="text-emerald-400 hover:text-emerald-300">
          View All &gt;
        </button>
      </div>
      
      <table className="w-full">
        <thead>
          <tr className="text-left text-emerald-300 border-b border-emerald-400/20">
            <th className="pb-4">Farmer</th>
            <th className="pb-4">Product</th>
            <th className="pb-4">Quantity</th>
            <th className="pb-4">Price</th>
            <th className="pb-4">Status</th>
            <th className="pb-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {contracts.slice(0, 3).map(contract => (
            <tr key={contract._id} className="border-b border-emerald-400/10">
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={contract.farmer?.image || '/placeholder-farmer.jpg'} 
                    className="w-8 h-8 rounded-full object-cover"
                    alt="Farmer"
                  />
                  <span>{contract.farmer?.name}</span>
                </div>
              </td>
              <td className="py-4">{contract.title}</td>
              <td className="py-4">{contract.quantity}</td>
              <td className="py-4">₹{contract.price?.toLocaleString()}</td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  contract.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  contract.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {contract.status}
                </span>
              </td>
              <td className="py-4">
                <button
                  onClick={() => setSelectedContract(contract)}
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  Details &gt;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a3d2d] via-[#1b5e4a] to-[#2d7b62]">
      {notification && (
        <div className="fixed top-4 right-4 p-4 bg-emerald-400/10 text-emerald-300 rounded-xl backdrop-blur-xl border border-emerald-400/30 animate-slide-in">
          {notification}
        </div>
      )}

      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">
                Digital Krishii
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-white/10 rounded-lg"
              >
                <ShoppingCartIcon className="w-6 h-6 text-emerald-300" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-400 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <div 
                className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/20"
                onClick={() => setShowProfileForm(true)}
              >
                <UserCircleIcon className="w-8 h-8 text-emerald-200" />
                <div>
                  <p className="text-sm text-emerald-300">{profile.name || 'Buyer Account'}</p>
                  <p className="text-xs text-emerald-400">{profile.email || ''}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <nav className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">
          <div className="space-y-4">
            {['dashboard', 'contracts'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === tab ? 'bg-emerald-400/10 text-emerald-300' : 'text-emerald-200 hover:bg-white/10'
                }`}
              >
                {tab === 'dashboard' && <HomeIcon className="w-5 h-5" />}
                {tab === 'contracts' && <DocumentTextIcon className="w-5 h-5" />}
                <span className="font-medium">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </div>
        </nav>

        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <DashboardStats />
              <RecentContractsTable />
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contracts.map(contract => (
                <div key={contract._id} className="bg-white/10 p-6 rounded-xl">
                  <img
                    src={contract.image || '/placeholder-contract.jpg'}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    alt="Contract"
                  />
                  <h3 className="text-lg font-bold text-emerald-300">{contract.title}</h3>
                  <div className="mt-4 space-y-2 text-sm text-emerald-400">
                    <p>Farmer: {contract.farmer?.name}</p>
                    <p>Quantity: {contract.quantity}</p>
                    <p>Price: ₹{contract.price?.toLocaleString()}</p>
                    <p>Status: {contract.status}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleCartAction(contract)}
                      className="flex-1 px-4 py-2 bg-emerald-400/10 text-emerald-300 rounded-lg hover:bg-emerald-400/20"
                    >
                      {cartItems.some(i => i._id === contract._id) ? 'Remove' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={() => setSelectedContract(contract)}
                      className="px-4 py-2 bg-blue-400/10 text-blue-300 rounded-lg hover:bg-blue-400/20"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {showProfileForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 rounded-xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setShowProfileForm(false)}
              className="absolute top-4 right-4 text-emerald-300 hover:text-emerald-400"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-emerald-300 mb-6">Update Profile</h2>
            <form onSubmit={updateProfile} className="space-y-4">
              <div className="space-y-2">
                <label className="text-emerald-300">Full Name</label>
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full p-3 bg-white/5 rounded-lg text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-emerald-300">Email</label>
                <input
                  type="email"
                  value={profile.email || ''}
                  className="w-full p-3 bg-white/5 rounded-lg text-white"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="text-emerald-300">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="w-full p-3 bg-white/5 rounded-lg text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-emerald-400/10 text-emerald-300 rounded-lg hover:bg-emerald-400/20"
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
      )}

          {/* Cart Modal */}
          {showCart && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md backdrop-saturate-0 flex items-center justify-center z-50">
          <div className="bg-white/10 rounded-xl p-6 w-full max-w-2xl relative border border-white/10">
            <button 
              onClick={() => setShowCart(false)}
              className="absolute top-4 right-4 text-emerald-300 hover:text-emerald-400 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-emerald-300 mb-6">Your Cart</h2>
            
            {cartItems.length === 0 ? (
              <p className="text-emerald-400 text-center">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item._id} className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || '/placeholder-contract.jpg'}
                          className="w-12 h-12 rounded-lg object-cover"
                          alt="Contract"
                        />
                        <div>
                          <h3 className="text-emerald-300">{item.title}</h3>
                          <p className="text-emerald-400 text-sm">
                            ₹{item.price?.toLocaleString()} • {item.quantity}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedContract(item)}
                        className="px-4 py-2 bg-emerald-400/10 text-emerald-300 rounded-lg hover:bg-emerald-400/20 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contract Details Modal */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md backdrop-saturate-0 flex items-center justify-center z-50">
          <div className="bg-white/10 rounded-xl p-6 w-full max-w-2xl relative border border-white/10">
            <button 
              onClick={() => setSelectedContract(null)}
              className="absolute top-4 right-4 text-emerald-300 hover:text-emerald-400 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={selectedContract.image || '/placeholder-contract.jpg'}
                className="w-full h-64 object-cover rounded-lg"
                alt="Contract"
              />
              <div className="space-y-4 text-emerald-400">
                <h2 className="text-2xl font-bold text-emerald-300">{selectedContract.title}</h2>
                <p className="text-white/70">{selectedContract.description}</p>
                <div className="space-y-2">
                  <p>Farmer: {selectedContract.farmer?.name}</p>
                  <p>Location: {selectedContract.quantity}</p>
                  <p>Price: ₹{selectedContract.price?.toLocaleString()}</p>
                  <p>Status: {selectedContract.status}</p>
                  <p>Quantity: {selectedContract.area}</p>
                </div>
                <div className="mt-4">
                  <h3 className="text-emerald-300 mb-2">Send Negotiation</h3>
                  <textarea
                    value={negotiationMessage}
                    onChange={(e) => setNegotiationMessage(e.target.value)}
                    className="w-full p-3 bg-white/5 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400"
                    placeholder="Type your negotiation message..."
                    rows="3"
                  />
                  <button
                    onClick={sendNegotiation}
                    className="mt-2 px-4 py-2 bg-emerald-400/10 text-emerald-300 rounded-lg hover:bg-emerald-400/20 transition-colors"
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