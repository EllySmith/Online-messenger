import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { ru, eng, it } from "./utils/locales.js";

const savedLanguage = localStorage.getItem("i18nextLng") || "ru";

i18next.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    eng: { translation: eng },
    it: { translation: it },
  },
  lng: savedLanguage,
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
