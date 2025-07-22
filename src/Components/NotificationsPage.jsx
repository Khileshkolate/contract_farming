import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileContract, FaBell } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const link = "https://contract-farming.onrender.com";

const NotificationsPage = () => {
    const [negotiations, setNegotiations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNegotiations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${link}/api/negotiations`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setNegotiations(data);
            } catch (error) {
                console.error('Error fetching negotiations:', error);
            }
        };

        fetchNegotiations();
        const interval = setInterval(fetchNegotiations, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>

            {/* Scrollable Main Content */}
            <main className="flex-grow pt-24 px-4 md:px-8 overflow-y-auto">
               
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-green-200">
                    <h3 className="text-2xl font-bold text-green-800 mb-6 border-b pb-3 border-green-300">Negotiation Requests</h3>
                    <div className="space-y-6">
                        {negotiations.length > 0 ? (
                            negotiations.map(negotiation => {
                                const sentAt = negotiation?.createdAt ? new Date(negotiation.createdAt) : null;
                                const isValidSentDate = sentAt instanceof Date && !isNaN(sentAt);
                                const formattedSentTime = isValidSentDate
                                    ? sentAt.toLocaleString('en-IN', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })
                                    : 'Time not available';

                                return (
                                    <div key={negotiation._id} className="bg-green-50 p-6 rounded-lg border-2 border-green-300 hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <h4 className="text-xl font-semibold text-green-800">
                                                    {negotiation.buyerId?.fName || 'Unknown Buyer'} {negotiation.buyerId?.lName}
                                                </h4>
                                                <p className="text-green-600 text-base mt-1">
                                                    {negotiation.buyerId?.email || 'No email provided'}
                                                </p>
                                            </div>
                                            <div className="text-right text-sm text-gray-600">
                                                <span className="block text-xs text-green-500">Sent at:</span>
                                                {formattedSentTime}
                                            </div>
                                        </div>
                                        <div className="bg-green-100 p-4 rounded-md mt-3 border border-green-200">
                                            <p className="text-green-800 italic text-base">
                                                "{negotiation.message || 'No message provided'}"
                                            </p>
                                        </div>
                                        <div className="mt-4 text-base text-green-700 space-y-1">
                                            <p className="font-bold">Contract Details:</p>
                                            <div className="pl-3">
                                                <p>Title: <span className="font-medium">{negotiation.contractId?.title || 'Untitled'}</span></p>
                                                <p>Original Price: <span className="font-medium">₹{(negotiation.contractId?.price || 0).toLocaleString('en-IN')}</span></p>
                                                <p>Offered Price: <span className="font-medium">₹{(negotiation.proposedPrice || 0).toLocaleString('en-IN')}</span></p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => navigate('/negotiation-details', { state: { negotiation } })}
                                            className="mt-5 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full flex items-center justify-center gap-2 text-md font-semibold shadow-md"
                                        >
                                            <FaFileContract />
                                            View Complete Negotiation
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-6 bg-yellow-50 rounded-lg border border-yellow-200">
                                <p className="text-green-600 text-lg font-semibold">No pending negotiation requests.</p>
                                <p className="text-sm text-gray-500 mt-2">New requests will appear here automatically.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer at bottom */}
            <Footer />
        </div>
    );
};

export default NotificationsPage;
