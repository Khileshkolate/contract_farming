import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaUpload } from 'react-icons/fa';

const link = import.meta.env.VITE_BACKEND;

const ContractForm = ({ editId, onClose, onContractSaved }) => {
    const [contract, setContract] = useState({
        contractId: '',
        name: '',
        email: '',
        cropName: '',
        landArea: '',
        location: '',
        status: 'Active',
        quantity: '',
        quantityUnit: 'kg',
        quality: 'Standard',
        harvestDate: '',
        deliveryTerms: '',
        duration: '1 year',
        startDate: 'Immediate',
        plantingPeriod: 'July-September',
        price: '',
        description: '',
        contractFile: null,
    });
    const [error, setError] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        if (editId) {
            const fetchContract = async () => {
                try {
                    const response = await fetch(`${link}/api/contracts/${editId}`);
                    if (!response.ok) throw new Error('Failed to fetch contract');
                    const data = await response.json();
                    setContract(data);
                    if (data.contractFilePath) {
                        setFilePreview(data.contractFilePath.split('/').pop());
                    }
                } catch (err) {
                    setError(err.message);
                }
            };
            fetchContract();
        } else {
            setContract({
                contractId: '',
                name: '',
                email: '',
                cropName: '',
                landArea: '',
                location: '',
                status: 'Active',
                quantity: '',
                quantityUnit: 'kg',
                quality: 'Standard',
                harvestDate: '',
                deliveryTerms: '',
                duration: '1 year',
                startDate: 'Immediate',
                plantingPeriod: 'July-September',
                price: '',
                description: '',
                contractFile: null,
            });
            setFilePreview(null);
        }
    }, [editId]);

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

        const formData = new FormData();
        for (const key in contract) {
            if (key === 'contractFile' && contract[key]) {
                formData.append(key, contract[key]);
            } else if (key !== 'contractFile') {
                formData.append(key, contract[key]);
            }
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication token missing');

            const method = editId ? 'PUT' : 'POST';
            const url = editId 
                ? `${link}/api/contracts/${editId}`
                : `${link}/api/contracts`;

            const response = await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Operation failed');
            }

            alert(`Contract ${editId ? 'updated' : 'created'} successfully!`);
            if (onContractSaved) onContractSaved();
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
            {/* Solid Black Background Overlay */}
            <div 
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleClose}
            />
            
            {/* Responsive Modal Container */}
            <div 
                className={`relative bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden border-4 border-green-800 transform transition-all duration-300 ${
                    isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
                style={{ maxHeight: '90vh' }}
            >
                <div className="bg-green-800 text-white p-4 flex justify-between items-center">
                    <h2 className="text-lg md:text-xl font-bold">
                        {editId ? 'Edit Contract Details' : 'Add Contract Information'}
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
                            {/* Form Fields */}
                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Contract ID*
                                </label>
                                <input
                                    type="text"
                                    name="contractId"
                                    value={contract.contractId}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Name*
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={contract.name}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={contract.email}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Location*
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={contract.location}
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
                                    value={contract.status}
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
                                        value={contract.quantity}
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
                                        value={contract.quantityUnit}
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
                                    value={contract.quality}
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
                                    Harvest Date
                                </label>
                                <input
                                    type="date"
                                    name="harvestDate"
                                    value={contract.harvestDate}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Duration*
                                </label>
                                <select
                                    name="duration"
                                    value={contract.duration}
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
                                    Start Date*
                                </label>
                                <select
                                    name="startDate"
                                    value={contract.startDate}
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

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Planting Period*
                                </label>
                                <select
                                    name="plantingPeriod"
                                    value={contract.plantingPeriod}
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

                            <div>
                                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                    Price (₹)*
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={contract.price}
                                    onChange={handleChange}
                                    className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                    required
                                />
                            </div>
                        </div>

                        <div>
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

                        <div>
                            <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                Delivery Terms
                            </label>
                            <textarea
                                name="deliveryTerms"
                                value={contract.deliveryTerms}
                                onChange={handleChange}
                                className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                rows="3"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                                Additional Description
                            </label>
                            <textarea
                                name="description"
                                value={contract.description}
                                onChange={handleChange}
                                className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base"
                                rows="3"
                            />
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
                                {editId ? 'Update Contract' : 'Save Contract'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContractForm;