// File: src/components/ContractNegotiationPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaFileContract, FaMoneyBillWave,
         FaCalendarAlt, FaCheckCircle, FaTimesCircle,
         FaMapMarkerAlt, FaSeedling, FaTag, FaHandshake, FaBan } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const ContractNegotiationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [negotiation, setNegotiation] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Sample negotiation data structure (for demo purposes)
  const sampleNegotiation = {
    _id: 'neg123456',
    contractId: {
      _id: 'ctr2023001',
      title: 'Organic Fuji Apples',
      description: 'Premium quality organic Fuji apples from Himachal Pradesh',
      price: 85, // Farmer's listed price
      quantity: 500,
      unit: 'kg',
      deliveryDate: '2023-12-15',
      status: 'Negotiating', // Contract status
      farmerId: {
        fName: 'Khilesh',
        lName: 'Sharma',
        email: 'khilesh@example.com'
      }
    },
    buyerId: {
      fName: 'Rajiv',
      lName: 'Patel',
      email: 'rajiv@freshfoods.com',
      company: 'Fresh Foods Ltd.',
      location: 'Mumbai, Maharashtra'
    },
    proposedPrice: 78, // Buyer's proposed price
    message: 'Given current market rates, we propose ₹78/kg for this premium quality. We can take the entire 500kg and arrange our own transport.',
    createdAt: '2023-10-18T10:30:00Z',
    status: 'Pending' // Negotiation status
  };

  useEffect(() => {
    if (location.state && location.state.negotiation) {
      setNegotiation(location.state.negotiation);
      setStatus(location.state.negotiation.status);
    } else {
      setNegotiation(sampleNegotiation);
      setStatus(sampleNegotiation.status);
    }
  }, [location.state]);

  const handleStatusUpdate = (newStatus) => {
    setLoading(true);
    setMessage('');

    setTimeout(() => {
      setStatus(newStatus);
      setLoading(false);

      let statusMessage = '';
      switch (newStatus) {
        case 'Accepted':
          statusMessage = 'Negotiation accepted successfully! The buyer has been notified and we will help facilitate the contract process.';
          break;
        case 'Rejected':
          statusMessage = 'Negotiation rejected. The buyer has been notified of your decision.';
          break;
        case 'Closed':
          statusMessage = 'Negotiation closed. This negotiation is now inactive.';
          break;
        case 'Deal':
        default:
          statusMessage = 'Negotiation status updated to Deal. Awaiting formal acceptance or further steps.';
          break;
      }
      setMessage(statusMessage);

      setTimeout(() => setMessage(''), 5000);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (!negotiation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
            <FaFileContract className="text-4xl text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Negotiation Details</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Please wait while we load the negotiation details...
          </p>
        </div>
      </div>
    );
  }

  const isActionDisabled = loading || ['Accepted', 'Rejected', 'Closed'].includes(status);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Scrollable Content with padding for header/footer */}
      <div className="bg-gradient-to-br from-green-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8 flex-grow pt-28 pb-16">
        <div className="max-w-4xl mx-auto">

          {/* New Hero/Title Section */}
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
              status === 'Closed' ? 'bg-gray-200 text-gray-700' :
              'bg-amber-100 text-amber-800'
            }`}>
              Status: {status}
            </div>
          </div>

          {/* Contract Summary Card (previously part of Negotiation Card) */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{negotiation.contractId.title}</h2>
                  <p className="opacity-90 text-sm">{negotiation.contractId.description}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <div className="bg-white/20 rounded-lg p-2 mr-3">
                    <FaSeedling className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Contract ID</p>
                    <p className="font-semibold">{negotiation.contractId._id}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Keeping this div empty, as detailed contract info is below */}
            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                        <FaMoneyBillWave className="text-3xl text-green-600 mb-2"/>
                        <p className="text-sm text-gray-500">Listed Price</p>
                        <p className="text-xl font-bold text-gray-800">₹{negotiation.contractId.price} <span className="text-base font-normal">/{negotiation.contractId.unit}</span></p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaTag className="text-3xl text-blue-600 mb-2"/>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="text-xl font-bold text-gray-800">{negotiation.contractId.quantity} <span className="text-base font-normal">{negotiation.contractId.unit}</span></p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaCalendarAlt className="text-3xl text-purple-600 mb-2"/>
                        <p className="text-sm text-gray-500">Delivery Date</p>
                        <p className="text-xl font-bold text-gray-800">{formatDate(negotiation.contractId.deliveryDate)}</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Buyer Information - This section starts here */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 p-6"> {/* Added p-6 here */}
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
                      {negotiation.buyerId.fName} {negotiation.buyerId.lName}
                    </p>
                    {negotiation.buyerId.company && (
                      <p className="text-gray-600 text-sm">{negotiation.buyerId.company}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start mt-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">{negotiation.buyerId.email}</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start mb-3">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-lg">{negotiation.buyerId.location}</p>
                  </div>
                </div>

                <div className="flex items-start mt-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaCalendarAlt className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Offer Date</p>
                    <p className="font-semibold text-gray-800">
                      {formatDateTime(negotiation.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Comparison */}
          <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center border-b pb-3">
              <FaMoneyBillWave className="mr-3 text-green-600" /> Price Proposal
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Your Listed Price</p>
                <p className="text-3xl font-bold text-green-700">
                  ₹{negotiation.contractId.price}
                  <span className="text-base font-normal"> / {negotiation.contractId.unit}</span>
                </p>
                <p className="mt-2 text-gray-600">
                  For {negotiation.contractId.quantity} {negotiation.contractId.unit}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-4xl text-gray-400 font-light">&rarr;</div> {/* Larger arrow */}
              </div>

              <div className={`border rounded-lg p-6 text-center ${
                negotiation.proposedPrice > negotiation.contractId.price * 0.95
                  ? 'bg-green-50 border-green-200'
                  : negotiation.proposedPrice > negotiation.contractId.price * 0.9
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-red-50 border-red-200'
              }`}>
                <p className="text-sm text-gray-600 mb-2">Buyer's Proposed Price</p>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{negotiation.proposedPrice}
                  <span className="text-base font-normal"> / {negotiation.contractId.unit}</span>
                </p>
                <div className="mt-3">
                  {negotiation.proposedPrice > negotiation.contractId.price ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      +₹{(negotiation.proposedPrice - negotiation.contractId.price).toFixed(2)} higher
                    </span>
                  ) : negotiation.proposedPrice === negotiation.contractId.price ? (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Same as your price
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                      -₹{(negotiation.contractId.price - negotiation.proposedPrice).toFixed(2)} lower
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Negotiation Message */}
          <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center border-b pb-3">
              <FaFileContract className="mr-3 text-green-600" /> Negotiation Message
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 italic text-lg leading-relaxed">"{negotiation.message}"</p>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-xl p-6 pt-6 overflow-hidden">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center border-b pb-3">
                <FaHandshake className="mr-3 text-green-600" /> Take Action
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => handleStatusUpdate('Deal')}
                disabled={isActionDisabled}
                className={`flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                  isActionDisabled ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <FaHandshake className="mr-2" /> Mark as Deal
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
                onClick={() => handleStatusUpdate('Closed')}
                disabled={isActionDisabled}
                className={`flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                  isActionDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <FaBan className="mr-2" /> Close Negotiation
              </button>
            </div>

            {message && (
              <div className={`mt-6 text-center p-4 rounded-lg ${
                status === 'Accepted' ? 'bg-green-100 text-green-700' :
                status === 'Rejected' ? 'bg-red-100 text-red-700' :
                status === 'Closed' ? 'bg-gray-100 text-gray-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-width Footer */}
      <Footer />
    </div>
  );
};

export default ContractNegotiationPage;