// File: src/components/Footer.jsx
import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-emerald-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-yellow-400 p-2 rounded-full mr-2">
                <div className="bg-green-800 p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold">Digital Krishii</h2>
            </div>
            <p className="text-green-200 mb-4">
              Empowering farmers through technology and fair contracts for a sustainable agricultural future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white transition"><FaFacebook /></a>
              <a href="#" className="text-green-200 hover:text-white transition"><FaTwitter /></a>
              <a href="#" className="text-green-200 hover:text-white transition"><FaInstagram /></a>
              <a href="#" className="text-green-200 hover:text-white transition"><FaLinkedin /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-200 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">Services</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">Contract Farming</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-200 hover:text-white transition">Contract Farming</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">Land Leasing</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">Equipment Rental</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">Market Prices</a></li>
              <li><a href="#" className="text-green-200 hover:text-white transition">Farmer Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-green-300 mt-1 mr-3" />
                <span className="text-green-200">123 Farm Road, Agricultural Zone, Pune, Maharashtra</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-green-300 mr-3" />
                <span className="text-green-200">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-green-300 mr-3" />
                <span className="text-green-200">support@digitalkrishii.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-300">
          <p>© {new Date().getFullYear()} Digital Krishii. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;