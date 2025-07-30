import React, { useState, useEffect } from 'react';
import {
  HomeIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  UserCircleIcon,
  XMarkIcon,
  Bars3Icon,
  BellIcon,
  QrCodeIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const link = import.meta.env.VITE_BACKEND;



const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contracts, setContracts] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profile, setProfile] = useState({});
  const [negotiationMessage, setNegotiationMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
   const [proposedPrice, setProposedPrice] = useState('');
   const [negotiations, setNegotiations] = useState([]);
  const [negotiationRequests, setNegotiationRequests] = useState([
    {
      id: 1,
      farmerName: "Rajesh Kumar",
      product: "Organic Wheat",
      status: "Pending",
      date: "2023-10-15",
      message: "Can you offer ₹5000 per quintal instead of ₹5500?"
    },
    {
      id: 2,
      farmerName: "Suresh Patel",
      product: "Basmati Rice",
      status: "Accepted",
      date: "2023-10-12",
      message: "I can provide 10% extra quantity for the same price"
    }
  ]);

  const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('buyerToken');
  if (!token) {
    window.location.href = '/login';
    return;
  }

  try {
    // Fix URL construction
    const fullUrl = `${link}${link.endsWith('/') ? '' : '/'}${url.replace(/^\//, '')}`;
    
    const response = await fetch(fullUrl, {
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
    }
  };

  const fetchFarmers = async () => {
    try {
      const data = await fetchWithAuth('/api/farmers');
      setFarmers(data);
    } catch (error) {
      setFarmers([]);
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

 // Update the sendNegotiation function
const sendNegotiation = async () => {
  try {
    // Use fetchWithAuth for consistency
    await fetchWithAuth('/api/buyer/negotiations', {
      method: 'POST',
      body: JSON.stringify({
        contractId: selectedContract._id,
        message: negotiationMessage,
        proposedPrice: Number(proposedPrice)
      })
    });

    // Reset form
    setNegotiationMessage('');
    setProposedPrice('');
    setSelectedContract(null);
    setNotification('Negotiation sent successfully!');
  } catch (error) {
    setNotification('Failed to send negotiation: ' + error.message);
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

  const viewAllDetails = () => {
    if (selectedContract) {
      alert(`Viewing all details for contract: ${selectedContract.title}\nFarmer: ${selectedContract.farmer?.name || 'N/A'}\nPrice: ₹${selectedContract.price}\nQuantity: ${selectedContract.quantity}`);
    }
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
      await fetchFarmers();
      setIsLoading(false);
    };
    checkAuthAndFetch();
  }, []);
  

  const ImageScanner = () => (
    <div className="p-6 text-center">
      <h3 className="text-xl font-semibold mb-4">Image Scanner</h3>
      <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
        <p className="text-gray-500">Scanner Area</p>
      </div>
      <p className="text-gray-600">Scan your document or product here.</p>
      <button
        onClick={() => setShowScanner(false)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Close Scanner
      </button>
    </div>
  );

  const Notifications = () => (
    <div className="p-6 text-center">
      <h3 className="text-xl font-semibold mb-4">Your Notifications</h3>
      <ul className="text-left space-y-2">
        <li className="p-2 bg-gray-100 rounded-md">New contract from Farmer X for Wheat.</li>
        <li className="p-2 bg-gray-100 rounded-md">Your negotiation for Rice has been responded to.</li>
        <li className="p-2 bg-gray-100 rounded-md">Deal with Farmer A is now "Packaging".</li>
      </ul>
      <button
        onClick={() => setShowNotificationsModal(false)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Close Notifications
      </button>
    </div>
  );

  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: "Active Contracts", value: contracts.length },
        { title: "Cart Items", value: cartItems.length },
        { title: "Farmers Available", value: farmers.length }
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
      <div className="overflow-x-auto">
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
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/E0F2F7/000000?text=F' }}
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

  const NegotiationRequests = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Negotiation Requests</h2>
      
      {negotiationRequests.length === 0 ? (
        <div className="text-center py-10">
          <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No negotiation requests</h3>
          <p className="text-gray-500 mt-2">Farmers will appear here when they send negotiation requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {negotiationRequests.map(request => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{request.farmerName}</h3>
                    <p className="text-gray-600 text-sm">{request.product}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status}
                </span>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-700">{request.message}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500">{request.date}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200 transition-colors">
                      Accept
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200 transition-colors">
                      Counter Offer
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200 transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
 

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      {notification && (
        <div className="fixed top-4 right-4 p-4 bg-blue-100 text-blue-800 rounded-lg shadow-md animate-slide-in z-50">
          {notification}
        </div>
      )}

      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
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
              onClick={() => setShowNotificationsModal(true)}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Notifications"
            >
              <BellIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowScanner(true)}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Image Scanner"
            >
              <QrCodeIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
              title="View Cart"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>
            <div
              className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors border border-gray-200"
              onClick={() => setShowProfileForm(true)}
              title="Manage Profile"
            >
              <img
                src={profile.image || `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=E0F2F7&color=000000&size=32`}
                className="w-8 h-8 rounded-full object-cover"
                alt="Profile"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=E0F2F7&color=000000&size=32` }}
              />
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700 font-semibold">{profile.companyName || 'Your Company'}</p>
                <p className="text-xs text-gray-500">{profile.name || 'Buyer Name'}</p>
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

      <div className="flex flex-1">
        <nav className="hidden lg:block w-64 bg-white border-r border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 mb-8 pt-4">
            <div className="relative">
              <img
                src={profile.image || `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=E0F2F7&color=000000&size=120`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                alt="Profile"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=E0F2F7&color=000000&size=120` }}
              />
              <button 
                onClick={() => setShowProfileForm(true)}
                className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full text-white hover:bg-blue-600 transition-colors"
              >
                <UserCircleIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-800 text-lg">{profile.name || 'Buyer Name'}</h3>
              <p className="text-gray-600 text-sm">{profile.companyName || 'Your Company'}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
              { id: 'contracts', label: 'Farmer Contracts', icon: DocumentTextIcon },
              { id: 'ongoingDeals', label: 'Ongoing Deals', icon: ClipboardDocumentCheckIcon },
              { id: 'farmers', label: 'Farmers', icon: UsersIcon },
              { id: 'negotiations', label: 'Negotiation Requests', icon: ChatBubbleLeftRightIcon },
              { id: 'notifications', label: 'Notifications', icon: BellIcon, action: () => setShowNotificationsModal(true) },
              { id: 'scanner', label: 'Scanner', icon: QrCodeIcon, action: () => setShowScanner(true) },
            ].map((item) => (
              <button
                key={item.id}
                onClick={item.action ? item.action : () => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id && !item.action ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>

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
          
          <div className="flex flex-col items-center gap-4 mb-8 pt-4">
            <div className="relative">
              <img
                src={profile.image || `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=E0F2F7&color=000000&size=120`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                alt="Profile"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=E0F2F7&color=000000&size=120` }}
              />
              <button 
                onClick={() => { setShowProfileForm(true); setIsSidebarOpen(false); }}
                className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full text-white hover:bg-blue-600 transition-colors"
              >
                <UserCircleIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-800 text-lg">{profile.name || 'Buyer Name'}</h3>
              <p className="text-gray-600 text-sm">{profile.companyName || 'Your Company'}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
              { id: 'contracts', label: 'Farmer Contracts', icon: DocumentTextIcon },
              { id: 'ongoingDeals', label: 'Ongoing Deals', icon: ClipboardDocumentCheckIcon },
              { id: 'farmers', label: 'Farmers', icon: UsersIcon },
              { id: 'negotiations', label: 'Negotiation Requests', icon: ChatBubbleLeftRightIcon },
              { id: 'notifications', label: 'Notifications', icon: BellIcon, action: () => { setShowNotificationsModal(true); setIsSidebarOpen(false); } },
              { id: 'scanner', label: 'Scanner', icon: QrCodeIcon, action: () => { setShowScanner(true); setIsSidebarOpen(false); } },
            ].map((item) => (
              <button
                key={item.id}
                onClick={item.action ? item.action : () => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id && !item.action ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-8 bg-gray-50">
          {isLoading ? (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading dashboard...</p>
              </div>
            </div>
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
                  {contracts.length > 0 ? contracts.map(contract => (
                    <div key={contract._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                      <img
                        src={contract.image || 'https://placehold.co/400x200/E0F2F7/000000?text=Product'}
                        className="w-full h-48 object-cover rounded-md mb-4"
                        alt="Contract"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x200/E0F2F7/000000?text=Product' }}
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
                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
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
                  )) : (
                    <div className="col-span-full text-center py-12">
                      <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-700">No contracts available</h3>
                      <p className="text-gray-500 mt-2">Check back later for farmer contracts</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'ongoingDeals' && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Your Ongoing Deals</h2>
                  <p className="text-gray-600">Contracts currently in progress or awaiting finalization</p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contracts.filter(c => c.status === 'Ongoing' || c.status === 'Confirmed').length > 0 ? (
                      contracts.filter(c => c.status === 'Ongoing' || c.status === 'Confirmed').map(deal => (
                        <div key={deal._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-800">{deal.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              deal.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {deal.status}
                            </span>
                          </div>
                          <div className="mt-3 text-sm text-gray-600">
                            <p><strong>Farmer:</strong> {deal.farmer?.name || 'Unknown'}</p>
                            <p><strong>Quantity:</strong> {deal.quantity}</p>
                            <p><strong>Price:</strong> ₹{deal.price.toLocaleString()}</p>
                          </div>
                          <button 
                            onClick={() => setSelectedContract(deal)}
                            className="mt-4 w-full py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-8">
                        <ClipboardDocumentCheckIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-700">No ongoing deals</h3>
                        <p className="text-gray-500 mt-2">Add contracts to your cart to start deals</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'farmers' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Registered Farmers</h2>
                    <p className="text-gray-600 mb-6">Connect with farmers across India</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Search farmers..." 
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Search
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {farmers.length > 0 ? farmers.map(farmer => (
                        <div key={farmer._id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center overflow-hidden">
                                {farmer.image ? (
                                  <img 
                                    src={farmer.image} 
                                    className="w-full h-full object-cover"
                                    alt="Farmer"
                                    onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${farmer.fName}+${farmer.lName}&background=random`}
                                  />
                                ) : (
                                  <span className="text-gray-500 text-xl font-bold">
                                    {farmer.fName?.charAt(0) || 'F'}
                                  </span>
                                )}
                              </div>
                              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                ★ 4.8
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                {farmer.fName || 'Unknown'} {farmer.lName || 'Farmer'}
                              </h3>
                              <p className="text-gray-600 text-sm">{farmer.location || 'India'}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>Certified Organic Farmer</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span>{farmer.location || 'Punjab, India'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                              </svg>
                              <span>12 Active Contracts</span>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex gap-3">
                            <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                              Contact
                            </button>
                            <button className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
                              View Products
                            </button>
                          </div>
                        </div>
                      )) : (
                        <div className="col-span-full text-center py-12">
                          <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-xl font-medium text-gray-700">No farmers found</h3>
                          <p className="text-gray-500 mt-2">Farmers will appear when they register</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'negotiations' && (
                <NegotiationRequests />
              )}
            </>
          )}
        </main>
      </div>

      {showProfileForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md relative shadow-lg animate-scale-in">
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
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">Company Name</label>
                <input
                  type="text"
                  value={profile.companyName || ''}
                  onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
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

      {showCart && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-2xl relative shadow-lg animate-scale-in">
            <button
              onClick={() => setShowCart(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
                <button
                  onClick={() => { setActiveTab('contracts'); setShowCart(false); }}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                >
                  Browse Contracts
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || 'https://placehold.co/60x60/E0F2F7/000000?text=Item'}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        alt="Contract"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/60x60/E0F2F7/000000?text=Item' }}
                      />
                      <div>
                        <h3 className="text-gray-800 font-medium">{item.title || 'N/A'}</h3>
                        <p className="text-gray-600 text-sm">
                          ₹{(item.price || 0).toLocaleString()} • {item.quantity || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCartAction(item)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium flex-shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-800">₹{cartItems.reduce((sum, item) => sum + (item.price || 0), 0).toLocaleString()}</span>
                  </div>
                  <button className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      

      {selectedContract && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-2xl relative shadow-lg animate-scale-in">
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
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/E0F2F7/000000?text=Product+Details' }}
              />
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-800">{selectedContract.title || 'N/A'}</h2>
                <p className="text-gray-600">{selectedContract.description || 'No description available.'}</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Farmer:</strong> {selectedContract.farmer?.name || 'N/A'}</p>
                  <p><strong>Location:</strong> {selectedContract.location || 'N/A'}</p>
                  <p><strong>Price:</strong> ₹{(selectedContract.price || 0).toLocaleString()}</p>
                  <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedContract.status === 'Active' ? 'bg-green-100 text-green-700' :
                      selectedContract.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>{selectedContract.status || 'N/A'}</span></p>
                  <p><strong>Quantity:</strong> {selectedContract.quantity || 'N/A'}</p>
                  <p><strong>Quality:</strong> {selectedContract.quality || 'Standard'}</p>
                 
                </div>
                 <div className="mt-4">
        <h3 className="text-gray-800 font-medium mb-2">Send Negotiation</h3>
        
        {/* ADD THIS INPUT FOR PRICE */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proposed Price (₹)
          </label>
          <input
            type="number"
            value={proposedPrice}
            onChange={(e) => setProposedPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your proposed price"
          />
        </div>
        
        <textarea
          value={negotiationMessage}
          onChange={(e) => setNegotiationMessage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
          placeholder="Type your negotiation message..."
          rows="3"
        />
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={viewAllDetails}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
                    >
                      <InformationCircleIcon className="w-5 h-5" />
                      All Details
                    </button>
                    <button
                      onClick={sendNegotiation}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showScanner && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md relative shadow-lg animate-scale-in">
            <button
              onClick={() => setShowScanner(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <ImageScanner />
          </div>
        </div>
      )}

      {showNotificationsModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md relative shadow-lg animate-scale-in">
            <button
              onClick={() => setShowNotificationsModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <Notifications />
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;