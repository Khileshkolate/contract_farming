import { useState } from 'react';
import { FaLeaf, FaTractor, FaArrowLeft, FaArrowRight, FaQuoteLeft, FaChevronDown } from 'react-icons/fa';
import { GiCorn, GiFarmer } from 'react-icons/gi';

const AboutUs = () => {
  const [activeCeoIndex, setActiveCeoIndex] = useState(0);
  const [expandedStoryIndex, setExpandedStoryIndex] = useState(null);

  const ceos = [
    { name: "Khilesh Kolate", role: "Founder & CEO", exp: "25+ years in agricultural management", desc: "Pioneered contract farming solutions in India since 2000", photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHNob3R8ZW58MHx8MHx8fDA%3D" },
    { name: "Priya Sharma", role: "Co-Founder & CEO", exp: "15+ years in sustainable farming practices", desc: "Championing women empowerment in agriculture", photo: "/images/ceo2.jpg" },
    { name: "Ajay Gupta", role: "CFO & CEO", exp: "10+ years in finance for agriculture", desc: "Building financial stability for farmers", photo: "/images/ceo3.jpg" },
    { name: "Ananya Verma", role: "CTO & CEO", exp: "12+ years in tech-driven farming solutions", desc: "Revolutionizing farming with technology", photo: "/images/ceo4.jpg" },
    { name: "Vikram Yadav", role: "COO & CEO", exp: "18+ years in operations and supply chain", desc: "Streamlining farm-to-market processes", photo: "/images/ceo5.jpg" },
    { name: "Karan Mehra", role: "VP & CEO", exp: "20+ years in agribusiness management", desc: "Fostering collaborations for farm sustainability", photo: "/images/ceo6.jpg" }
  ];

  const farmerTestimonials = [
    { name: "Suresh Kumar", location: "Punjab", quote: "Increased my yield by 40% with proper guidance", photo: "src/Images/farmer2.jpeg", details: "Suresh now uses precision farming techniques which helped him to manage his crops better, leading to a higher yield and reduced cost." },
    { name: "Radha Devi", location: "Uttar Pradesh", quote: "The organic farming methods have helped me reduce costs", photo: "src/Images/farmer1.jpeg", details: "Radha has switched to organic farming and reduced input costs significantly while increasing her income." },
    { name: "Manoj Singh", location: "Haryana", quote: "The technology-based solutions have made a big difference", photo: "src/Images/farmer3.jpeg", details: "Manoj implemented IoT-based crop management tools to monitor and optimize irrigation and pesticide use." }
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white">
      {/* Enhanced Hero Section with Logo Canvas */}
      <section className="relative text-center py-24 bg-gradient-to-br from-green-900 to-emerald-800 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-16 animate-fade-in">
            <img 
              src="src/Images/logo canvas.jpg" 
              alt="Digital Krishilii Logo" 
              className="mx-auto w-full max-w-4xl rounded-2xl shadow-2xl border-4 border-white/20"
            />
          </div>
          
          <div className="space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
            <h1 className="text-5xl md:text-7xl font-bold font-montserrat text-shadow-lg">
              <span className="text-emerald-300">Digital</span>{" "}
              <span className="text-white">Krishiii</span>
            </h1>
            <p className="text-2xl md:text-3xl text-emerald-100 font-light">
              Connecting Farmers & Buyers Through Technology
            </p>
          </div>
        </div>
      </section>

      {/* Contract Farming Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-green-50">
            <div className="inline-block p-4 bg-green-100 rounded-xl">
              <FaLeaf className="text-4xl text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900">
              Contract Farming Solutions
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800">Digital Land Rating System</h3>
                  <p className="text-gray-600 mt-2">Advanced soil analysis and land evaluation for optimal crop planning</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800">Farmer-Buyer Network</h3>
                  <p className="text-gray-600 mt-2">Direct connectivity between agricultural producers and institutional buyers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://plus.unsplash.com/premium_photo-1682092699213-6b0b5cdcadef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFybWluZyUyMGNvbXBhbnklMjBwaWN0dXJlcyUyMGluJTIwY29tcGFueSUyMHdpdGglMjBlbXBvbHllZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Contract Farming"
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 flex items-end p-8">
              <div className="text-center w-full">
                <h3 className="text-white text-2xl font-bold mb-2">25,000+ Hectares Under Management</h3>
                <p className="text-emerald-200">Across 8 Agricultural Zones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Krishilii Services */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Our Digital Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Integrating traditional farming with modern digital solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaTractor,
                title: "Smart Contract Farming",
                description: "Automated agreements with built-in quality assurance and payment systems"
              },
              {
                icon: GiCorn,
                title: "Crop Analytics",
                description: "AI-powered crop monitoring and yield prediction systems"
              },
              {
                icon: GiFarmer,
                title: "Farmer Education",
                description: "Digital training modules on sustainable farming practices"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="inline-block p-4 bg-green-100 rounded-xl mb-6">
                  <service.icon className="text-4xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 {/* Farming Ecosystem Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
            <img
              src="https://plus.unsplash.com/premium_photo-1682092792260-1b7cd1674a74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhcm1pbmclMjBjb21wYW55JTIwcGljdHVyZXMlMjBpbiUyMGNvbXBhbnklMjB3aXRoJTIwZW1wb2x5ZWV8ZW58MHx8MHx8fDA%3D"
              alt="Happy Farmers"
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-transparent to-transparent flex items-end p-8">
              <div className="text-center w-full">
                <h3 className="text-white text-3xl font-bold mb-2">5000+ Empowered Farmers</h3>
                <p className="text-green-200 text-lg">Across 12 Indian States</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-8">Our Farming Ecosystem</h2>
            <div className="grid grid-cols-2 gap-6">
              {[ 
                { icon: FaTractor, title: "Modern Equipment", value: "85% Adoption" },
                { icon: GiCorn, title: "Crop Varieties", value: "30+ Types" },
                { icon: FaLeaf, title: "Contract Farming", value: "40% Land" },
                { icon: GiFarmer, title: "Trained Farmers", value: "10K+" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-green-50 hover:shadow-xl transition-all">
                  <stat.icon className="text-4xl text-green-600 mb-4" />
                  <h3 className="text-2xl font-bold text-green-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600">{stat.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keep existing Vision & Mission, Leadership, and Farmer Stories sections */}
{/* Leadership Section */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-green-900">
            Meet Our Leadership
          </h2>
          <div className="flex items-center justify-center gap-8">
            <button onClick={() => setActiveCeoIndex((prev) => (prev === 0 ? ceos.length-1 : prev-1))} className="p-4 text-green-700 hover:text-green-900 transition-colors">
              <FaArrowLeft className="text-3xl" />
            </button>

            <div className="flex-1 max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="h-96 bg-green-100 relative overflow-hidden">
                  <img src={ceos[activeCeoIndex].photo} alt={ceos[activeCeoIndex].name} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="text-green-600 font-medium">{ceos[activeCeoIndex].role}</span>
                    <h3 className="text-3xl font-bold text-green-900 mt-2">{ceos[activeCeoIndex].name}</h3>
                  </div>
                  <p className="text-gray-600 text-lg mb-4">{ceos[activeCeoIndex].desc}</p>
                  <div className="mt-auto">
                    <p className="text-sm text-green-700 font-medium">{ceos[activeCeoIndex].exp}</p>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => setActiveCeoIndex((prev) => (prev === ceos.length-1 ? 0 : prev+1))} className="p-4 text-green-700 hover:text-green-900 transition-colors">
              <FaArrowRight className="text-3xl" />
            </button>
          </div>
        </div>
      </section>
<section className="py-20 max-w-7xl mx-auto px-4">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-green-900">
    Voices from the Fields
  </h2>

  <div className="space-y-16">
    {farmerTestimonials.map((farmer, index) => (
      <div
        key={index}
        className={`bg-white rounded-xl shadow-xl overflow-hidden p-6 flex flex-col md:flex-row justify-between items-center transition-all transform hover:scale-105 hover:shadow-2xl ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      >
        {/* Farmer Image Section */}
        <div className="md:w-1/3 relative flex justify-center items-center mb-6 md:mb-0">
          <img
            src={farmer.photo}
            alt={farmer.name}
            className="w-36 h-36 object-cover rounded-full border-4 border-green-600 shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Farmer Testimonial Section */}
        <div className="md:w-2/3 p-6 flex flex-col justify-between text-center md:text-left">
          <h3 className="text-xl font-bold text-green-900">{farmer.name}</h3>
          <p className="text-green-600 text-sm">{farmer.location}</p>
          <FaQuoteLeft className="text-2xl text-green-500 mt-2" />
          <p className="text-lg text-gray-700 mt-2 italic">"{farmer.quote}"</p>

          {/* Expandable Story */}
          <button
            onClick={() => setExpandedStoryIndex(expandedStoryIndex === index ? null : index)}
            className="text-sm text-green-700 font-medium mt-4 flex items-center justify-center md:justify-start"
          >
            <FaChevronDown className="mr-2" />
            {expandedStoryIndex === index ? "Show Less" : "Show More"}
          </button>
          {expandedStoryIndex === index && <p className="mt-4 text-gray-600">{farmer.details}</p>}
        </div>
      </div>
    ))}
  </div>
</section>



    </div>
  );
};

export default AboutUs;