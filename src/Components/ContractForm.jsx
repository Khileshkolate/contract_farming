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
        status: 'Active', // New field
        quantity: '',    // New field
        quantityUnit: 'kg', // New field for quantity unit
        quality: 'Standard', // New field
        harvestDate: '', // New field
        deliveryTerms: '', // New field
        duration: '1 year',
        startDate: 'Immediate',
        plantingPeriod: 'July-September',
        price: '',
        description: '',
        contractFile: null, // New field for file upload
    });
    const [error, setError] = useState('');
    const [filePreview, setFilePreview] = useState(null); // To display uploaded file name/preview

    useEffect(() => {
        if (editId) {
            const fetchContract = async () => {
                try {
                    const response = await fetch(`${link}/api/contracts/${editId}`);
                    if (!response.ok) throw new Error('Failed to fetch contract');
                    const data = await response.json();
                    setContract(data);
                    // If there's a file path in the fetched data, set it for preview
                    if (data.contractFilePath) {
                        setFilePreview(data.contractFilePath.split('/').pop()); // Just display file name
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
            if (files[0]) {
                setFilePreview(files[0].name);
            } else {
                setFilePreview(null);
            }
        } else {
            setContract({ ...contract, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        const formData = new FormData();
        for (const key in contract) {
            if (key === 'contractFile' && contract[key]) {
                formData.append(key, contract[key]);
            } else if (key !== 'contractFile') { // Exclude file if null, it will be added only if present
                formData.append(key, contract[key]);
            }
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication token missing');

            const method = editId ? 'PUT' : 'POST';
            const url = editId
                ? `${link}/api/contracts/${editId}`
                : '${link}/api/contracts';

            const response = await fetch(url, {
                method,
                headers: {
                    // 'Content-Type': 'application/json', // No content-type when sending FormData
                    'Authorization': `Bearer ${token}`
                },
                body: formData // Send FormData directly
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

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden border-4 border-green-800">
                <div className="bg-green-800 text-white p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                        {editId ? 'Edit Contract Details' : 'Add Contract Information'}
                    </h2>
                    <button onClick={onClose} className="text-white hover:text-yellow-300">
                        <FaTimes size={24} />
                    </button>
                </div>

                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Contract ID*</label>
                                <input
                                    type="text"
                                    name="contractId"
                                    value={contract.contractId}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Name*</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={contract.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Email*</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={contract.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            {/* <div>
                                <label className="block text-gray-700 mb-2">Crop Name*</label>
                                <input
                                    type="text"
                                    name="cropName"
                                    value={contract.cropName}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Land Area (acres)*</label>
                                <input
                                    type="number"
                                    name="landArea"
                                    value={contract.landArea}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                />
                            </div> */}

                            <div>
                                <label className="block text-gray-700 mb-2">Location*</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={contract.location}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            {/* New: Status Dropdown */}
                            <div>
                                <label className="block text-gray-700 mb-2">Status*</label>
                                <select
                                    name="status"
                                    value={contract.status}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            {/* New: Quantity and Quantity Unit */}
                            <div className="flex gap-2">
                                <div className="flex-grow">
                                    <label className="block text-gray-700 mb-2">Quantity*</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={contract.quantity}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Unit</label>
                                    <select
                                        name="quantityUnit"
                                        value={contract.quantityUnit}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded"
                                    >
                                        <option value="kg">Kilograms (kg)</option>
                                        <option value="quintals">Quintals</option>
                                        <option value="tons">Tons</option>
                                        <option value="liters">Liters</option>
                                        <option value="pieces">Pieces</option>
                                    </select>
                                </div>
                            </div>

                            {/* New: Quality Dropdown */}
                            <div>
                                <label className="block text-gray-700 mb-2">Quality*</label>
                                <select
                                    name="quality"
                                    value={contract.quality}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="Standard">Standard</option>
                                    <option value="Low">Low</option>
                                    <option value="High">High</option>
                                    <option value="Premium">Premium</option>
                                </select>
                            </div>

                            {/* New: Harvest Date */}
                            <div>
                                <label className="block text-gray-700 mb-2">Harvest Date</label>
                                <input
                                    type="date"
                                    name="harvestDate"
                                    value={contract.harvestDate}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Duration*</label>
                                <select
                                    name="duration"
                                    value={contract.duration}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="1 year">1 year</option>
                                    <option value="6 months">6 months</option>
                                    <option value="2 years">2 years</option>
                                    <option value="3 years">3 years</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Start Date*</label>
                                <select
                                    name="startDate"
                                    value={contract.startDate}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="Immediate">Immediate</option>
                                    <option value="Next month">Next month</option>
                                    <option value="Next season">Next season</option>
                                    <option value="Custom Date">Custom Date</option> {/* Added for flexibility */}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Planting Period*</label>
                                <select
                                    name="plantingPeriod"
                                    value={contract.plantingPeriod}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="July-September">July-September</option>
                                    <option value="October-December">October-December</option>
                                    <option value="January-March">January-March</option>
                                    <option value="April-June">April-June</option>
                                    <option value="Year-round">Year-round</option> {/* Added for flexibility */}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Price (₹)*</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={contract.price}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </div>

                        {/* New: Upload Contract PDF/Image */}
                        <div>
                            <label className="block text-gray-700 mb-2">Upload Contract (PDF/Image)</label>
                            <input
                                type="file"
                                name="contractFile"
                                onChange={handleChange}
                                accept=".pdf, .jpg, .jpeg, .png"
                                className="w-full p-3 border border-gray-300 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            />
                            {filePreview && (
                                <p className="text-gray-600 text-sm mt-2">Selected file: {filePreview}</p>
                            )}
                        </div>

                        {/* New: Delivery Terms */}
                        <div>
                            <label className="block text-gray-700 mb-2">Delivery Terms</label>
                            <textarea
                                name="deliveryTerms"
                                value={contract.deliveryTerms}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded"
                                rows="4"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Additional Description</label>
                            <textarea
                                name="description"
                                value={contract.description}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded"
                                rows="4"
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
                            >
                                <FaSave />
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