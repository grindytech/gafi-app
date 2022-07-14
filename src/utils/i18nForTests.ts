import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: ['translationsNS'],
  defaultNS: 'translationsNS',

  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  resources: {
    en: {
      translationsNS: {
        SHOW_FROM_A_TO_B_OF_C:
          'Showing <b> {{fromAmount}} </b> to <b> {{toAmount}} </b> of <b> {{totalCount}} </b> results',
        SHOW_A_OF_A:
          'Showing <b> {{totalCount}} </b> of <b> {{totalCount}} </b> results',
        PREVIOUS: 'Previous',
        NEXT: 'Next',
      },
    },
  },
});

export default i18n;
