// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './locales';

i18n

    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,

      fallbackLng: {
        'zh': ['zh-CN'],
        'en': ['en-US'],
        'jp': ['jp-JA'],
        'ar': ['ar-AE'],
        'default': ['en-US']
      },

      defaultNS: 'common',

      ns: ['common', 'auth', 'settings', 'dashboard'],

      debug: process.env.NODE_ENV === 'development',

      interpolation: {
        escapeValue: false,
      },

      detection: {

        order: ['localStorage', 'navigator', 'querystring'],

        lookupLocalStorage: 'app_i18next_lng',
        caches: ['localStorage'],
      },
    });

export default i18n;