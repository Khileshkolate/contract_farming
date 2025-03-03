import { Facebook, Twitter, Instagram, Linkedin, Reddit, Send, Whatsapp, Telegram } from "lucide-react";

export default function Share_Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Share this Page</h2>
        <p className="text-gray-600 mb-6">Spread the word with your friends!</p>

        <div className="grid grid-cols-4 gap-4">
          <a href="#" className="bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="bg-blue-400 text-white p-3 rounded-lg flex items-center justify-center hover:bg-blue-500 transition">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="bg-pink-500 text-white p-3 rounded-lg flex items-center justify-center hover:bg-pink-600 transition">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="bg-green-500 text-white p-3 rounded-lg flex items-center justify-center hover:bg-green-600 transition">
            <Whatsapp className="w-6 h-6" />
          </a>
          <a href="#" className="bg-blue-800 text-white p-3 rounded-lg flex items-center justify-center hover:bg-blue-900 transition">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="bg-orange-600 text-white p-3 rounded-lg flex items-center justify-center hover:bg-orange-700 transition">
            <Reddit className="w-6 h-6" />
          </a>
          <a href="#" className="bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
            <Telegram className="w-6 h-6" />
          </a>
          <a href="#" className="bg-gray-700 text-white p-3 rounded-lg flex items-center justify-center hover:bg-gray-800 transition">
            <Send className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
