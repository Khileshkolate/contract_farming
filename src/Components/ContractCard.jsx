// src/components/ContractCard.jsx
import { FaTrash, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ContractCard = ({ contract, onDelete }) => {
  // Handle missing contract data
  if (!contract) return null;

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 m-4">
      {/* Image Section */}
      <div className="h-48 bg-gray-100 relative">
        <img 
          src={contract.image || '/default-farm.jpg'} 
          alt={contract.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/default-farm.jpg'; // Fallback image
          }}
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-sm">
          {contract.cropType || 'Agriculture'}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {contract.title || 'Untitled Contract'}
        </h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="mr-2">🌾</span>
          <span>{contract.area || '0'} acres</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span className="mr-2">💰</span>
          <span>₹{contract.price || '0'} per acre</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Link
            to={`/contracts/${contract._id}`}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <FaInfoCircle className="mr-2" />
            Details
          </Link>
          
          <button 
            onClick={() => onDelete(contract._id)}
            className="text-red-600 hover:text-red-800 transition-colors p-2"
            aria-label="Delete contract"
          >
            <FaTrash className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

ContractCard.propTypes = {
  contract: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    cropType: PropTypes.string,
    area: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ContractCard;