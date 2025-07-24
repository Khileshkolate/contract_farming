import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const NegotiationRequests = ({ fetchWithAuth, setNotification, negotiationRequests, fetchNegotiationRequests }) => {

  const handleAcceptNegotiation = async (requestId) => {
    try {
      await fetchWithAuth(`/api/negotiations/${requestId}/accept`, { method: 'POST' });
      setNotification('Negotiation accepted successfully!');
      fetchNegotiationRequests();
    } catch (error) {
      setNotification('Failed to accept negotiation');
    }
  };

  const handleDeclineNegotiation = async (requestId) => {
    try {
      await fetchWithAuth(`/api/negotiations/${requestId}/decline`, { method: 'POST' });
      setNotification('Negotiation declined successfully!');
      fetchNegotiationRequests();
    } catch (error) {
      setNotification('Failed to decline negotiation');
    }
  };

  return (
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
            <div key={request._id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {request.farmer?.fName} {request.farmer?.lName}
                    </h3>
                    <p className="text-gray-600 text-sm">{request.contractId?.title}</p>
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
                  <span className="text-xs text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                  {request.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAcceptNegotiation(request._id)}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200 transition-colors"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleDeclineNegotiation(request._id)}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200 transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NegotiationRequests;