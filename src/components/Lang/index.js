import i18n from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import en from './en.json';
import lo from './lo.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    lo: lo,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
