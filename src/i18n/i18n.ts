import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import uzTranslation from "./locales/uz.json";
import krTranslation from "./locales/kr.json";


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            uz: { translation: uzTranslation },
            kr: { translation: krTranslation },
        },
        fallbackLng: "uz",
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
        },
    });

const savedLang = localStorage.getItem("i18nextLng");
if (Number(savedLang?.length) > 2) {
    i18n.changeLanguage("uz");
    localStorage.setItem("i18nextLng", "uz");
}


export default i18n;