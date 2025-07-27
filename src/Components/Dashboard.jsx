import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Tractor, Leaf, Home, Phone, Info, Search, MessageCircle, Send, X, ArrowRight, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import AutoScrollSection from './AutoScrollSection.jsx';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    i18n.changeLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { text: t('chat.response'), sender: "ai" }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-green-50 overflow-x-hidden">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="w-full px-4 py-3 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-3">
            <Tractor className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">{t('navbar.brandName')}</h1>
          </div>
          
          <nav className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
            <button onClick={() => navigate("/")} className="flex items-center gap-1 text-green-700 hover:text-green-900">
              <Home className="w-5 h-5" />{t('navbar.home')}
            </button>
            <button className="flex items-center gap-1 text-green-700 hover:text-green-900">
              <Leaf className="w-5 h-5" />{t('navbar.contractFarmer')}
            </button>
            <button onClick={() => navigate("/ContactUs")} className="flex items-center gap-1 text-green-700 hover:text-green-900">
              <Phone className="w-5 h-5" />{t('navbar.contact')}
            </button>
            <button onClick={() => navigate("/about")} className="flex items-center gap-1 text-green-700 hover:text-green-900">
              <Info className="w-5 h-5" />{t('navbar.about')}
            </button>
            
            <button onClick={() => navigate("/Farmer_Login")} className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700">
              {t('navbar.farmerLogin')}
            </button>
            <button onClick={() => navigate("/Buyer_Login")} className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700">
              {t('navbar.buyerLogin')}
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" />
              <input type="search" placeholder={t('navbar.search')} className="pl-10 pr-4 py-2 rounded-lg border border-green-300" />
            </div>

            <select 
              className="px-3 py-2 rounded-lg border border-green-300 bg-white text-green-800"
              value={i18n.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              {Object.entries(t('navbar.languages', { returnObjects: true })).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </nav>
        </div>
      </header>

      <section className="relative bg-[url('/farm-banner.jpg')] bg-cover bg-center h-96">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-xl">
              {t('main.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
              {t('main.subtitle')}
            </p>
            <button 
                onClick={() => navigate("/Farmer_Login")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 mx-auto transition-all transform hover:scale-105"
                >
               {t('main.cta')}
               <ArrowRight className="w-5 h-5" />
</button>
          </div>
        </div>
      </section>

      <div className="w-full max-w-full overflow-hidden">
        <AutoScrollSection title={t('sections.contracts')} data={farmerContracts} />
        <AutoScrollSection title={t('sections.lands')} data={landContracts} />
        <AutoScrollSection title={t('sections.rent')} data={landRent} />
        <AutoScrollSection title={t('sections.products')} data={products} />
      </div>

      <footer className="bg-gradient-to-b from-green-800 to-green-900 text-white mt-20 w-full">
        <div className="w-full px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Tractor className="w-8 h-8 text-green-300" />
              <h2 className="text-2xl font-bold">{t('navbar.brandName')}</h2>
            </div>
            <p className="text-green-200 text-sm">{t('footer.tagline')}</p>
            <div className="flex space-x-4 pt-4">
              <Instagram className="w-6 h-6 hover:text-green-300 cursor-pointer" />
              <Facebook className="w-6 h-6 hover:text-green-300 cursor-pointer" />
              <Twitter className="w-6 h-6 hover:text-green-300 cursor-pointer" />
              <Linkedin className="w-6 h-6 hover:text-green-300 cursor-pointer" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('footer.quickLinks')}</h3>
            <div className="flex flex-col space-y-2">
              <button onClick={() => navigate("/about")} className="text-green-200 hover:text-white text-left">
                {t('navbar.about')}
              </button>
              <button onClick={() => navigate("/ContactUs")} className="text-green-200 hover:text-white text-left">
                {t('navbar.contact')}
              </button>
              <a href="/faq" className="text-green-200 hover:text-white">{t('footer.faq')}</a>
              <a href="/blog" className="text-green-200 hover:text-white">{t('footer.blog')}</a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('footer.resources')}</h3>
            <div className="flex flex-col space-y-2">
              <a href="/terms" className="text-green-200 hover:text-white">{t('footer.terms')}</a>
              <a href="/privacy" className="text-green-200 hover:text-white">{t('footer.privacy')}</a>
              <a href="/downloads" className="text-green-200 hover:text-white">{t('footer.downloads')}</a>
              <a href="/partners" className="text-green-200 hover:text-white">{t('footer.partners')}</a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('footer.newsletter')}</h3>
            <p className="text-green-200 text-sm">{t('footer.newsletterDesc')}</p>
            <div className="flex gap-2 mt-4">
              <input 
                type="email" 
                placeholder={t('footer.emailPlaceholder')}
                className="w-full px-4 py-2 rounded-lg border border-green-300 bg-transparent text-white placeholder-green-300"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 py-6 w-full">
        <div className="text-center text-green-400 text-sm">
  @ Designed and Developed by Digital Krishii Team SISTec
</div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setChatOpen(!chatOpen)} className="bg-green-600 p-4 rounded-full shadow-lg hover:bg-green-700 animate-bounce">
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
      </div>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-2xl border border-green-200 z-50">
          <div className="bg-green-600 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <MessageCircle className="w-6 h-6" /> {t('chat.title')}
            </h3>
            <button onClick={() => setChatOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 h-80 overflow-y-auto bg-green-50">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <span className={`inline-block p-3 rounded-xl max-w-[70%] ${msg.sender === "user" ? "bg-green-600 text-white" : "bg-green-200 text-green-900"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-green-200 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="w-full p-2 border border-green-300 rounded-lg"
              placeholder={t('chat.placeholder')}
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const farmerContracts = [
  { img: "https://images.unsplash.com/photo-1742476353963-be38f5248736?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc4fHxiYW5hbmElMjBmYXJtaW5nJTIwaW1hZ2VzfGVufDB8fDB8fHww", title: "Banana Farming", detail: "500 Acres" },
  { img: "https://images.unsplash.com/photo-1589922583749-6b8473a85048?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHBvdWx0cnklMjBmYXJtaW5nJTIwaW1hZ2VzfGVufDB8fDB8fHww", title: "Poultry Farming", detail: "200 Acres" },
  { img: "https://images.unsplash.com/photo-1685399246790-917f3b59934e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b25pb24lMjBmYXJtaW5nJTIwaW1hZ2VzfGVufDB8fDB8fHww", title: "Onion Farming", detail: "300 Acres" },
  { img: "https://images.unsplash.com/photo-1750215015938-52310495e646?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmlzaCUyMGZhcm1pbmclMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D", title: "Fish Farming", detail: "150 Acres" },
];

const landContracts = [
  { img: "https://images.unsplash.com/photo-1734152207448-5875fcde13ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHB1bmphYiUyMGZhcm1pbmclMjBmcmVlJTIwa2hhbGklMjBsYW5kJTIwaW1hZ2VzfGVufDB8fDB8fHww", title: "Punjab", detail: "1000 Acres" },
  { img: "https://plus.unsplash.com/premium_photo-1742432403578-dc73ef879352?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG1haGFyYXN0cmElMjBmYXJtaW5nJTIwZnJlZSUyMGtoYWxpJTIwbGFuZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D", title: "Maharashtra", detail: "800 Acres" },
  { img: "https://images.unsplash.com/photo-1562309579-eb9f0b2128e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGthcm5hdGFrYSUyMGZhcm1pbmclMjBmcmVlJTIwa2hhbGklMjBsYW5kJTIwaW1hZ2VzfGVufDB8fDB8fHww", title: "Karnataka", detail: "600 Acres" },
];

const landRent = [
  { img: "https://images.unsplash.com/photo-1731361183753-92449577ad30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZyUyMGxhbmRzJTIwaW1hZ2VzfGVufDB8fDB8fHww", title: "Gujarat", detail: "Available - 400 Acres" },
  { img: "https://images.unsplash.com/photo-1714894323720-b31ab28da649?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhcm1pbmclMjBsYW5kcyUyMGltYWdlcyUyMGluJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D", title: "Rajasthan", detail: "Pre-Book - 350 Acres" },
  { img: "https://images.unsplash.com/photo-1562309579-eb9f0b2128e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhcm1pbmclMjBsYW5kcyUyMGltYWdlcyUyMGluJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D", title: "Gujarat", detail: "Available - 400 Acres" },
  { img: "https://images.unsplash.com/photo-1583480652564-bd6a6f2210c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGZhcm1pbmclMjBsYW5kcyUyMGltYWdlcyUyMGluJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D", title: "Rajasthan", detail: "Pre-Book - 350 Acres" },
  { img: "https://images.unsplash.com/photo-1660984428310-55f1bed78008?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGZhcm1pbmclMjBsYW5kcyUyMGltYWdlcyUyMGluJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D", title: "Gujarat", detail: "Available - 400 Acres" },
  { img: "https://images.unsplash.com/photo-1747025282912-13a3b6247256?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxmYXJtaW5nJTIwbGFuZHMlMjBpbWFnZXMlMjBpbiUyMGluZGlhfGVufDB8fDB8fHww", title: "Rajasthan", detail: "Pre-Book - 350 Acres" },
];

const products = [
  { img: "https://images.unsplash.com/photo-1623513548172-60a045643ebf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFybWluZyUyMGVxdWlwbWV0JTIwcG93ZXIlMjB0aWxsZXIlMjBpbiUyMGluZGlhfGVufDB8fDB8fHww", title: "Power Tiller", detail: "₹1,50,000" },
  { img: "https://images.unsplash.com/photo-1739444298506-7cff79291b81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFybWluZyUyMGVxdWlwbWVudHN8ZW58MHx8MHx8fDA%3D", title: "Tracter", detail: "₹1,00000" },
  { img: "https://images.unsplash.com/photo-1749592218742-959931bb00fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGZhcm1pbmclMjBlcXVpcG1lbnRzfGVufDB8fDB8fHww", title: "Weeder", detail: "₹40,000" },
];

export default Dashboard;