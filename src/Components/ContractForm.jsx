import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaUpload, FaInfoCircle } from 'react-icons/fa';

const link = import.meta.env.VITE_BACKEND;

const ContractForm = ({ contractId, onClose, onContractSaved }) => {
    const [contract, setContract] = useState({
        title: '',
        description: '',
        price: '',
        duration: '1 year',
        area: '',
        status: 'Active',
        quantity: '',
        quantityUnit: 'kg',
        quality: 'Standard',
        harvestDate: '',
        deliveryTerms: '',
        startDate: 'Immediate',
        plantingPeriod: 'July-September',
        contractFile: null
    });
    
    const [error, setError] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        
        const fetchContract = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${link}/api/contracts/${contractId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (!response.ok) throw new Error('Failed to fetch contract');
                const data = await response.json();
                
                setContract({
                    ...data,
                    harvestDate: data.harvestDate ? new Date(data.harvestDate).toISOString().split('T')[0] : ''
                });
                
                if (data.contractFile) {
                    setFilePreview(data.contractFile.split('/').pop());
                }
            } catch (err) {
                setError(err.message);
            }
        };

        if (contractId) {
            fetchContract();
        }
    }, [contractId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "contractFile") {
            setContract({ ...contract, contractFile: files[0] });
            setFilePreview(files[0] ? files[0].name : null);
        } else {
            setContract({ ...contract, [name]: value });
        }
    };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication token missing');

    const formData = new FormData();
    
    // Append all fields
    formData.append('title', contract.title);
    formData.append('description', contract.description);
    formData.append('price', contract.price);
    formData.append('duration', contract.duration);
    formData.append('area', contract.area);
    formData.append('status', contract.status);
    formData.append('quantity', contract.quantity);
    formData.append('quantityUnit', contract.quantityUnit);
    formData.append('quality', contract.quality);
    formData.append('harvestDate', contract.harvestDate);
    formData.append('deliveryTerms', contract.deliveryTerms);
    formData.append('startDate', contract.startDate);
    formData.append('plantingPeriod', contract.plantingPeriod);
    
    // Only append file if it's a new file
    if (contract.contractFile instanceof File) {
      formData.append('contractFile', contract.contractFile);
    }

    const response = await fetch(`${link}/api/contracts/${contractId}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Operation failed');
    }

    alert('Contract updated successfully!');
    if (onContractSaved) onContractSaved();
    onClose();
  } catch (err) {
    console.error("Update error:", err);
    setError(err.message || "Failed to update contract");
  }
};

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
            <div 
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleClose}
            />
            
            <div 
                className={`relative bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden border-4 border-green-800 transform transition-all duration-300 ${
                    isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
                style={{ maxHeight: '90vh' }}
            >
                <div className="bg-green-800 text-white p-4 flex justify-between items-center">
                    <h2 className="text-lg md:text-xl font-bold">
                        Edit Contract Details
                    </h2>
                    <button 
                        onClick={handleClose} 
                        className="text-white hover:text-yellow-300 transition-colors"
                        aria-label="Close"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                <div className="p-4 md:p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 60px)' }}>
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Contract ID
                                </label>
                                <input
                                    type="text"
                                    value={contractId}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base bg-gray-100"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Crop Name*
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={contract.title || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Land Area*
                                </label>
                                <input
                                    type="text"
                                    name="area"
                                    value={contract.area || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Status*
                                </label>
                                <select
                                    name="status"
                                    value={contract.status || 'Active'}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    required
                                >
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div className="flex flex-col md:flex-row gap-2">
                                <div className="flex-grow">
                                    <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                        Quantity*
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={contract.quantity || ''}
                                        onChange={handleChange}
                                        className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                        Unit
                                    </label>
                                    <select
                                        name="quantityUnit"
                                        value={contract.quantityUnit || 'kg'}
                                        onChange={handleChange}
                                        className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    >
                                        <option value="kg">Kilograms (kg)</option>
                                        <option value="quintals">Quintals</option>
                                        <option value="tons">Tons</option>
                                        <option value="liters">Liters</option>
                                        <option value="pieces">Pieces</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Quality*
                                </label>
                                <select
                                    name="quality"
                                    value={contract.quality || 'Standard'}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    required
                                >
                                    <option value="Standard">Standard</option>
                                    <option value="Low">Low</option>
                                    <option value="High">High</option>
                                    <option value="Premium">Premium</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Duration*
                                </label>
                                <select
                                    name="duration"
                                    value={contract.duration || '1 year'}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    required
                                >
                                    <option value="1 year">1 year</option>
                                    <option value="6 months">6 months</option>
                                    <option value="2 years">2 years</option>
                                    <option value="3 years">3 years</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Price (₹)*
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={contract.price || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    required
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden mb-4 border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b pb-3">
                                <FaInfoCircle className="mr-2 text-green-600" /> Additional Details
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                            Harvest Date
                                        </label>
                                        <input
                                            type="date"
                                            name="harvestDate"
                                            value={contract.harvestDate || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                            Start Date*
                                        </label>
                                        <select
                                            name="startDate"
                                            value={contract.startDate || 'Immediate'}
                                            onChange={handleChange}
                                            className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                            required
                                        >
                                            <option value="Immediate">Immediate</option>
                                            <option value="Next month">Next month</option>
                                            <option value="Next season">Next season</option>
                                            <option value="Custom Date">Custom Date</option>
                                        </select>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                            Planting Period*
                                        </label>
                                        <select
                                            name="plantingPeriod"
                                            value={contract.plantingPeriod || 'July-September'}
                                            onChange={handleChange}
                                            className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                            required
                                        >
                                            <option value="July-September">July-September</option>
                                            <option value="October-December">October-December</option>
                                            <option value="January-March">January-March</option>
                                            <option value="April-June">April-June</option>
                                            <option value="Year-round">Year-round</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                            Upload Contract (PDF/Image)
                                        </label>
                                        <div className="flex items-center">
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <FaUpload className="w-8 h-8 mb-2 text-gray-500" />
                                                    <p className="mb-1 text-sm text-gray-500">
                                                        <span className="font-semibold">Click to upload</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        PDF, JPG, or PNG (MAX. 10MB)
                                                    </p>
                                                </div>
                                                <input 
                                                    type="file" 
                                                    name="contractFile"
                                                    onChange={handleChange}
                                                    accept=".pdf, .jpg, .jpeg, .png"
                                                    className="hidden" 
                                                />
                                            </label>
                                        </div>
                                        {filePreview && (
                                            <p className="text-gray-600 text-xs md:text-sm mt-2">
                                                Selected file: {filePreview}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                            Delivery Terms
                                        </label>
                                        <textarea
                                            name="deliveryTerms"
                                            value={contract.deliveryTerms || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                            rows="2"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Additional Description
                                </label>
                                <textarea
                                    name="description"
                                    value={contract.description || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    rows="3"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm md:text-base"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
                            >
                                <FaSave className="text-sm md:text-base" />
                                Update Contract
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContractForm;