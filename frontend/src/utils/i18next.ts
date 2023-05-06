import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import httpBackend from 'i18next-http-backend';
import languageDetector from 'i18next-browser-languagedetector';

i18next
  .use(httpBackend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['ka', 'en'],
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18next;
