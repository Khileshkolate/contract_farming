import React from "react";
import { Users, Leaf, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-green-50 py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-green-800 text-center mb-8">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About Us Info */}
        <div className="bg-green-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Who We Are</h2>
          <p className="text-gray-700 mb-4">
            <strong>Digital Krishii</strong> is a leading digital platform that bridges the gap between farmers and buyers, promoting transparency, fair trade, and efficient farming practices. Our mission is to empower farmers by offering tools for contract farming, land leasing, and product sales.
          </p>
          <p className="text-gray-700">
            We believe in creating a sustainable farming ecosystem that benefits both producers and consumers while promoting eco-friendly agricultural practices.
          </p>
        </div>

        {/* Highlights Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Why Choose Us?</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="text-green-600" />
              <span className="font-medium">Empowering 10,000+ Farmers Nationwide</span>
            </div>
            <div className="flex items-center gap-3">
              <Leaf className="text-green-600" />
              <span className="font-medium">Promoting Eco-Friendly Farming</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="text-green-600" />
              <span className="font-medium">Connecting Farmers to Global Markets</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
