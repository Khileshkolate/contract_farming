import React, { useState, useEffect } from 'react';
import { BellIcon, HomeIcon, UsersIcon, DocumentTextIcon, ShoppingCartIcon, ChartBarIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profile, setProfile] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [tempNotification, setTempNotification] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Update fetchWithAuth function
  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/BuyerDashboard';
      throw new Error('No token');
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
        localStorage.removeItem('token');
        window.location.href = '/BuyerDashboard';
        return;
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    } catch (error) {
      console.error("API error:", error);
      setTempNotification(error.message);
      throw error;
    }
  };


  // Update fetchContracts function
  const fetchContracts = async () => {
    try {
      const data = await fetchWithAuth('/api/contracts');
      setContracts(data); 
    } catch (error) {
      console.error('Contracts error:', error);
    }
  };



  useEffect(() => {
    const loadData = async () => {
      await fetchContracts();
    };
    loadData();
  }, []);

  


  const ProfileForm = () => {
    const [form, setForm] = useState({
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      pincode: profile?.pincode || '',
      address: profile?.address || '',
      image: null
    });


    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-emerald-300">Profile Settings</h2>
            <button onClick={() => setShowProfileForm(false)} className="p-2 hover:bg-white/10 rounded-full">
              <XMarkIcon className="w-6 h-6 text-emerald-300" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" value={form.firstName} 
                onChange={e => setForm({...form, firstName: e.target.value})}
                className="p-2 bg-white/5 rounded-lg text-white" required />
              <input type="text" placeholder="Last Name" value={form.lastName}
                onChange={e => setForm({...form, lastName: e.target.value})}
                className="p-2 bg-white/5 rounded-lg text-white" required />
            </div>
            <input type="text" placeholder="Pincode" value={form.pincode} pattern="\d{6}"
              onChange={e => setForm({...form, pincode: e.target.value})}
              className="w-full p-2 bg-white/5 rounded-lg text-white" required />
            <textarea placeholder="Address" value={form.address} required
              onChange={e => setForm({...form, address: e.target.value})}
              className="w-full p-2 bg-white/5 rounded-lg text-white h-32" />
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*"
                onChange={e => setForm({...form, image: e.target.files[0]})}
                className="text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-400/10 file:text-emerald-300 hover:file:bg-emerald-400/20" />
              {profile?.image && <img src={profile.image} alt="Profile" className="w-12 h-12 rounded-full object-cover" />}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => setShowProfileForm(false)}
                className="p-2 bg-rose-400/10 text-rose-300 rounded-lg hover:bg-rose-400/20">Cancel</button>
              <button type="submit" disabled={isSaving}
                className="p-2 bg-emerald-400/10 text-emerald-300 rounded-lg hover:bg-emerald-400/20 disabled:opacity-50">
                {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const CartSidebar = () => (
    <div className="fixed inset-y-0 right-0 w-96 bg-white/5 backdrop-blur-xl border-l border-white/10 p-6 z-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-emerald-300">My Cart</h2>
        <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
          <XMarkIcon className="w-6 h-6 text-emerald-300" />
        </button>
      </div>
      <div className="space-y-4">
        {cartItems.map(item => (
        <div className="flex justify-between items-center">
        <div>
          <p className="text-emerald-400">₹{contract.price}</p>
          <p className="text-xs text-emerald-500">
            {contract.duration} days | {contract.farmer?.fName} {contract.farmer?.lName}
          </p>
        </div>
        <button onClick={() => handleCartAction(contract)}
          className="px-4 py-2 bg-emerald-400/10 text-emerald-300 rounded-lg hover:bg-emerald-400/20">
          {cartItems.some(i => i._id === contract._id) ? 'Remove' : 'Add to Cart'}
        </button>
      </div>
        ))}
        {cartItems.length === 0 && <p className="text-center text-emerald-400">Cart is empty</p>}
      </div>
    </div>
  );

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
                  { title: "Notifications", value: notifications.length, change: "-2%", status: 'negative' },
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
                <h2 className="text-xl font-bold text-emerald-300 mb-6">Recents Contracts</h2>
                <div className="flex overflow-x-auto pb-4 space-x-6">
                  {contracts.map(contract => (
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
              </div>
            </div>
          )}
        </main>
      </div>

      {showProfileForm && <ProfileForm />}
      {isCartOpen && <CartSidebar />}
    </div>
  );
};

export default BuyerDashboard;