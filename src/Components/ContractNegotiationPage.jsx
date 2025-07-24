import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaFileContract, FaMoneyBillWave, 
         FaCalendarAlt, FaCheckCircle, FaTimesCircle,
         FaMapMarkerAlt, FaSeedling, FaTag, FaHandshake, FaBan, FaInfoCircle } from 'react-icons/fa'; // Added FaInfoCircle
import Header from './Header';
import Footer from './Footer';

// Ensure your .env file has VITE_BACKEND set correctly, e.g., VITE_BACKEND=http://localhost:5000
const link = import.meta.env.VITE_BACKEND;

const ContractNegotiationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [negotiation, setNegotiation] = useState(null);
  const [status, setStatus] = useState('Pending'); // Initial state for local status display
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // User feedback message

  useEffect(() => {
    const fetchNegotiation = async () => {
      try {
        const token = localStorage.getItem('token');
        const negotiationId = location.pathname.split('/').pop();
        
        // Log the negotiationId to confirm it's correct
        console.log("Fetching negotiation with ID:", negotiationId);

        const response = await fetch(`${link}/api/negotiations/${negotiationId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to fetch negotiation:', errorData.message || response.statusText);
          throw new Error(errorData.message || 'Failed to fetch negotiation');
        }
        
        const data = await response.json();
        console.log("Fetched negotiation data:", data); // Log the fetched data

        // Set negotiation and status from fetched data
        setNegotiation(data);
        setStatus(data.status || 'Pending'); // Use status from fetched data
      } catch (error) {
        console.error('Error fetching negotiation:', error);
        setMessage(`Error: ${error.message || 'Could not load negotiation details.'}`);
        // Optionally redirect or show an error state to the user
        // navigate('/notifications'); // Consider if this is the best UX for an error
      }
    };

    // If navigation state has negotiation, use it, otherwise fetch
    if (location.state?.negotiation) {
      setNegotiation(location.state.negotiation);
      setStatus(location.state.negotiation.status || 'Pending');
      console.log("Using negotiation from location state:", location.state.negotiation);
    } else {
      fetchNegotiation();
    }
  }, [location]); // Depend on location to re-fetch if URL changes

  const handleStatusUpdate = async (newStatus) => {
    // Prevent actions if no negotiation is loaded or if already processing
    if (!negotiation || !negotiation._id || loading) return; 
    
    setLoading(true); // Indicate loading state
    setMessage(''); // Clear previous messages
    
    try {
      const token = localStorage.getItem('token');
      // CRITICAL FIX: Changed URL to match backend's PUT endpoint
      const response = await fetch(`${link}/api/negotiations/${negotiation._id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }) // Send the new status
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update status:', errorData.message || response.statusText);
        throw new Error(errorData.message || 'Failed to update status');
      }
      
      // Update local state with the new status
      setStatus(newStatus);
      let statusMessage = '';
      switch (newStatus) {
        case 'Accepted': statusMessage = 'Negotiation accepted! Buyer notified.'; break;
        case 'Rejected': statusMessage = 'Negotiation rejected. Buyer notified.'; break;
        case 'Finalized': statusMessage = 'Negotiation marked as finalized. Deal secured!'; break; // Corrected to Finalized
        case 'Cancelled': statusMessage = 'Negotiation cancelled.'; break; // Added Cancelled
        case 'Pending': statusMessage = 'Status reset to Pending.'; break; // Should not happen via farmer actions, but good for completeness
        default: statusMessage = 'Status updated.';
      }
      setMessage(statusMessage); // Display success message
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage(`Failed to update status: ${error.message || 'Server error.'}`); // Display error message
    } finally {
      setLoading(false); // End loading state
      // Clear message after 5 seconds
      setTimeout(() => setMessage(''), 5000); 
    }
  };

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    return new Date(dateString).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Helper function to format date and time
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Date not available';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Loading state display
  if (!negotiation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
            <FaFileContract className="text-4xl text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Negotiation Details...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          {message && ( // Display loading-related errors
            <p className="mt-4 text-red-600 font-medium flex items-center justify-center">
              <FaInfoCircle className="mr-2" /> {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Safe access to nested properties (added null/undefined checks for robustness)
  const contract = negotiation.contractId || {};
  const buyer = negotiation.buyerId || {};
  const proposedPrice = negotiation.proposedPrice || 0;
  const contractPrice = contract.price || 0;

  // Determine if action buttons should be disabled
  // Now includes 'Finalized' and 'Cancelled' from backend enum
  const isActionDisabled = loading || ['Accepted', 'Rejected', 'Finalized', 'Cancelled'].includes(status);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="bg-gradient-to-br from-green-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8 flex-grow pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Contract Negotiation</h1>
              <p className="text-lg text-gray-700">
                Awaiting your response for the proposed deal.
              </p>
            </div>
            {/* Status Badge */}
            <div className={`px-5 py-2 rounded-full text-lg font-bold ${
              status === 'Accepted' ? 'bg-green-100 text-green-800' :
              status === 'Rejected' ? 'bg-red-100 text-red-800' :
              status === 'Finalized' ? 'bg-blue-100 text-blue-800' : // New: Finalized status color
              status === 'Cancelled' ? 'bg-gray-200 text-gray-700' : // New: Cancelled status color
              'bg-amber-100 text-amber-800' // Pending
            }`}>
              Status: {status}
            </div>
          </div>

          {/* Contract Details Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{contract.title || 'Contract Title Not Available'}</h2> {/* Improved fallback */}
                  <p className="opacity-90 text-sm">{contract.description || 'No description available for this contract.'}</p> {/* Improved fallback */}
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <div className="bg-white/20 rounded-lg p-2 mr-3">
                    <FaSeedling className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Contract ID</p>
                    <p className="font-semibold">{contract._id || 'ID not available'}</p> {/* Improved fallback */}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                        <FaMoneyBillWave className="text-3xl text-green-600 mb-2"/>
                        <p className="text-sm text-gray-500">Listed Price</p>
                        <p className="text-xl font-bold text-gray-800">
                            ₹{contractPrice.toLocaleString('en-IN')} 
                            <span className="text-base font-normal">/{contract.unit || 'unit'}</span>
                        </p>
                        <p className="mt-2 text-gray-600">
                            For {contract.area || 'N/A'} {contract.areaUnit || 'Sq. Ft.'} {/* Added areaUnit if available */}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaTag className="text-3xl text-blue-600 mb-2"/>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="text-xl font-bold text-gray-800">
                            {contract.duration || 'N/A'} <span className="text-base font-normal">days</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaCalendarAlt className="text-3xl text-purple-600 mb-2"/>
                        <p className="text-sm text-gray-500">Created On</p>
                        <p className="text-xl font-bold text-gray-800">
                            {formatDate(contract.createdAt)} {/* Use contract createdAt */}
                        </p>
                    </div>
                </div>
            </div>
          </div>

          {/* Buyer Information Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center border-b pb-3">
              <FaUser className="mr-3 text-green-600" /> Buyer Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start mb-3">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaUser className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Buyer Name</p>
                    <p className="font-semibold text-lg">
                      {buyer.fName || 'Unknown'} {buyer.lName || 'Buyer'}
                    </p>
                    {/* Assuming buyer might have a company field in User model if applicable */}
                    {buyer.company && (
                      <p className="text-gray-600 text-sm">{buyer.company}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start mt-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">
                      {buyer.email || 'No email provided'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start mb-3">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Buyer ID</p>
                    <p className="font-semibold text-lg">
                      {buyer._id || 'ID not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start mt-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaCalendarAlt className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Offer Date</p>
                    <p className="font-semibold text-gray-800">
                      {formatDateTime(negotiation.createdAt)} {/* Use negotiation createdAt */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Proposal Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center border-b pb-3">
              <FaMoneyBillWave className="mr-3 text-green-600" /> Price Proposal
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Your Listed Price</p>
                <p className="text-3xl font-bold text-green-700">
                  ₹{contractPrice.toLocaleString('en-IN')}
                  <span className="text-base font-normal"> / {contract.unit || 'unit'}</span>
                </p>
                <p className="mt-2 text-gray-600">
                  For {contract.area || 'N/A'} {contract.areaUnit || 'Sq. Ft.'}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-4xl text-gray-400 font-light">&rarr;</div>
              </div>

              <div className={`border rounded-lg p-6 text-center ${
                // Dynamic styling based on proposed price vs. contract price
                proposedPrice >= contractPrice
                  ? 'bg-green-50 border-green-200'
                  : proposedPrice > contractPrice * 0.9 // If proposed is within 10% lower
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-red-50 border-red-200' // If proposed is more than 10% lower
              }`}>
                <p className="text-sm text-gray-600 mb-2">Buyer's Proposed Price</p>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{proposedPrice.toLocaleString('en-IN')}
                  <span className="text-base font-normal"> / {contract.unit || 'unit'}</span>
                </p>
                <div className="mt-3">
                  {proposedPrice > contractPrice ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      +₹{(proposedPrice - contractPrice).toFixed(2)} higher
                    </span>
                  ) : proposedPrice === contractPrice ? (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Same as your price
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                      -₹{(contractPrice - proposedPrice).toFixed(2)} lower
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Negotiation Message Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center border-b pb-3">
              <FaFileContract className="mr-3 text-green-600" /> Negotiation Message
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 italic text-lg leading-relaxed">
                "{negotiation.message || 'No message provided by the buyer.'}"
              </p>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 pt-6 overflow-hidden">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center border-b pb-3">
                <FaHandshake className="mr-3 text-green-600" /> Take Action
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                // Changed 'Deal' to 'Finalized' to match backend enum
                onClick={() => handleStatusUpdate('Finalized')} 
                disabled={isActionDisabled}
                className={`flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                  isActionDisabled ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <FaHandshake className="mr-2" /> Mark as Finalized
              </button>

              <button
                onClick={() => handleStatusUpdate('Accepted')}
                disabled={isActionDisabled}
                className={`flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                  isActionDisabled ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                <FaCheckCircle className="mr-2" /> Accept Offer
              </button>

              <button
                onClick={() => handleStatusUpdate('Rejected')}
                disabled={isActionDisabled}
                className={`flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                  isActionDisabled ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                <FaTimesCircle className="mr-2" /> Reject Offer
              </button>

              <button
                // Changed 'Closed' to 'Cancelled' or 'Rejected' based on desired flow
                // 'Cancelled' implies the farmer initiated closing it for other reasons.
                // 'Rejected' is for declining the offer. If "Close" means withdrawing the contract, it's a different action.
                // For simplicity, I'm mapping 'Closed' to 'Cancelled' here.
                onClick={() => handleStatusUpdate('Cancelled')} 
                disabled={isActionDisabled}
                className={`flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                  isActionDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <FaBan className="mr-2" /> Cancel Negotiation
              </button>
            </div>

            {message && ( // Display feedback message
              <div className={`mt-6 text-center p-4 rounded-lg flex items-center justify-center ${
                status === 'Accepted' ? 'bg-green-100 text-green-700' :
                status === 'Rejected' ? 'bg-red-100 text-red-700' :
                status === 'Finalized' ? 'bg-blue-100 text-blue-700' : 
                status === 'Cancelled' ? 'bg-gray-100 text-gray-700' : 
                'bg-blue-100 text-blue-700'
              }`}>
                <FaInfoCircle className="mr-2" /> {message}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContractNegotiationPage;