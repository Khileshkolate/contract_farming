import React from 'react';
import { Tractor, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-green-800 to-emerald-900 text-white w-full">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-yellow-400 p-2 rounded-full mr-2">
                <div className="bg-green-800 p-1 rounded-full">
                  <Tractor className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
              <h2 className="text-xl font-bold">{t('navbar.brandName')}</h2>
            </div>
            <p className="text-green-200 mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white transition">
                  {t('navbar.home')}
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition">
                  {t('navbar.about')}
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition">
                  {t('Blog')}
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition">
                  {t('navbar.contact')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">
              {t('Resources')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white transition">
                  {t('Terms')}
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition">
                  {t('Privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition">
                  {t('Downloads')}
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition">
                  {t('Partners')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-700 pb-2">
              {t('ContactUs')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-green-300 mt-1 mr-3 w-5 h-5" />
                <span className="text-green-200">
                  123 Farm Road, Agricultural Zone, Pune, Maharashtra
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-green-300 mr-3 w-5 h-5" />
                <span className="text-green-200">+91 7757854124</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-green-300 mr-3 w-5 h-5" />
                <span className="text-green-200">digitalkrishii.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-300">
          <p>© {new Date().getFullYear()}  {t('Designed And Devloped By Digital Krishii Team SISTec')}</p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;