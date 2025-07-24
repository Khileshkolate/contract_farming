// NegotiationDetails.jsx (Frontend)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHandshake, FaCheckCircle, FaTimesCircle, FaLock } from 'react-icons/fa';
import axios from 'axios';

const link = import.meta.env.VITE_BACKEND;

const NegotiationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [negotiation, setNegotiation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800',
    closed: 'bg-gray-100 text-gray-800',
    finalized: 'bg-green-100 text-green-800'
  };

  useEffect(() => {
    const fetchNegotiationDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${link}/api/negotiations/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNegotiation(response.data);
      } catch (err) {
        setError('Failed to fetch negotiation details');
      } finally {
        setLoading(false);
      }
    };

    fetchNegotiationDetails();
  }, [id]);

  const updateNegotiationStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${link}/api/negotiations/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNegotiation(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      setError('Failed to update negotiation status');
    }
  };

  if (loading) return <div className="text-center py-8">Loading negotiation details...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto my-8 shadow-lg">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-green-800">Negotiation Details</h2>
          <span className={`px-3 py-1 rounded-full text-sm ${statusColors[negotiation.status]}`}>
            {negotiation.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-800">Buyer Information:</h3>
            <div className="space-y-1">
              <p className="text-gray-700">{negotiation.buyerId.fName} {negotiation.buyerId.lName}</p>
              <p className="text-green-600">{negotiation.buyerId.email}</p>
              <p className="text-sm text-gray-500">
                Initiated: {new Date(negotiation.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-800">Contract Details:</h3>
            <div className="space-y-1">
              <p className="text-gray-700">{negotiation.contractId.title}</p>
              <p className="text-blue-600">₹{negotiation.contractId.price?.toLocaleString()}</p>
              <p className="text-gray-600">Area: {negotiation.contractId.area}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-800">Negotiation Message:</h4>
          <p className="text-gray-700 italic">{negotiation.message}</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center border-t pt-4">
          {negotiation.status === 'pending' && (
            <>
              <button 
                onClick={() => updateNegotiationStatus('rejected')}
                className="px-5 py-2.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center gap-2"
              >
                <FaTimesCircle className="w-5 h-5" /> Reject Offer
              </button>
              
              <button 
                onClick={() => updateNegotiationStatus('accepted')}
                className="px-5 py-2.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors flex items-center gap-2"
              >
                <FaCheckCircle className="w-5 h-5" /> Accept Offer
              </button>
            </>
          )}

          {negotiation.status === 'accepted' && (
            <>
              <button 
                onClick={() => updateNegotiationStatus('finalized')}
                className="px-5 py-2.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors flex items-center gap-2"
              >
                <FaHandshake className="w-5 h-5" /> Finalize Deal
              </button>
              
              <button 
                onClick={() => updateNegotiationStatus('closed')}
                className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <FaLock className="w-5 h-5" /> Close Negotiation
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NegotiationDetails;