import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Leaf, Mail, Lock, User } from "lucide-react";

const link = "https://contract-farming.onrender.com";

const Farmer_Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", fName: "", lName: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isSignUp ? `${link}/api/signup` : `${link}/api/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      localStorage.setItem("token", data.token);
      navigate("/FarmerDashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200 text-gray-800 p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="w-full h-full bg-[url('https://placehold.co/1920x1080/F0F8FF/ffffff?text=SUBTLE+WAVE+PATTERN')] bg-repeat opacity-50 animate-bg-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-shape-1"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-shape-2"></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-shape-3"></div>
      </div>

      <header className="relative w-full max-w-4xl bg-white bg-opacity-90 text-center py-6 sm:py-8 md:py-10 rounded-b-3xl shadow-lg border-b-4 border-indigo-300 z-10 animate-fade-in-down">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 animate-float-subtle">
          <Leaf className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-600 transform rotate-12" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-purple-700">Digital Krishii</h1>
        </div>
        <p className="text-md sm:text-lg md:text-xl italic text-gray-600 mt-2 sm:mt-3 font-medium">Empowering Farmers, Connecting Communities</p>
      </header>

      <div className={`bg-white bg-opacity-95 text-gray-800 rounded-3xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10 mt-10 sm:mt-12 md:mt-16 transition-all duration-700 transform hover:scale-[1.01] z-20 animate-fade-in-up
        ${isSignUp ? 'border-t-8 border-indigo-500 shadow-indigo-300/50' : 'border-t-8 border-purple-500 shadow-purple-300/50'}`}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 text-center flex items-center justify-center gap-2 sm:gap-3
          ${isSignUp ? 'text-indigo-700' : 'text-purple-700'}">
          {isSignUp ? <UserPlus className="w-7 h-7 sm:w-8 sm:h-8" /> : <LogIn className="w-7 h-7 sm:w-8 sm:h-8" />}
          {isSignUp ? "Register Your Account" : "Welcome Back!"}
        </h1>

        {error && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg relative mb-3 sm:mb-4 text-center text-sm sm:text-base font-medium animate-shake">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="mb-4 sm:mb-5 relative group">
                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                <input
                  type="text"
                  name="fName"
                  placeholder="First Name"
                  required
                  className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
                  onChange={handleChange}
                  value={formData.fName}
                />
              </div>
              <div className="mb-4 sm:mb-5 relative group">
                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                <input
                  type="text"
                  name="lName"
                  placeholder="Last Name"
                  required
                  className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
                  onChange={handleChange}
                  value={formData.lName}
                />
              </div>
            </>
          )}
          <div className="mb-4 sm:mb-5 relative group">
            <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors duration-300" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="mb-6 sm:mb-7 relative group">
            <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors duration-300" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-full text-lg sm:text-xl font-bold tracking-wide shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 active:shadow-sm
              ${isSignUp ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 border-b-4 border-indigo-700' : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 border-b-4 border-purple-700'}`}
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="mt-5 sm:mt-6 text-center">
          <p className="text-gray-700 text-base sm:text-lg">
            {isSignUp ? "Already have an account?" : "New to Digital Krishii?"}
            <button
              className={`font-bold ml-2 hover:underline transition-colors duration-200
                ${isSignUp ? 'text-indigo-600 hover:text-indigo-800' : 'text-purple-600 hover:text-purple-800'}`}
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setFormData({ email: "", password: "", fName: "", lName: "" });
              }}
            >
              {isSignUp ? "Sign In Here" : "Register Now"}
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes bgPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.6; }
        }

        @keyframes shape-1 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(40px, -60px) scale(1.1) rotate(20deg); }
          66% { transform: translate(-30px, 30px) scale(0.9) rotate(-10deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }

        @keyframes shape-2 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          40% { transform: translate(-50px, 40px) scale(1.2) rotate(-15deg); }
          75% { transform: translate(30px, -20px) scale(0.95) rotate(5deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }

        @keyframes shape-3 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(60px, 50px) scale(1.05) rotate(25deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .animate-fade-in-down { animation: fadeInDown 1s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; animation-delay: 0.2s; }
        .animate-float-subtle { animation: floatSubtle 3s infinite ease-in-out; }
        .animate-bg-pulse { animation: bgPulse 20s linear infinite alternate; }
        .animate-shape-1 { animation: shape-1 15s infinite alternate ease-in-out; }
        .animate-shape-2 { animation: shape-2 18s infinite alternate-reverse ease-in-out; }
        .animate-shape-3 { animation: shape-3 12s infinite alternate ease-in-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }

        .shadow-xl {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </div>
  );
};

export default Farmer_Login;
