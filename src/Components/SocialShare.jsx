import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaSnapchat, FaTwitter, FaFacebook } from 'react-icons/fa';
import { GiCorn, GiFarmer, GiWheat } from 'react-icons/gi';

export default function SocialShare() {
  const getShareUrl = () => typeof window !== 'undefined' ? window.location.href : '';

  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=🌱 Join%20our%20farming%20community:%20${encodeURIComponent(getShareUrl())}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent("Cultivating success together! 🌾")}`,
    instagram: 'https://instagram.com/farm-connect',
    snapchat: 'https://www.snapchat.com/add/farm-connect'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const iconVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300 }
    },
    hover: {
      y: -15,
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: { type: 'spring', stiffness: 400 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-20 px-4"
    >
      <div className="max-w-4xl mx-auto relative">
        {/* Animated Farm Scene Background */}
        <div className="absolute inset-0 flex justify-between items-end opacity-10">
          <GiCorn className="w-32 h-32 text-green-300 animate-float" />
          <GiWheat className="w-32 h-32 text-amber-300 animate-float-delayed" />
          <GiFarmer className="w-32 h-32 text-brown-300 animate-float" />
        </div>

        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-green-200/50 p-12 relative"
          whileHover={{ scale: 1.02 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-700 to-amber-700 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="block mb-4">🌾 Grow Together</span>
            <span className="text-2xl font-normal text-green-600">Share Farming Opportunities</span>
          </motion.h1>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { icon: FaWhatsapp, color: 'bg-gradient-to-br from-green-500 to-green-700', label: 'WhatsApp' },
              { icon: FaInstagram, color: 'bg-gradient-to-br from-rose-500 to-rose-700', label: 'Instagram' },
              { icon: FaSnapchat, color: 'bg-gradient-to-br from-yellow-400 to-yellow-600', label: 'Snapchat' },
              { icon: FaTwitter, color: 'bg-gradient-to-br from-sky-400 to-sky-600', label: 'Twitter' },
              { icon: FaFacebook, color: 'bg-gradient-to-br from-blue-600 to-blue-800', label: 'Facebook' },
            ].map((social, index) => (
              <motion.div
                key={index}
                variants={iconVariants}
                whileHover="hover"
                className="group relative flex flex-col items-center"
              >
                <a
                  href={shareUrls[social.label.toLowerCase()]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:shadow-xl transition-all`}
                >
                  <social.icon className="w-12 h-12 text-white transform transition-transform hover:scale-110" />
                </a>
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-green-800 font-semibold text-sm transition-opacity px-3 py-2 bg-white/90 rounded-lg shadow-sm">
                  {social.label}
                  <div className="absolute -bottom-2 left-1/2 w-3 h-3 bg-white/90 transform -translate-x-1/2 rotate-45" />
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-green-700 text-lg mb-4">
              "Together we cultivate success! 🌱 Share with fellow farmers"
            </p>
            <div className="animate-pulse">
              <GiFarmer className="w-16 h-16 text-brown-600 mx-auto" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out 1.5s infinite;
        }
      `}</style>
    </motion.div>
  );
}