import React, { useState, useEffect } from 'react';
import { BellIcon, HomeIcon, UsersIcon, DocumentTextIcon, ShoppingCartIcon, ChartBarIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profile, setProfile] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [tempNotification, setTempNotification] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('buyerToken');
    if (!token) {
      window.location.href = '/login';
      return Promise.reject('Redirecting to login');
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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      return response.json();
    } catch (error) {
      console.error("API error:", error);
      setTempNotification(error.message);
      throw error;
    }
  };

  const fetchContracts = async () => {
    try {
      const data = await fetchWithAuth('/api/contracts');
      if (!Array.isArray(data)) throw new Error('Invalid data format');
      
      const validContracts = data.filter(contract => 
        contract._id && contract.title && contract.description && 
        contract.price && contract.duration && contract.farmer
      );
      
      setContracts(validContracts);
    } catch (error) {
      console.error('Contracts error:', error);
      setTempNotification(error.message);
      setContracts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCartAction = (contract) => {
    setCartItems(prev => (
      prev.some(i => i._id === contract._id) 
        ? prev.filter(i => i._id !== contract._id)
        : [...prev, contract]
    ));
  };

  useEffect(() => {
    const token = localStorage.getItem('buyerToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    let isMounted = true;
    const loadData = async () => {
      try {
        const [contractsData, profileData] = await Promise.all([
          fetchContracts(),
          fetchWithAuth('/api/profile')
        ]);
        
        if (isMounted) {
          setProfile(profileData);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Data loading error:', error);
          setTempNotification('Failed to load data');
        }
      }
    };
    
    loadData();
    return () => { isMounted = false };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a3d2d] via-[#1b5e4a] to-[#2d7b62]">
      {tempNotification && (
        <div className="fixed top-4 right-4 p-4 bg-emerald-400/10 text-emerald-300 rounded-xl backdrop-blur-xl border border-emerald-400/30 animate-slide-in">
          {tempNotification}
        </div>
      )}

      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShoppingCartIcon className="w-8 h-8 text-emerald-300" />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">
                Digital Krishii
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setIsCartOpen(!isCartOpen)} className="p-2 hover:bg-white/10 rounded-xl relative">
                <ShoppingCartIcon className="w-6 h-6 text-emerald-200" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-400 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl cursor-pointer hover:bg-white/20"
                onClick={() => setShowProfileForm(true)}>
                {profile?.image ? (
                  <img src={profile.image} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <UserCircleIcon className="w-8 h-8 text-emerald-200" />
                )}
                <div>
                  <p className="text-emerald-300 font-medium">
                    {profile?.firstName || 'User'} {profile?.lastName || ''}
                  </p>
                  <p className="text-sm text-emerald-400">{profile?.pincode || 'Update profile'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <nav className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">
          <div className="space-y-4">
            {['dashboard', 'contracts', 'farmers'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                  activeTab === tab ? 'bg-emerald-400/10 text-emerald-300' : 'text-emerald-200 hover:bg-white/10'
                }`}>
                {tab === 'dashboard' && <HomeIcon className="w-5 h-5" />}
                {tab === 'contracts' && <DocumentTextIcon className="w-5 h-5" />}
                {tab === 'farmers' && <UsersIcon className="w-5 h-5" />}
                <span className="font-medium">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </div>
        </nav>

        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Active Contracts", value: contracts.length, change: "+12%", status: 'positive' },
                  { title: "Cart Items", value: cartItems.length, change: "+5%", status: 'positive' },
                  { title: "Profile Complete", value: profile ? '100%' : '0%', change: profile ? "+100%" : "+0%", status: 'positive' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-emerald-300">{stat.title}</p>
                        <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                        <span className={`text-sm ${stat.status === 'positive' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {stat.change}
                        </span>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.status === 'positive' ? 'bg-emerald-400/10' : 'bg-rose-400/10'}`}>
                        <ChartBarIcon className={`w-8 h-8 ${stat.status === 'positive' ? 'text-emerald-400' : 'text-rose-400'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-emerald-300 mb-6">Recent Contracts</h2>
                {isLoading ? (
                  <div className="text-center py-8 text-emerald-300">Loading contracts...</div>
                ) : contracts.length > 0 ? (
                  <div className="flex overflow-x-auto pb-4 space-x-6">
                    {contracts.slice(0, 5).map(contract => (
                      <div key={contract._id} className="bg-white/5 p-6 rounded-xl min-w-[300px]">
                        <h3 className="text-lg font-bold text-emerald-300">{contract.title}</h3>
                        <p className="text-emerald-400 text-sm my-4">{contract.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-emerald-500">
                            {contract.duration} days | {contract.farmer?.fName} {contract.farmer?.lName}
                          </div>
                          <button onClick={() => handleCartAction(contract)}
                            className="px-4 py-2 bg-emerald-400/10 text-emerald-300 rounded-lg hover:bg-emerald-400/20">
                            {cartItems.some(i => i._id === contract._id) ? 'Remove' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-emerald-400">No contracts available</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-8 text-emerald-300">Loading contracts...</div>
              ) : contracts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contracts.map(contract => (
                    <div key={contract._id} className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-bold text-emerald-300 mb-2">{contract.title}</h3>
                      <p className="text-emerald-400 text-sm mb-4">{contract.description}</p>
                      <div className="flex justify-between items-center text-xs text-emerald-500">
                        <span>Duration: {contract.duration} days</span>
                        <span>Price: ₹{contract.price}</span>
                      </div>
                      <button 
                        onClick={() => handleCartAction(contract)}
                        className="w-full mt-4 py-2 bg-emerald-400/10 text-emerald-300 rounded-lg hover:bg-emerald-400/20"
                      >
                        {cartItems.some(i => i._id === contract._id) ? 'Remove from Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-emerald-400">No contracts available</div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;