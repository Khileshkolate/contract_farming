// LandsSectionRent.jsx
import { useState, useEffect } from 'react';
import { FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const link = import.meta.env.VITE_BACKEND;

const SectionTitle = ({ title }) => (
  <div className="text-center bg-green-800 text-white py-3 text-lg font-bold rounded-md mb-6 w-full">
    {title}
  </div>
);

const LandRentCard = ({ id, image, title, area, monthlyRate, status, onDelete }) => (
  <div className="bg-gray-100 border border-green-800 text-center p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <img src={image || '/placeholder-land.jpg'} alt={title} className="w-full h-40 object-cover rounded-md mb-2" />
    <h4 className="bg-green-800 text-white py-1 rounded-md text-lg font-semibold">{title}</h4>
    <p className="text-gray-700 mt-1">{area}</p>
    <p className="font-bold text-gray-900 mt-1">₹{monthlyRate}/month</p>
    <p className={`font-bold mt-1 ${status === 'Available' ? 'text-green-600' : 'text-orange-500'}`}>
      {status}
    </p>
    <div className="mt-3 flex gap-2">
      <button 
        onClick={() => onDelete(id)} 
        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-800 transition w-full"
      >
        <FaTrash className="inline-block mr-2" /> Delete
      </button>
    </div>
  </div>
);

const LandsSectionRent = () => {
  const [lands, setLands] = useState([]);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    area: '',
    monthlyRate: '',
    status: 'Available'
  });
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await fetch(`${link}/api/land-rent`);
        if (!response.ok) throw new Error('Failed to fetch lands');
        const data = await response.json();
        setLands(data);
      } catch (error) {
        console.error('Error fetching lands:', error);
        setError('Failed to load lands. Please try again later.');
      }
    };
    fetchLands();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to delete land');
        return;
      }

      const response = await fetch(`${link}/api/land-rent/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete land');
      
      setLands(prev => prev.filter(land => land._id !== id));
      alert('Land deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      alert(error.message || 'Error deleting land');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add land');
        return;
      }

      const submissionData = {
        ...formData,
        monthlyRate: Number(formData.monthlyRate) || 0
      };

      const response = await fetch(`${link}/api/land-rent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add land');
      }

      const newLand = await response.json();
      setLands(prev => [...prev, newLand]);
      setFormData({
        image: '',
        title: '',
        area: '',
        monthlyRate: '',
        status: 'Available'
      });
      alert('Land added successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message || 'Error saving land');
    }
  };

  return (
    <div className="w-full px-4">
      <SectionTitle title="Lands Available For Rent" />
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 w-full">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lands
              .slice(0, showAll ? lands.length : 3)
              .map(land => (
                <LandRentCard
                  key={land._id}
                  id={land._id}
                  image={land.image}
                  title={land.title}
                  area={land.area}
                  monthlyRate={land.monthlyRate}
                  status={land.status}
                  onDelete={handleDelete}
                />
              ))}
          </div>

          {lands.length > 3 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-3 rounded-lg 
                         hover:from-green-600 hover:to-green-500 transition-all duration-300 shadow-md
                         hover:shadow-lg flex items-center justify-center gap-2 mx-auto"
              >
                {showAll ? (
                  <>
                    <FaChevronUp className="inline-block" />
                    Show Less
                  </>
                ) : (
                  <>
                    <FaChevronDown className="inline-block" />
                    View All ({lands.length - 3}+)
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-4 mx-4"
        >
          <h3 className="text-lg font-semibold mb-4">Add New Land</h3>
          <input
            type="url"
            placeholder="Image URL"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-600"
            value={formData.image}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-600"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
          <input
            type="text"
            placeholder="Land Area"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-600"
            value={formData.area}
            onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
            required
          />
          <input
            type="number"
            placeholder="Monthly Rate"
            min="0"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-600"
            value={formData.monthlyRate}
            onChange={(e) => setFormData(prev => ({ ...prev, monthlyRate: e.target.value }))}
            required
          />
          <select
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-600"
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="Available">Available</option>
            <option value="Pre-book">Pre-book</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-3 rounded hover:bg-green-600 transition font-semibold"
          >
            Add Land
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandsSectionRent;