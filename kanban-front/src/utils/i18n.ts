import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'ru',
    debug: true,
    detection: {
      order: ['query-string', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
