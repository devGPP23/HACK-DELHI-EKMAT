import React, { createContext, useContext, useState } from 'react';
import { translations } from '../lib/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'hi' : 'en');
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    // Function for parameterized translations 
    const tf = (key, params = {}) => {
        let str = translations[language][key] || key;
        Object.keys(params).forEach(p => {
            str = str.replace(`{${p}}`, params[p]);
        });
        return str;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, tf }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
