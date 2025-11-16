import i18n from "i18next";
import Cookies from "js-cookie";
import { initReactI18next } from "react-i18next";
import enTranslations from "./en.json";
import esTranslations from "./es.json";

const resources = {
	en: {
		translation: enTranslations,
	},
	es: {
		translation: esTranslations,
	},
};

const savedLanguage = Cookies.get("language") || "en";

i18n.use(initReactI18next).init({
	resources,
	fallbackLng: "en",
	lng: savedLanguage,
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
});

export default i18n;
