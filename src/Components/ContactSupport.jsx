import { useState } from "react";
import { Mail, Phone, MapPin, Send, User } from "lucide-react";

export default function ContactSupport() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-green-600 text-white p-8">
            <h2 className="text-3xl font-bold mb-6">Contact Support</h2>
            <p className="text-lg mb-6">Have questions or need assistance? Reach out to us! We're here to help.</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-4" />
                <span>Khileshkolate2004@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-4" />
                <span>+91 7757854124</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-4" />
                <span>SISTec College Gandhi nager Bhopal</span>
              </div>
            </div>
          </div>
          <div className="p-8">
            <h2 className="text-3xl font-bold text-green-600 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" required />
                <User className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="relative">
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" required />
                <Mail className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="relative">
                <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" rows="5" required />
                <Send className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 flex items-center justify-center">
                <Send className="w-6 h-6 mr-2" /> Send Message
              </button>
            </form>
            {submitted && <p className="mt-4 text-green-600 text-center">Your message has been sent successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
