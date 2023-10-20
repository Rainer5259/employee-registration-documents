import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { pt_br, en_us } from './locales'

const resources = {
  'pt-br': pt_br,
  'en-us': en_us
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: navigator.language,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
