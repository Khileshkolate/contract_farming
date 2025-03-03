import { useState, useEffect } from "react";
import axios from "axios";
import { User, Mail, Phone, MapPin, Camera, Home, Settings, LogOut } from "lucide-react"; // Icons for the form and navigation
import { Link } from "react-router-dom"; // For navigation

export default function ProfileForm() {
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    pincode: "",
    image: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile");
        if (response.data) {
          setProfile(response.data);
          setSubmitted(true);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Validate required fields
    if (!profile.name || !profile.surname || !profile.email || !profile.phone || !profile.pincode) {
      setError("All fields are required.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      setError("Invalid email address.");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
    if (!phoneRegex.test(profile.phone)) {
      setError("Invalid phone number. Please enter a 10-digit number.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/profile", profile);
      if (response.data) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
      if (error.response) {
        setError(`Failed to save profile: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        setError("Failed to save profile: No response from server.");
      } else {
        setError("Failed to save profile: Request setup error.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
                <Home className="w-8 h-8 mr-2" />
                Digital Krishii
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/settings" className="text-gray-700 hover:text-blue-600 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                Settings
              </Link>
              <button className="text-gray-700 hover:text-blue-600 flex items-center">
                <LogOut className="w-6 h-6 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Form */}
      <div className="flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white shadow-2xl rounded-xl overflow-hidden">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <h2 className="text-4xl font-bold text-center text-blue-600">Create Profile</h2>

              {/* Error Message */}
              {error && <p className="text-red-500 text-center">{error}</p>}

              {/* Name Field */}
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

              {/* Surname Field */}
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

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Phone Field */}
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

              {/* Pincode Field */}
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

              {/* Image Upload */}
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center px-4 py-6 bg-white text-black-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300">
                  <Camera className="w-6 h-6" />
                  <span className="mt-2 text-base leading-normal">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="p-8 text-center">
              <h2 className="text-4xl font-bold text-blue-600">Profile</h2>

              {/* Profile Image */}
              {profile.image && (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-32 h-32 mx-auto rounded-full mt-6 border-4 border-black-500"
                />
              )}

              {/* Profile Details */}
              <div className="mt-6 space-y-2">
                <p className="text-2xl font-semibold">
                  {profile.name} {profile.surname}
                </p>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-gray-600">{profile.phone}</p>
                <p className="text-gray-600">Pincode: {profile.pincode}</p>
              </div>

              {/* Update Profile Button */}
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-all duration-300"
              >
                Update Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}