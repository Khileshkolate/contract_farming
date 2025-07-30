// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { LogIn, UserPlus, ShoppingCart, Mail, Lock, User } from "lucide-react";

// const link = import.meta.env.VITE_BACKEND;

// const Buyer_Login = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "", fName: "", lName: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const endpoint = isSignUp ? `${link}/api/signup` : `${link}/api/login`;

//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Something went wrong");

//       localStorage.setItem("buyerToken", data.token);
//       navigate("/BuyerDashboard");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     // Main container with a soft, modern blue-green gradient background
//     // and responsive padding for all screen sizes. Uses a cleaner font.
//     <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 text-gray-800 p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans">
//       {/* Dynamic and subtle background elements for visual depth */}
//       <div className="absolute inset-0 z-0 opacity-40">
//         {/* Abstract geometric pattern for a modern feel */}
//         <div className="w-full h-full bg-[url('https://placehold.co/1920x1080/F0F8FF/ffffff?text=ABSTRACT+WAVE+PATTERN')] bg-repeat opacity-50 animate-bg-pulse"></div>
//         {/* Subtle animated shapes for fluid motion */}
//         <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-shape-1"></div>
//         <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-shape-2"></div>
//         <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-shape-3"></div>
//       </div>

//       {/* Left Side: Branding Section - Enhanced design */}
//       <div className="w-full lg:w-1/2 h-auto lg:h-screen flex flex-col justify-center items-center text-center px-6 sm:px-10 py-10 lg:py-0 relative z-10 animate-fade-in-left
//                   bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-lg lg:rounded-r-none lg:rounded-l-3xl shadow-lg lg:shadow-none">
//         <div className="animate-cart-bounce"> {/* New animation for cart */}
//           <ShoppingCart className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600 drop-shadow-lg" />
//         </div>
//         <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg mt-4 text-blue-700 leading-tight">
//           Buyer <span className="text-teal-600">Connect</span>
//         </h1>
//         <p className="text-md sm:text-lg md:text-xl italic text-gray-600 mt-2 max-w-sm">
//           Your direct link to fresh produce and local farmers.
//         </p>
//         {/* Decorative lines */}
//         <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-blue-400 rounded-full opacity-50 animate-line-grow"></div>
//         {/* Removed the pulsing dot element */}
//       </div>

//       {/* Right Side: Login/Signup Form Section - Responsive layout for smaller screens */}
//       <div className="w-full lg:w-1/2 flex justify-center items-center relative z-10 py-10 lg:py-0 animate-fade-in-right">
//         <div className={`bg-white bg-opacity-95 text-gray-800 rounded-3xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10 transition-all duration-700 transform hover:scale-[1.01]
//           ${isSignUp ? 'border-t-8 border-teal-500 shadow-teal-300/50' : 'border-t-8 border-blue-500 shadow-blue-300/50'}`}>
//           <h1 className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 text-center flex items-center justify-center gap-2 sm:gap-3
//             ${isSignUp ? 'text-teal-700' : 'text-blue-700'}">
//             {isSignUp ? <UserPlus className="w-7 h-7 sm:w-8 sm:h-8" /> : <LogIn className="w-7 h-7 sm:w-8 sm:h-8" />}
//             {isSignUp ? "Create Buyer Account" : "Buyer Sign In"}
//           </h1>

//           {error && (
//             <p className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg relative mb-3 sm:mb-4 text-center text-sm sm:text-base font-medium animate-shake">
//               {error}
//             </p>
//           )}

//           <form onSubmit={handleSubmit}>
//             {isSignUp && (
//               <>
//                 <div className="mb-4 sm:mb-5 relative group">
//                   <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors duration-300" />
//                   <input
//                     type="text"
//                     name="fName"
//                     placeholder="First Name"
//                     required
//                     className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
//                     onChange={handleChange}
//                     value={formData.fName}
//                   />
//                 </div>
//                 <div className="mb-4 sm:mb-5 relative group">
//                   <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors duration-300" />
//                   <input
//                     type="text"
//                     name="lName"
//                     placeholder="Last Name"
//                     required
//                     className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
//                     onChange={handleChange}
//                     value={formData.lName}
//                   />
//                 </div>
//               </>
//             )}
//             <div className="mb-4 sm:mb-5 relative group">
//               <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 required
//                 className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
//                 onChange={handleChange}
//                 value={formData.email}
//               />
//             </div>
//             <div className="mb-6 sm:mb-7 relative group">
//               <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 required
//                 className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
//                 onChange={handleChange}
//                 value={formData.password}
//               />
//             </div>
//             <button
//               type="submit"
//               className={`w-full py-3 rounded-full text-lg sm:text-xl font-bold tracking-wide shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 active:shadow-sm
//                 ${isSignUp ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 border-b-4 border-teal-700' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 border-b-4 border-blue-700'}`}
//             >
//               {isSignUp ? "Register Account" : "Sign In"}
//             </button>
//           </form>

