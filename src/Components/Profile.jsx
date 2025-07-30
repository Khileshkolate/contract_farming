import { useState, useEffect } from "react";
import axios from "axios";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";
import Header from './Header';
import Footer from './Footer';

const link = import.meta.env.VITE_BACKEND;

export default function ProfileForm() {
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    pincode: "",
    image: "",
    role: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${link}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setProfile({
          name: response.data.name || "",
          surname: response.data.surname || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          pincode: response.data.pincode || "",
          image: response.data.image || "",
          role: response.data.role || ""
        });
        setSubmitted(true);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!profile.name || !profile.surname || !profile.phone || !profile.pincode) {
      setError("All fields except email are required.");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(profile.phone)) {
      setError("Invalid phone number. Please enter a 10-digit number.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const { email, role, ...profileData } = profile;
      
      const response = await axios.put(`${link}/api/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setProfile({
        ...response.data,
        role: profile.role
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to save profile:", error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to save profile. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-blue-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 pb-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="bg-blue-600 text-white p-4 text-center">
            <h2 className="text-2xl font-bold">
              {profile.role === 'farmer' ? 'Farmer' : 'Buyer'} Profile
            </h2>
          </div>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <h2 className="text-3xl font-bold text-center text-blue-600">
                {profile.name ? "Update Profile" : "Create Profile"}
              </h2>

              {error && <p className="text-red-500 text-center p-2 bg-red-50 rounded">{error}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="First Name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    value={profile.surname}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={profile.email}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={profile.pincode}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300">
                  <Camera className="w-6 h-6" />
                  <span className="mt-2 text-base leading-normal">
                    {profile.image ? "Change Image" : "Upload Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {profile.image && (
                  <div className="mt-4">
                    <img 
                      src={profile.image} 
                      alt="Preview" 
                      className="w-24 h-24 rounded-full object-cover border-2 border-blue-300"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                {profile.name ? "Update Profile" : "Create Profile"}
              </button>
            </form>
          ) : (
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  {profile.role === 'farmer' ? 'Farmer' : 'Buyer'}
                </div>
              </div>
              
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-32 h-32 mx-auto rounded-full mt-6 border-4 border-blue-500 object-cover"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 mx-auto flex items-center justify-center">
                  <Camera className="text-gray-400 w-12 h-12" />
                </div>
              )}

              <div className="mt-6 space-y-2 text-lg">
                <p className="text-2xl font-semibold">
                  {profile.name} {profile.surname}
                </p>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-gray-600">{profile.phone}</p>
                <p className="text-gray-600">Pincode: {profile.pincode}</p>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-all duration-300"
              >
                Update Profile
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}