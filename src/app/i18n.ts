import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { STORAGE_PREFIX } from '@/shared/constants';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    load: 'languageOnly',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      lookupLocalStorage: `${STORAGE_PREFIX}.lang`,
    },
    debug: import.meta.env.DEV,
  });

export default i18n;
