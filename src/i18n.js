import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        brandName: "Digital Krishii",
        home: "Home",
        contractFarmer: "Contract Farming",
        contact: "Contact",
        about: "About",
        search: "Search...",
        farmerLogin: "Farmer Login",
        buyerLogin: "Buyer Login",
        languages: {
          en: "English",
          hi: "Hindi",
          mr: "Marathi",
          gu: "Gujarati"
        }
      },
      main: {
        title: "Secure Your Crop Value Today",
        subtitle: "Direct contracts between farmers and agricultural buyers",
        cta: "Start Trading Now"
      },
      sections: {
        contracts: "Contract Farming",
        lands: "Land Available For Contract Farming",
        rent: "Land Available For Rent",
        products: "Products Available"
      },
      footer: {
        copyright: "© {{year}} Digital Krishii",
        tagline: "Transforming Agriculture Through Technology",
        terms: "Terms",
        privacy: "Privacy",
        faq: "FAQ",
        blog: "Blog",
        downloads: "Downloads",
        partners: "Partners",
        newsletter: "Stay Updated",
        newsletterDesc: "Get latest farming insights",
        emailPlaceholder: "Enter email address",
        subscribe: "Subscribe",
        sitemap: "Sitemap",
        resources: "Resources",
        quickLinks: "Quick Links"
      },
      chat: {
        title: "Support Chat",
        placeholder: "Type your message...",
        response: "We'll respond shortly"
      }
    }
  },
  hi: {
    translation: {
      navbar: {
        brandName: "डिजिटल कृषि",
        home: "होम",
        contractFarmer: "अनुबंध खेती",
        contact: "संपर्क",
        about: "हमारे बारे में",
        search: "खोजें...",
        farmerLogin: "किसान लॉगिन",
        buyerLogin: "खरीदार लॉगिन",
        languages: {
          en: "अंग्रेज़ी",
          hi: "हिन्दी",
          mr: "मराठी",
          gu: "गुजराती"
        }
      },
      main: {
        title: "आज ही सुरक्षित करें अपनी फसल का मूल्य",
        subtitle: "किसानों और कृषि खरीदारों के बीच सीधे अनुबंध",
        cta: "व्यापार शुरू करें"
      },
      sections: {
        contracts: "सक्रिय अनुबंध",
        lands: "उपलब्ध भूमि",
        rent: "भूमि पट्टा",
        products: "कृषि उत्पाद"
      },
      footer: {
        copyright: "© {{year}} डिजिटल कृषि",
        tagline: "प्रौद्योगिकी के माध्यम से कृषि को बदलना",
        terms: "नियम",
        privacy: "गोपनीयता",
        faq: "सामान्य प्रश्न",
        blog: "ब्लॉग",
        downloads: "डाउनलोड",
        partners: "साझेदार",
        newsletter: "अपडेट रहें",
        newsletterDesc: "नवीनतम कृषि जानकारी प्राप्त करें",
        emailPlaceholder: "ईमेल दर्ज करें",
        subscribe: "सब्सक्राइब",
        sitemap: "साइटमैप",
        resources: "संसाधन",
        quickLinks: "त्वरित लिंक"
      },
      chat: {
        title: "सहायता चैट",
        placeholder: "संदेश टाइप करें...",
        response: "हम जल्द ही जवाब देंगे"
      }
    }
  },
  mr: {
    translation: {
      navbar: {
        brandName: "डिजिटल कृषी",
        home: "मुख्यपृष्ठ",
        contractFarmer: "करारशेती",
        contact: "संपर्क",
        about: "आमच्याविषयी",
        search: "शोधा...",
        farmerLogin: "शेतकरी लॉगिन",
        buyerLogin: "खरेदीदार लॉगिन",
        languages: {
          en: "इंग्रजी",
          hi: "हिंदी",
          mr: "मराठी",
          gu: "गुजराती"
        }
      },
      main: {
        title: "आजच आपल्या पिकाचे मूल्य सुरक्षित करा",
        subtitle: "शेतकरी आणि कृषी खरेदीदारांमधील थेट करार",
        cta: "व्यापार सुरू करा"
      },
      sections: {
        contracts: "सक्रिय करार",
        lands: "उपलब्ध जमीन",
        rent: "जमीन भाडेपट्टी",
        products: "शेती उत्पादने"
      },
      footer: {
        copyright: "© {{year}} डिजिटल कृषी",
        tagline: "तंत्रज्ञानाद्वारे शेतीचे रूपांतर",
        terms: "अटी",
        privacy: "गोपनीयता",
        faq: "सामान्य प्रश्न",
        blog: "ब्लॉग",
        downloads: "डाउनलोड्स",
        partners: "भागीदार",
        newsletter: "अद्ययावत रहा",
        newsletterDesc: "नवीनतम शेती अंतर्दृष्टी मिळवा",
        emailPlaceholder: "ईमेल पत्ता टाका",
        subscribe: "सब्सक्राईब करा",
        sitemap: "साइटमॅप",
        resources: "संसाधने",
        quickLinks: "द्रुत दुवे"
      },
      chat: {
        title: "समर्थन चॅट",
        placeholder: "तुमचा संदेश टाइप करा...",
        response: "आम्ही लवकरच प्रतिसाद देऊ"
      }
    }
  },
  gu: {
    translation: {
      navbar: {
        brandName: "ડિજિટલ કૃષિ",
        home: "હોમ",
        contractFarmer: "કોન્ટ્રાક્ટ ખેતી",
        contact: "સંપર્ક કરો",
        about: "અમારા વિશે",
        search: "શોધો...",
        farmerLogin: "ખેડૂત લૉગિન",
        buyerLogin: "ખરીદદાર લૉગિન",
        languages: {
          en: "ઇંગ્લિશ",
          hi: "હિન્દી",
          mr: "મરાઠી",
          gu: "ગુજરાતી"
        }
      },
      main: {
        title: "આજે જ તમારી પાકની કિંમત સુરક્ષિત કરો",
        subtitle: "ખેડૂતો અને કૃષિ ખરીદદારો વચ્ચે સીધા કરાર",
        cta: "વેપાર શરૂ કરો"
      },
      sections: {
        contracts: "સક્રિય કરારો",
        lands: "ઉપલબ્ધ જમીન",
        rent: "જમીન લીઝ",
        products: "ખેતી ઉત્પાદનો"
      },
      footer: {
        copyright: "© {{year}} ડિજિટલ કૃષિ",
        tagline: "ટેકનોલોજી દ્વારા ખેતીનું રૂપાંતર",
        terms: "નિયમો",
        privacy: "ગોપનીયતા",
        faq: "સામાન્ય પ્રશ્નો",
        blog: "બ્લોગ",
        downloads: "ડાઉનલોડ્સ",
        partners: "પાર્ટનર્સ",
        newsletter: "અપડેટેડ રહો",
        newsletterDesc: "નવીનતમ ખેતી જાણકારી મેળવો",
        emailPlaceholder: "ઇમેઇલ સરનામું દાખલ કરો",
        subscribe: "સબ્સ્ક્રાઇબ કરો",
        sitemap: "સાઇટમેપ",
        resources: "સંસાધનો",
        quickLinks: "ઝડપી લિંક્સ"
      },
      chat: {
        title: "સપોર્ટ ચેટ",
        placeholder: "તમારો સંદેશ લખો...",
        response: "અમે ટૂંક સમયમાં જ જવાબ આપીશું"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;