//           <div className="mt-5 sm:mt-6 text-center">
//             <p className="text-gray-700 text-base sm:text-lg">
//               {isSignUp ? "Already have an account?" : "New to Buyer Connect?"}
//               <button
//                 className={`font-bold ml-2 hover:underline transition-colors duration-200
//                   ${isSignUp ? 'text-teal-600 hover:text-teal-800' : 'text-blue-600 hover:text-blue-800'}`}
//                 onClick={() => {
//                   setIsSignUp(!isSignUp);
//                   setError("");
//                   setFormData({ email: "", password: "", fName: "", lName: "" });
//                 }}
//               >
//                 {isSignUp ? "Sign In Here" : "Register Now"}
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');
//         body {
//           font-family: 'Inter', sans-serif;
//         }

//         @keyframes fadeInDown {
//           from { opacity: 0; transform: translateY(-50px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(50px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes floatSubtle {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-5px); }
//         }

//         @keyframes bgPulse {
//           0%, 100% { opacity: 0.5; }
//           50% { opacity: 0.6; }
//         }

//         @keyframes shape-1 {
//           0% { transform: translate(0, 0) scale(1) rotate(0deg); }
//           33% { transform: translate(40px, -60px) scale(1.1) rotate(20deg); }
//           66% { transform: translate(-30px, 30px) scale(0.9) rotate(-10deg); }
//           100% { transform: translate(0, 0) scale(1) rotate(0deg); }
//         }

//         @keyframes shape-2 {
//           0% { transform: translate(0, 0) scale(1) rotate(0deg); }
//           40% { transform: translate(-50px, 40px) scale(1.2) rotate(-15deg); }
//           75% { transform: translate(30px, -20px) scale(0.95) rotate(5deg); }
//           100% { transform: translate(0, 0) scale(1) rotate(0deg); }
//         }

//         @keyframes shape-3 {
//           0% { transform: translate(0, 0) scale(1) rotate(0deg); }
//           50% { transform: translate(60px, 50px) scale(1.05) rotate(25deg); }
//           100% { transform: translate(0, 0) scale(1) rotate(0deg); }
//         }

//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
//           20%, 40%, 60%, 80% { transform: translateX(5px); }
//         }

//         @keyframes fadeInLeft {
//           from { opacity: 0; transform: translateX(-50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }

//         @keyframes fadeInRight {
//           from { opacity: 0; transform: translateX(50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }

//         @keyframes cartBounce {
//           0%, 100% { transform: translateY(0); }
//           25% { transform: translateY(-8px); }
//           50% { transform: translateY(0); }
//           75% { transform: translateY(-4px); }
//         }

//         @keyframes lineGrow {
//           0% { width: 0%; }
//           100% { width: 75%; }
//         }

//         /* Removed dotPulse keyframes as it's no longer used */

//         .animate-fade-in-down { animation: fadeInDown 1s ease-out forwards; }
//         .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; animation-delay: 0.2s; }
//         .animate-float-subtle { animation: floatSubtle 3s infinite ease-in-out; }
//         .animate-bg-pulse { animation: bgPulse 20s linear infinite alternate; }
//         .animate-shape-1 { animation: shape-1 15s infinite alternate ease-in-out; }
//         .animate-shape-2 { animation: shape-2 18s infinite alternate-reverse ease-in-out; }
//         .animate-shape-3 { animation: shape-3 12s infinite alternate ease-in-out; }
//         .animate-shake { animation: shake 0.5s ease-in-out; }
//         .animate-fade-in-left { animation: fadeInLeft 1s ease-out forwards; }
//         .animate-fade-in-right { animation: fadeInRight 1s ease-out forwards; animation-delay: 0.3s; }
//         .animate-cart-bounce { animation: cartBounce 2s infinite ease-in-out; }
//         .animate-line-grow { animation: lineGrow 1.5s ease-out forwards; }

//         .shadow-xl {
//             box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Buyer_Login;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, ShoppingCart, Mail, Lock, User, CheckCircle } from "lucide-react";

const link = import.meta.env.VITE_BACKEND;

