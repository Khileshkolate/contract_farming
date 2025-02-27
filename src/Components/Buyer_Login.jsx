import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, ShoppingCart, Mail, Lock, User } from "lucide-react";

const Buyer_Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", fName: "", lName: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isSignUp ? "http://localhost:5000/api/signup" : "http://localhost:5000/api/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      localStorage.setItem("buyerToken", data.token);
      navigate("/buyer-dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-800 to-green-500 text-white">
      {/* Left Side: Branding */}
      <div className="w-1/2 h-screen flex flex-col justify-center items-center text-center px-10">
        <div className="animate-bounce">
          <ShoppingCart className="w-16 h-16 text-green-300" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg mt-4">Buyer Connect</h1>
        <p className="text-lg italic text-teal-100 mt-2">Connecting Buyers to Farmers</p>
      </div>

      {/* Right Side: Login/Signup */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white text-gray-800 rounded-3xl shadow-2xl w-96 p-8 border-t-4 border-green-600">
          <h1 className="text-3xl font-bold text-green-800 mb-4 text-center flex items-center justify-center gap-2">
            {isSignUp ? <UserPlus className="w-6 h-6" /> : <LogIn className="w-6 h-6" />} {isSignUp ? "Register" : "Sign In"}
          </h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div className="mb-4 relative">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input type="text" name="fName" placeholder="First Name" required className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange} />
                </div>
                <div className="mb-4 relative">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input type="text" name="lName" placeholder="Last Name" required className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange} />
                </div>
              </>
            )}
            <div className="mb-4 relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input type="email" name="email" placeholder="Email" required className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange} />
            </div>
            <div className="mb-6 relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input type="password" name="password" placeholder="Password" required className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange} />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-full text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-green-700">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-700">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button className="text-green-600 font-semibold ml-1 hover:underline" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyer_Login;