const Buyer_Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  // const [formData, setFormData] = useState({ email: "", password: "", fName: "", lName: "" });

  const [formData, setFormData] = useState({ 
    email: "", 
    password: "", 
    fName: "", 
    lName: "",
    role: "buyer" // Default role for buyer portal
  });

  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   const endpoint = isSignUp ? `${link}/api/signup` : `${link}/api/login`;

  //   try {
  //     const response = await fetch(endpoint, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isSignUp ? `${link}/api/signup` : `${link}/api/login`;
    
    // Add role to payload
    const payload = { ...formData };
    if (isSignUp) {
      payload.role = "buyer";
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      if (isSignUp) {
        // Show success message for signup
        setSignupSuccess(true);
        setFormData({ email: "", password: "", fName: "", lName: "" });
      } else {
        // Login and navigate to dashboard
        localStorage.setItem("buyerToken", data.token);
        navigate("/BuyerDashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 text-gray-800 p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="w-full h-full bg-[url('https://placehold.co/1920x1080/F0F8FF/ffffff?text=ABSTRACT+WAVE+PATTERN')] bg-repeat opacity-50 animate-bg-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-shape-1"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-shape-2"></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-shape-3"></div>
      </div>

      {/* Left Side: Branding Section */}
      <div className="w-full lg:w-1/2 h-auto lg:h-screen flex flex-col justify-center items-center text-center px-6 sm:px-10 py-10 lg:py-0 relative z-10 animate-fade-in-left
                  bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-lg lg:rounded-r-none lg:rounded-l-3xl shadow-lg lg:shadow-none">
        <div className="animate-cart-bounce">
          <ShoppingCart className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600 drop-shadow-lg" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg mt-4 text-blue-700 leading-tight">
          Buyer <span className="text-teal-600">Connect</span>
        </h1>
        <p className="text-md sm:text-lg md:text-xl italic text-gray-600 mt-2 max-w-sm">
          Your direct link to fresh produce and local farmers.
        </p>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-blue-400 rounded-full opacity-50 animate-line-grow"></div>
      </div>

      {/* Right Side: Login/Signup Form Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative z-10 py-10 lg:py-0 animate-fade-in-right">
        <div className={`bg-white bg-opacity-95 text-gray-800 rounded-3xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10 transition-all duration-700 transform hover:scale-[1.01]
          ${isSignUp ? 'border-t-8 border-teal-500 shadow-teal-300/50' : 'border-t-8 border-blue-500 shadow-blue-300/50'}`}>
          
          {/* Success Message Display */}
          {signupSuccess ? (
            <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-teal-500 animate-check-bounce" />
              </div>
              <h1 className="text-3xl font-bold text-teal-700 mb-3">Registration Successful!</h1>
              <p className="text-lg text-gray-700 mb-6">
                Your account has been created. You can now sign in to access your dashboard.
              </p>
              <button
                onClick={() => {
                  setIsSignUp(false);
                  setSignupSuccess(false);
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-bold tracking-wide shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Go to Sign In
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-6 text-center flex items-center justify-center gap-2 sm:gap-3
                ${isSignUp ? 'text-teal-700' : 'text-blue-700'}">
                {isSignUp ? <UserPlus className="w-7 h-7 sm:w-8 sm:h-8" /> : <LogIn className="w-7 h-7 sm:w-8 sm:h-8" />}
                {isSignUp ? "Create Buyer Account" : "Buyer Sign In"}
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
                      <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors duration-300" />
                      <input
                        type="text"
                        name="fName"
                        placeholder="First Name"
                        required
                        className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
                        onChange={handleChange}
                        value={formData.fName}
                      />
                    </div>
                    <div className="mb-4 sm:mb-5 relative group">
                      <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors duration-300" />
                      <input
                        type="text"
                        name="lName"
                        placeholder="Last Name"
                        required
                        className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
                        onChange={handleChange}
                        value={formData.lName}
                      />
                    </div>
                  </>
                )}
                <div className="mb-4 sm:mb-5 relative group">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                <div className="mb-6 sm:mb-7 relative group">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full p-3 pl-10 sm:p-4 sm:pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition duration-300 text-base sm:text-lg placeholder-gray-500"
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 rounded-full text-lg sm:text-xl font-bold tracking-wide shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 active:shadow-sm
                    ${isSignUp ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 border-b-4 border-teal-700' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 border-b-4 border-blue-700'}`}
                >
                  {isSignUp ? "Register Account" : "Sign In"}
                </button>
              </form>

              <div className="mt-5 sm:mt-6 text-center">
                <p className="text-gray-700 text-base sm:text-lg">
                  {isSignUp ? "Already have an account?" : "New to Buyer Connect?"}
                  <button
                    className={`font-bold ml-2 hover:underline transition-colors duration-200
                      ${isSignUp ? 'text-teal-600 hover:text-teal-800' : 'text-blue-600 hover:text-blue-800'}`}
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setError("");
                      setFormData({ email: "", password: "", fName: "", lName: "" });
                      setSignupSuccess(false);
                    }}
                  >
                    {isSignUp ? "Sign In Here" : "Register Now"}
                  </button>
                </p>
              </div>
            </>
          )}
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

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes cartBounce {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-8px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(-4px); }
        }

        @keyframes lineGrow {
          0% { width: 0%; }
          100% { width: 75%; }
        }

        @keyframes checkBounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }

        .animate-fade-in-down { animation: fadeInDown 1s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; animation-delay: 0.2s; }
        .animate-float-subtle { animation: floatSubtle 3s infinite ease-in-out; }
        .animate-bg-pulse { animation: bgPulse 20s linear infinite alternate; }
        .animate-shape-1 { animation: shape-1 15s infinite alternate ease-in-out; }
        .animate-shape-2 { animation: shape-2 18s infinite alternate-reverse ease-in-out; }
        .animate-shape-3 { animation: shape-3 12s infinite alternate ease-in-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-fade-in-left { animation: fadeInLeft 1s ease-out forwards; }
        .animate-fade-in-right { animation: fadeInRight 1s ease-out forwards; animation-delay: 0.3s; }
        .animate-cart-bounce { animation: cartBounce 2s infinite ease-in-out; }
        .animate-line-grow { animation: lineGrow 1.5s ease-out forwards; }
        .animate-check-bounce { animation: checkBounce 1s ease; }

        .shadow-xl {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </div>
  );
};

export default Buyer_Login;